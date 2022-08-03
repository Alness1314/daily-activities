import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateOtherDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(1)
    @MaxLength(64)
    point: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(1)
    @MaxLength(128)
    assigned: string;

    @ApiProperty()
    @IsDate()
    @Type(()=>Date)
    @IsOptional()
    date: Date;
}
