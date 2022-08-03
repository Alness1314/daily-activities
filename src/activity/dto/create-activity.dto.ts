import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateActivityDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(128)
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(600)
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(128)
    @IsNotEmpty()
    status: string;

}
