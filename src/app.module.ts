import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscoveryModule } from './Discovery/discovery.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DiscoveryModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
