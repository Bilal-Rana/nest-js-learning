// auth/auth.module.ts  ← AuthService belongs HERE
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { CryptoModule } from '../crypto/crypto.module'; // ✅ import for HashService

@Module({
  imports: [
    UsersModule,   // provides UsersService
    CryptoModule,  // provides HashService & CryptoService
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'your-secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}