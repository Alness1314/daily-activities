import { Module } from '@nestjs/common';
import { ProblemsService } from './services/problems.service';
import { ProblemsController } from './controllers/problems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  controllers: [ProblemsController],
  providers: [ProblemsService],
  exports: [ProblemsService],
})
export class ProblemsModule {}
