import { ApiProperty } from "@nestjs/swagger";

export class ResponseActivityDto {

    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    deleted: boolean;

    @ApiProperty()
    createAt: Date;
}