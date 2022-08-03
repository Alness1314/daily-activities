import { plainToInstance } from 'class-transformer';
import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseOtherDto } from '../dto';
import { CreateOtherDto } from '../dto/create-other.dto';
import { UpdateOtherDto } from '../dto/update-other.dto';
import { Other } from '../entities/other.entity';

@Injectable()
export class OtherService {

  private readonly logger = new Logger('OtherService');

  constructor(
    @InjectRepository(Other)
    private readonly _otherRepository: Repository<Other>,
  ){}

  async create(createOtherDto: CreateOtherDto): Promise<ResponseOtherDto> {
    const newOther = this._otherRepository.create(createOtherDto);
    let other: Other;
    try {
      other = await this._otherRepository.save(newOther);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseOtherDto, other);
  }

  async findAll(): Promise<ResponseOtherDto[]> {
    const list = await this._otherRepository.find();
    return plainToInstance(ResponseOtherDto, list);
  }

  async findOne(id: string): Promise<ResponseOtherDto> {
    const other = this._otherRepository.findOne({where: {id: id}})
    if(!other){
      throw new NotFoundException(`Other with id: ${id} not found`)
    }
    return plainToInstance(ResponseOtherDto, other);
  }

  update(id: string, updateOtherDto: UpdateOtherDto) {
    return `This action updates a #${id} other`;
  }

  remove(id: string) {
    return `This action removes a #${id} other`;
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
