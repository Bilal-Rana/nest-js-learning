import { Module } from '@nestjs/common';
import { MyDiscoveryService } from './discovery.service';
import { DiscoveryModule as CoreDiscoveryModule } from '@nestjs/core';

@Module({
  imports: [CoreDiscoveryModule],
  providers: [MyDiscoveryService],
  exports: [MyDiscoveryService],
})
export class DiscoveryModule {}
