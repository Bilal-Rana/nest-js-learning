// crypto/crypto.module.ts  ← REMOVE AuthService from here
import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { HashService } from './hash.service';

@Module({
  providers: [CryptoService, HashService],
  exports: [CryptoService, HashService], // export so AuthModule can use them
})
export class CryptoModule {}