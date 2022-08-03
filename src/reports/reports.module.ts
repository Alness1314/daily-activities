import { OtherModule } from './../other/other.module';
import { ProblemsModule } from './../problems/problems.module';
import { ActivityModule } from './../activity/activity.module';
import { Report } from './entities/report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReportsService } from './services/reports.service';
import { ReportsController } from './controllers/reports.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), AuthModule, ActivityModule, ProblemsModule, OtherModule],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
