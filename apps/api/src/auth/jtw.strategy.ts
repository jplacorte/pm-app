import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Extract token from Authorization: Bearer <token> header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. Ensure token hasn't expired
      ignoreExpiration: false,
      // 3. Secret key (MUST match the one in AuthModule)
      secretOrKey: process.env.JWT_SECRET || 'dev_secret_key',
    });
  }

  async validate(payload: any) {
    // 4. This is what gets attached to `req.user`
    // payload.sub is the userId we signed in AuthService
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
