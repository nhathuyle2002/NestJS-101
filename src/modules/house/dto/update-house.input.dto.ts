import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateHouseInputDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  ownerId: string;

  @IsOptional()
  @IsDateString()
  MFG: Date;
}
