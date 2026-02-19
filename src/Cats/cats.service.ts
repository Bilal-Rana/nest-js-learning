
import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {

  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }
}
