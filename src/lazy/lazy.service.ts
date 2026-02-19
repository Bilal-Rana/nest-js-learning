import { Injectable } from '@nestjs/common';

@Injectable()
export class LazyService {
  getData() {
    return 'Lazy module loaded dynamically!';
  }
}
