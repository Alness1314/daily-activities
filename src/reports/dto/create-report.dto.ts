import { CreateOtherDto } from './../../other/dto/create-other.dto';
import { CreateProblemDto } from './../../problems/dto/create-problem.dto';
import { CreateActivityDto } from './../../activity/dto/create-activity.dto';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateReportDto {
    @ApiProperty()
    @Type(()=>Date)
    @IsDate()
    @IsNotEmpty()
    reportDate: Date;

    /*@ApiProperty()
    @IsOptional()
    @IsUUID()
    userId: string;*/

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    company: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    area: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty({type: CreateActivityDto, isArray: true})
    @IsArray()
    @IsOptional()
    activity: CreateActivityDto[];

    @ApiProperty({type: CreateProblemDto, isArray: true})
    @IsArray()
    @IsOptional()
    problems: CreateProblemDto[];

    @ApiProperty({type: CreateOtherDto, isArray: true})
    @IsArray()
    @IsOptional()
    othersPoints: CreateOtherDto[];
}
