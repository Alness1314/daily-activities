import { ApiProperty } from "@nestjs/swagger";

export class ResponseOtherDto{
    @ApiProperty()
    id: string;

    @ApiProperty()
    point: string;

    @ApiProperty()
    assigned: string;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    deleted: boolean;

    @ApiProperty()
    createAt: Date;
}