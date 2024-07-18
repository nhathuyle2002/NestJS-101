import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @ApiProperty({ example: 'Thanh' })
    name: string;

    @IsNumber()
    @ApiProperty({ example: 24 })
    age: number

}
