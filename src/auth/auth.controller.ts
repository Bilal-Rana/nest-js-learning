// auth/auth.controller.ts
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../constants/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: { username: string; password: string }) {
    return this.authService.signIn(body.username, body.password);
  }

  // ✅ New: register endpoint that hashes password before saving
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const hashedPassword = await this.authService.hashPassword(body.password);
    // Pass hashedPassword to your UsersService to save in DB
    // e.g: return this.usersService.create(body.username, hashedPassword);
    return { message: 'User registered successfully' };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // { sub: 1, username: 'john', iat: ..., exp: ... }
  }
}