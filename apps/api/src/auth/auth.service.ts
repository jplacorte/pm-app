import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: LoginDto) {
    // 1. Find user
    const user = await this.usersService.findOne(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Generate JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async signUp(data: RegisterDto) {
    // 1. Check if user exists
    const existingUser = await this.usersService.findOne(data.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // 3. Create user
    const newUser = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    // 4. Log them in immediately (return token)
    return this.signIn({ email: newUser.email, password: data.password });
  }
}
