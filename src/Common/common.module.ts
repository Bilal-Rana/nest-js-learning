import { forwardRef, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CatModule } from 'src/Cats/cats.module';

@Module({
  providers: [CommonService],
    exports: [CommonService], 
   imports: [forwardRef(() => CatModule)],   // eliminate the circular dependency
})
export class CommonModule {}
