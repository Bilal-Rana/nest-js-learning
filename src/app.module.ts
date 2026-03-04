import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscoveryModule } from './Discovery/discovery.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CryptoModule } from './crypto/crypto.module';
import { CaslModule } from './casl/casl.module';
import { CatModule } from './Cats/cats.module';
import { CommonModule } from './Common/common.module';
import { LazyModule } from './lazy/lazy.module';

@Module({
  imports: [DiscoveryModule,AuthModule,UsersModule, CryptoModule, CaslModule, CatModule, CommonModule, LazyModule  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
