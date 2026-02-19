import { Controller, Get } from '@nestjs/common';
import { LazyService } from './lazy.service';

@Controller()
export class LazyController {
  constructor(private readonly lazyService: LazyService) {}

  @Get()
  test() {
    return this.lazyService.getData();
  }
}
