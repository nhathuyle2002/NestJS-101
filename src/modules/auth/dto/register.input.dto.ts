import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "src/common/enum/user-role.enum";

export class RegisterInputDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'huy'})
    name: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({example: 20})
    age?: number;

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    @ApiProperty({example: '12345678'})
    password: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    @ApiProperty({enum: UserRole, example: UserRole.USER})
    role: UserRole;
}
