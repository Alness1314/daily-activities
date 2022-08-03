import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OtherService } from './services/other.service';
import { OtherController } from './controllers/other.controller';
import { Other } from './entities/other.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Other])],
  controllers: [OtherController],
  providers: [OtherService],
  exports: [OtherService],
})
export class OtherModule {}
