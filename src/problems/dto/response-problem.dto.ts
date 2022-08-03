import { ApiProperty } from "@nestjs/swagger";

export class ResponseProblemDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    deleted: boolean;

    @ApiProperty()
    createAt: Date;
}