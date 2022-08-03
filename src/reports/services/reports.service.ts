import { Activity } from './../../activity/entities/activity.entity';
import { plainToInstance } from 'class-transformer';
import { Report } from './../entities/report.entity';
import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto, ResponseReportDto, UpdateReportDto } from '../dto';
import { User } from 'src/users/entities/user.entity';
import { ActivityService } from 'src/activity/services/activity.service';
import { ProblemsService } from 'src/problems/services/problems.service';
import { Problem } from 'src/problems/entities/problem.entity';
import { Other } from 'src/other/entities/other.entity';
import { OtherService } from 'src/other/services/other.service';

@Injectable()
export class ReportsService {

  private readonly logger = new Logger('ReportsService');

  constructor(
    @InjectRepository(Report)
    private readonly _reportRepository: Repository<Report>,
    private readonly _activityService: ActivityService,
    private readonly _problemsService: ProblemsService,
    private readonly _otherService: OtherService,
  ){}

  async create(createReportDto: CreateReportDto, user: User): Promise<ResponseReportDto> {
    const newReport = this._reportRepository.create(createReportDto);
    newReport.user = user;

    //asing activities
    let list: Activity[] = [];
    if(createReportDto.activity){
      for (const activity of createReportDto.activity) {
        const temp = await this._activityService.create(activity);
        list.push(plainToInstance(Activity, temp));
      }
    }

    //asing problems
    let listProblems: Problem[] = [];
    if(createReportDto.problems){
      for (const problem of createReportDto.problems) {
        const temp = await this._problemsService.create(problem);
        listProblems.push(plainToInstance(Problem, temp));
      }
    }

    //asing other points
    let listOther: Other[] = [];
    if(createReportDto.othersPoints){
      for (const other of createReportDto.othersPoints) {
        const temp = await this._otherService.create(other);
        listOther.push(plainToInstance(Other, temp));
      }
    }

    let report:Report;
    try {
      newReport.activity = list;
      newReport.problems = listProblems;
      report = await this._reportRepository.save(newReport);
    } catch (error) {
      this.handleDBExceptions(error)
    }
    return plainToInstance(ResponseReportDto, report);
  }

  async findAll(): Promise<ResponseReportDto[]> {
    const list = await this._reportRepository.find({where: {deleted: false}});
    return plainToInstance(ResponseReportDto, list);
  }

  async findOne(id: string): Promise<ResponseReportDto>{
    const report = await this._reportRepository.findOne({where: {id: id, deleted: false}});
    if(!report){
      throw new NotFoundException(`The report ${id} does not exist`);
    }
    return plainToInstance(ResponseReportDto, report);
  }

  async update(id: string, updateReportDto: UpdateReportDto): Promise<ResponseReportDto> {
    return ;
  }

  async remove(id: string) {
    return `This action removes a #${id} report`;
  }

  private handleDBExceptions(error: any){
    this.logger.error(error)
    if(error.code === 'ER_DUP_ENTRY'){
      throw new ConflictException('Duplicate entry in database')
    }
    console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
