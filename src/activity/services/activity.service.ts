import { plainToInstance } from 'class-transformer';
import { Activity } from './../entities/activity.entity';
import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { UpdateActivityDto } from '../dto/update-activity.dto';
import { Repository } from 'typeorm';
import { ResponseActivityDto } from '../dto/response-activity.dto';

@Injectable()
export class ActivityService {
  private readonly logger = new Logger('ActivityService');

  constructor(
    @InjectRepository(Activity)
    private readonly _activityRepository: Repository<Activity>,
  ){}

  async create(createActivityDto: CreateActivityDto): Promise<ResponseActivityDto> {
    const newActivity = this._activityRepository.create(createActivityDto);
    let activity: Activity;
    try {
      activity = await this._activityRepository.save(newActivity)
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseActivityDto, activity);
  }

  async findAll(): Promise<ResponseActivityDto[]> {
    const list = await this._activityRepository.find({
      where: {deleted: false}
    });
    return plainToInstance(ResponseActivityDto, list);
  }

  async findOne(id: string): Promise<ResponseActivityDto> {
    //return `This action returns a #${id} activity`;
    const activity = await this._activityRepository.findOne({where: {id: id, deleted: false}})
    if(!activity){
      throw new NotFoundException('Activity not found');
    }
    return plainToInstance(ResponseActivityDto, activity);
  }

  async update(id: string, updateActivityDto: UpdateActivityDto): Promise<ResponseActivityDto> {
    //find a activty
    const findActivity = await this.findOne(id);
    //merge the activity with the current dto
    let updateActivity = this._activityRepository.merge(plainToInstance(Activity,findActivity), updateActivityDto);
    try {
      updateActivity = await this._activityRepository.save(updateActivity);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseActivityDto, updateActivity);
  }

  async remove(id: string): Promise<any> {
    const deleted = await this.findOne(id);
    deleted.deleted = true;
    try {
      await this._activityRepository.save(deleted);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Activity deleted successfully',
    };
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
