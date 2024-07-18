import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Houses } from 'database/entities/house.entity';
import { Locations } from 'database/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Houses, Locations]), 
    AuthModule,
    UserModule
  ],
  controllers: [HouseController],
  providers: [HouseService]
})
export class HouseModule {}
