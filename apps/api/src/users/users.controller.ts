// apps/api/src/users/users.controller.ts
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req) {
    // req.user is populated by the JwtStrategy from auth module
    const user = await this.usersService.findById(req.user.id);
    return user;
  }
}
