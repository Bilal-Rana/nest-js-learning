import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LazyModuleLoader } from '@nestjs/core';
import { LazyModule } from './lazy/lazy.module';
import { LazyService } from './lazy/lazy.service';
import { AuthGuard } from './Util/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly lazyModuleLoader: LazyModuleLoader
  ) { }

  @Get('load-lazy')
  async loadLazyModule() {
    const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);

    // ✅ Correct: use class token, not string
    const lazyService = moduleRef.get(LazyService);

    return lazyService.getData();
  }

  @UseGuards(AuthGuard)
  @Get('secure')
  getSecureData() {
    return 'This is protected data';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
