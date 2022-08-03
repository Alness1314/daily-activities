import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProblemDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(1)
    @MaxLength(64)
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(1)
    @MaxLength(255)
    description: string;
}
