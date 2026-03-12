import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { prisma } from '@tatx/database';
import { JwtConfig } from '../../config/jwt.config';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordDto,
  VerifyEmailDto,
  VerifyPhoneDto,
  GoogleLoginDto,
  AppleLoginDto,
  SendOtpDto,
  VerifyOtpDto,
} from '../dto/auth.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private jwtConfig: JwtConfig,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone: dto.phone }],
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this email or phone already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        password: hashedPassword,
        firstName: dto.firstName,
        firstNameAr: dto.firstNameAr,
        lastName: dto.lastName,
        lastNameAr: dto.lastNameAr,
        role: dto.role || 'CUSTOMER',
        language: dto.language || 'ar',
      },
    });

    // Create profile based on role
    await this.createProfileForUser(user.id, user.role);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Generate email verification token
    const emailVerificationToken = await this.generateVerificationToken(user.id, 'email_verification');

    // TODO: Send verification email
    // await this.notificationService.sendVerificationEmail(user.email, emailVerificationToken);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
      emailVerificationToken,
    };
  }

  async login(dto: LoginDto) {
    // Find user with profiles
    const user = await prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        customer: true,
        driver: true,
        merchant: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Check 2FA if enabled
    if (user.twoFactorStatus === 'ENABLED' && !dto.twoFactorCode) {
      throw new UnauthorizedException('2FA code required');
    }

    // Verify 2FA if provided
    if (dto.twoFactorCode && user.twoFactorSecret) {
      const isValid2FA = await this.verify2FACode(user.twoFactorSecret, dto.twoFactorCode);
      if (!isValid2FA) {
        throw new UnauthorizedException('Invalid 2FA code');
      }
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date(), lastActiveAt: new Date() },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async googleLogin(dto: GoogleLoginDto) {
    // Verify Google token (in production, verify with Google)
    const googleUser = await this.verifyGoogleToken(dto.idToken);

    // Find existing user with Google OAuth
    let user = await prisma.user.findFirst({
      where: {
        email: googleUser.email,
      },
    });

    if (user) {
      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date(), lastActiveAt: new Date() },
      });

      const tokens = await this.generateTokens(user);
      return {
        user: this.sanitizeUser(user),
        ...tokens,
      };
    }

    // Create new user
    user = await prisma.user.create({
      data: {
        email: googleUser.email,
        phone: dto.phone || '',
        password: '', // No password for OAuth users
        firstName: googleUser.given_name || '',
        lastName: googleUser.family_name || '',
        avatar: googleUser.picture,
        role: 'CUSTOMER',
        emailVerified: true,
        phoneVerified: dto.phone ? true : false,
      },
    });

    // Create customer profile
    await this.createProfileForUser(user.id, 'CUSTOMER');

    const tokens = await this.generateTokens(user);
    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async appleLogin(dto: AppleLoginDto) {
    // Verify Apple identity token
    const appleUser = await this.verifyAppleToken(dto.identityToken);

    // Find existing user with Apple OAuth
    let user = await prisma.user.findFirst({
      where: {
        email: appleUser.email,
      },
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date(), lastActiveAt: new Date() },
      });

      const tokens = await this.generateTokens(user);
      return {
        user: this.sanitizeUser(user),
        ...tokens,
      };
    }

    // Create new user
    user = await prisma.user.create({
      data: {
        email: appleUser.email,
        phone: dto.phone || '',
        password: '',
        firstName: dto.firstName || '',
        lastName: dto.lastName || '',
        role: 'CUSTOMER',
        emailVerified: true,
        phoneVerified: dto.phone ? true : false,
      },
    });

    await this.createProfileForUser(user.id, 'CUSTOMER');

    const tokens = await this.generateTokens(user);
    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.jwtConfig.refreshSecret,
      });

      const user = await prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.generateTokens(user);
      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async sendOtp(dto: SendOtpDto) {
    const { phone } = dto;

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          role: 'CUSTOMER',
          phoneVerified: false,
        },
      });

      await this.createProfileForUser(user.id, 'CUSTOMER');
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store OTP (in production, use Redis)
    await prisma.systemSetting.upsert({
      where: { key: `otp:${phone}` },
      update: {
        value: { otp, expiresAt: otpExpiresAt },
      },
      create: {
        key: `otp:${phone}`,
        value: { otp, expiresAt: otpExpiresAt },
        category: 'OTP',
      },
    });

    // TODO: Send SMS via Twilio/Unifonic
    // await this.smsService.send(phone, `Your Tatx verification code is: ${otp}`);

    return {
      message: 'OTP sent successfully',
      otpId: user.id,
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const { phone, otp, otpId } = dto;

    // Retrieve stored OTP
    const otpSetting = await prisma.systemSetting.findUnique({
      where: { key: `otp:${phone}` },
    });

    if (!otpSetting) {
      throw new BadRequestException('OTP not found or expired');
    }

    const otpData = otpSetting.value as any;
    if (otpData.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (new Date(otpData.expiresAt) < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    // Update user
    const user = await prisma.user.update({
      where: { id: otpId },
      data: {
        phoneVerified: true,
        lastActiveAt: new Date(),
      },
    });

    // Delete used OTP
    await prisma.systemSetting.delete({
      where: { key: `otp:${phone}` },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      // Don't reveal if user exists
      return { message: 'If the email exists, a reset link has been sent' };
    }

    // Generate reset token
    const resetToken = await this.jwtService.signAsync(
      { sub: user.id, type: 'password_reset' },
      {
        secret: this.jwtConfig.secret,
        expiresIn: '1h',
      },
    );

    // TODO: Send email with reset token
    // await notificationService.sendPasswordResetEmail(user.email, resetToken);

    return { message: 'If the email exists, a reset link has been sent' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    try {
      const payload = this.jwtService.verify(dto.token, {
        secret: this.jwtConfig.secret,
      });

      if (payload.type !== 'password_reset') {
        throw new BadRequestException('Invalid token type');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      await prisma.user.update({
        where: { id: payload.sub },
        data: { password: hashedPassword },
      });

      return { message: 'Password has been reset successfully' };
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password changed successfully' };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    try {
      const payload = this.jwtService.verify(dto.token, {
        secret: this.jwtConfig.secret,
      });

      if (payload.type !== 'email_verification') {
        throw new BadRequestException('Invalid token type');
      }

      await prisma.user.update({
        where: { id: payload.sub },
        data: { emailVerified: true },
      });

      return { message: 'Email verified successfully' };
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }
  }

  async verifyPhone(dto: VerifyPhoneDto) {
    const user = await prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { phoneVerified: true },
    });

    return { message: 'Phone verified successfully' };
  }

  async setup2FA(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate 2FA secret
    const secret = randomStringGenerator(32);
    const otpauthUrl = `otpauth://totp/Tatx:${user.email}?secret=${secret}&issuer=Tatx`;

    // Save secret (don't enable yet)
    await prisma.user.update({
      where: { id: userId },
      data: { twoFactorSecret: secret },
    });

    return {
      secret,
      otpauthUrl,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(otpauthUrl)}&size=300x300`,
    };
  }

  async enable2FA(userId: string, code: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.twoFactorSecret) {
      throw new BadRequestException('2FA not set up');
    }

    const isValid = await this.verify2FACode(user.twoFactorSecret, code);
    if (!isValid) {
      throw new BadRequestException('Invalid 2FA code');
    }

    // Generate backup codes
    const backupCodes = Array.from({ length: 8 }, () => randomStringGenerator(8));

    await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorStatus: 'ENABLED',
        backupCodes: backupCodes,
      },
    });

    return {
      backupCodes,
      message: '2FA enabled successfully. Save these backup codes in a safe place.',
    };
  }

  async disable2FA(userId: string, code: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.twoFactorSecret) {
      const isValid = await this.verify2FACode(user.twoFactorSecret, code);
      if (!isValid) {
        throw new BadRequestException('Invalid 2FA code');
      }
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorStatus: 'DISABLED',
        twoFactorSecret: null,
        backupCodes: [],
      },
    });

    return { message: '2FA disabled successfully' };
  }

  async logout(userId: string, refreshToken?: string) {
    // TODO: Implement token blacklisting with Redis
    // await this.redis.set(`blacklist:${refreshToken}`, 'true', 'EX', 86400);

    return { message: 'Logged out successfully' };
  }

  // Helper methods

  private async createProfileForUser(userId: string, role: string) {
    switch (role) {
      case 'CUSTOMER':
        await prisma.customer.create({
          data: { userId },
        });
        break;
      case 'DRIVER':
        await prisma.driver.create({
          data: {
            userId,
            status: 'OFFLINE',
            canAcceptRides: false,
            canAcceptDelivery: false,
          },
        });
        break;
      case 'MERCHANT':
        await prisma.merchant.create({
          data: {
            userId,
            businessName: '',
            businessType: 'RESTAURANT',
            phone: '',
            email: '',
            isActive: false,
          },
        });
        break;
    }
  }

  private async generateTokens(user: { id: string; email: string; role: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user.id, email: user.email, role: user.role },
        {
          secret: this.jwtConfig.secret,
          expiresIn: this.jwtConfig.expiresIn,
        },
      ),
      this.jwtService.signAsync(
        { sub: user.id },
        {
          secret: this.jwtConfig.refreshSecret,
          expiresIn: this.jwtConfig.refreshExpiresIn,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
      expiresIn: this.jwtConfig.expiresIn,
    };
  }

  private async generateVerificationToken(userId: string, type: string) {
    return this.jwtService.signAsync(
      { sub: userId, type },
      {
        secret: this.jwtConfig.secret,
        expiresIn: '24h',
      },
    );
  }

  private sanitizeUser(user: any) {
    const { password, twoFactorSecret, backupCodes, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  private async verifyGoogleToken(idToken: string) {
    // In production, verify with Google OAuth2
    // const { OAuth2Client } = require('google-auth-library');
    // const client = new OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'));
    // const ticket = await client.verifyIdToken({ idToken, audience: this.configService.get('GOOGLE_CLIENT_ID') });
    // return ticket.getPayload();

    // For development, decode token (INSECURE - replace in production)
    const payload = Buffer.from(idToken.split('.')[1], 'base64').toString('utf-8');
    return JSON.parse(payload);
  }

  private async verifyAppleToken(identityToken: string) {
    // In production, verify with Apple
    // const appleSignin = require('apple-signin-auth');
    // return await appleSignin.verifyIdToken(identityToken, {
    //   audience: this.configService.get('APPLE_CLIENT_ID'),
    //   ignoreExpiration: false,
    // });

    // For development, decode token (INSECURE - replace in production)
    const payload = Buffer.from(identityToken.split('.')[1], 'base64').toString('utf-8');
    return JSON.parse(payload);
  }

  private async verify2FACode(secret: string, code: string) {
    // In production, use speakeasy or similar library
    // const speakeasy = require('speakeasy');
    // return speakeasy.totp.verify({ secret, encoding: 'base32', token: code });

    // For development, accept any 6-digit code (INSECURE - replace in production)
    return /^\d{6}$/.test(code);
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        customer: true,
        driver: true,
        merchant: true,
        admin: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.sanitizeUser(user);
  }
}
