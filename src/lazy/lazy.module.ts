import { Module } from '@nestjs/common';
import { LazyController } from './lazy.controller';
import { LazyService } from './lazy.service';

@Module({
  controllers: [LazyController],
  providers: [LazyService],
})
export class LazyModule {}
