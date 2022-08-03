import { plainToInstance } from 'class-transformer';
import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from '../entities/problem.entity';
import { CreateProblemDto, ResponseProblemDto, UpdateProblemDto } from '../dto';

@Injectable()
export class ProblemsService {

  private readonly logger = new Logger('ProblemsService');

  constructor(
    @InjectRepository(Problem)
    private readonly _problemRepository: Repository<Problem>,
  ){}

  async create(createProblemDto: CreateProblemDto): Promise<ResponseProblemDto> {
    const newProblem = this._problemRepository.create(createProblemDto);
    let problem: Problem;
    try {
      problem = await this._problemRepository.save(newProblem);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseProblemDto, problem);
  }

  async findAll(): Promise<ResponseProblemDto[]> {
    const list = await this._problemRepository.find();
    return plainToInstance(ResponseProblemDto, list);
  }

  async findOne(id: string): Promise<ResponseProblemDto> {
    const problem = await this._problemRepository.findOne({where: {id: id}});
    if(!problem){
      throw new NotFoundException(`Problem with id: {id} not found`)
    }
    return plainToInstance(ResponseProblemDto, problem);
  }

  async update(id: string, updateProblemDto: UpdateProblemDto): Promise<ResponseProblemDto> {
    //find a problem
    const findProblem = await this.findOne(id);
    //merge the activity with the current dto
    let updateProblem = this._problemRepository.merge(plainToInstance(Problem,findProblem), updateProblemDto);
    try {
      updateProblem = await this._problemRepository.save(updateProblem);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseProblemDto, updateProblem);
  }

  async remove(id: string): Promise<any> {
    const deleted = await this.findOne(id);
    deleted.deleted = true;
    try {
      await this._problemRepository.save(deleted);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Problem deleted successfully',
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
