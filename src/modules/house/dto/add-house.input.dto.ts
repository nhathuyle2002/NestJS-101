import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddHouseInputDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'honda' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '516796ee-b099-4776-bd06-47b83414f14b' })
  ownerId: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: new Date() })
  MFG: Date;
}
