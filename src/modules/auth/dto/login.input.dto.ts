import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'huy' })
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({ example: '12345678' })
  password: string;
}
