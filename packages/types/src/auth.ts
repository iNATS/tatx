/**
 * Authentication and Authorization types
 */

// ===========================================
// JWT Types
// ===========================================

export interface JwtPayload {
  sub: string; // user id
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface JwtToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenPayload {
  sub: string;
  tokenVersion: number;
  iat?: number;
  exp?: number;
}

// ===========================================
// Session Types
// ===========================================

export interface Session {
  id: string;
  userId: string;
  token: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface SessionData {
  userId: string;
  email: string;
  role: string;
  permissions?: string[];
}

// ===========================================
// OAuth Types
// ===========================================

export type OAuthProvider = 'GOOGLE' | 'APPLE' | 'FACEBOOK';

export interface OAuthConfig {
  provider: OAuthProvider;
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
}

export interface OAuthProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: OAuthProvider;
}

export interface OAuthTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  provider: OAuthProvider;
}

// ===========================================
// Permission Types
// ===========================================

export type Permission =
  // User permissions
  | 'user:read'
  | 'user:write'
  | 'user:delete'
  // Ride permissions
  | 'ride:create'
  | 'ride:read'
  | 'ride:update'
  | 'ride:cancel'
  // Order permissions
  | 'order:create'
  | 'order:read'
  | 'order:update'
  | 'order:cancel'
  // Driver permissions
  | 'driver:read'
  | 'driver:write'
  | 'driver:approve'
  | 'driver:reject'
  // Payment permissions
  | 'payment:create'
  | 'payment:read'
  | 'payment:refund'
  // Admin permissions
  | 'admin:read'
  | 'admin:write'
  | 'admin:delete'
  | 'admin:settings';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface RoleAssignment {
  userId: string;
  roleId: string;
  assignedBy: string;
  assignedAt: Date;
  expiresAt?: Date;
}

// ===========================================
// Auth Guard Types
// ===========================================

export interface AuthGuardOptions {
  roles?: string[];
  permissions?: Permission[];
  optional?: boolean;
}

export interface RequestContext {
  user?: {
    id: string;
    email: string;
    role: string;
    permissions?: Permission[];
  };
  headers: Record<string, string>;
  ip?: string;
}

// ===========================================
// 2FA Types
// ===========================================

export interface TwoFactorSetup {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface TwoFactorVerifyRequest {
  code: string;
  backupCode?: string;
}

export interface TwoFactorResponse {
  enabled: boolean;
  verified: boolean;
}

// ===========================================
// API Key Types
// ===========================================

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: Permission[];
  isActive: boolean;
  expiresAt?: Date;
  lastUsedAt?: Date;
  createdAt: Date;
}

export interface CreateApiKeyRequest {
  name: string;
  permissions: Permission[];
  expiresAt?: Date;
}

// ===========================================
// Rate Limit Types
// ===========================================

export interface RateLimitConfig {
  ttl: number; // Time to live in seconds
  max: number; // Maximum requests
  keyGenerator?: (req: unknown) => string;
}

export interface RateLimitInfo {
  total: number;
  remaining: number;
  reset: number;
}

// ===========================================
// Password & Security Types
// ===========================================

export interface PasswordResetToken {
  token: string;
  userId: string;
  expiresAt: Date;
  used: boolean;
}

export interface VerificationToken {
  token: string;
  userId: string;
  type: 'EMAIL' | 'PHONE';
  expiresAt: Date;
  used: boolean;
}

export interface SecuritySettings {
  requireEmailVerification: boolean;
  requirePhoneVerification: boolean;
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireLowercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSpecial: boolean;
  maxLoginAttempts: number;
  lockoutDuration: number;
  sessionTimeout: number;
  require2FA: boolean;
}

// ===========================================
// Auth Service Interface
// ===========================================

export interface IAuthService {
  register(data: RegisterData): Promise<AuthResult>;
  login(credentials: LoginCredentials): Promise<AuthResult>;
  logout(userId: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<JwtToken>;
  verifyToken(token: string): Promise<JwtPayload>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>;
  verifyEmail(token: string): Promise<void>;
  verifyPhone(userId: string, code: string): Promise<void>;
  sendOtp(phone: string): Promise<void>;
  setup2FA(userId: string): Promise<TwoFactorSetup>;
  verify2FA(userId: string, code: string): Promise<boolean>;
  disable2FA(userId: string, code: string): Promise<void>;
}

export interface RegisterData {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar?: string;
  };
  tokens: JwtToken;
}
