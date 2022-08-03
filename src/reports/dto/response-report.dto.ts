import { ResponseUserDto } from './../../users/dto/response-user.dto';
import { ResponseOtherDto } from './../../other/dto/response-other.dto';
import { ResponseProblemDto } from './../../problems/dto/response-problem.dto';
import { ApiProperty } from "@nestjs/swagger";
import { ResponseActivityDto } from "src/activity/dto/response-activity.dto";

export class ResponseReportDto{
    @ApiProperty()
    id: string;

    @ApiProperty()
    reportDate: Date;

    @ApiProperty({type: ResponseUserDto})
    user: ResponseReportDto;

    @ApiProperty()
    company: string;

    @ApiProperty()
    area: string;

    @ApiProperty()
    status: string;

    @ApiProperty({type: ResponseActivityDto, isArray: true})
    activities: ResponseActivityDto[];

    @ApiProperty({type: ResponseProblemDto, isArray: true})
    problems: ResponseProblemDto[];

    @ApiProperty({type: ResponseOtherDto, isArray: true})
    othersPoints: ResponseOtherDto[];

    @ApiProperty()
    deleted: boolean;

    @ApiProperty()
    createAt: Date;
}