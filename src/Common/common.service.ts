import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  getHello(): string {
    return 'Hello from Common Service';
  }
}
