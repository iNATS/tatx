import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<unknown> {
    // This will be handled by AuthService
    // The strategy is mainly for passport integration
    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required');
    }
    return { email, password };
  }
}
