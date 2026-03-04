// users/users.module.ts  ← make sure UsersService is exported
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // ✅ must export so AuthModule can inject it
})
export class UsersModule {}