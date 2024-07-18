import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { AddHouseInputDto, UpdateHouseInputDto } from './dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { UserRole } from 'src/common/enum/user-role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('house')
@ApiTags('house')
@ApiBearerAuth('access-token')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}
  @Get('getAllHousesAndOwnerInfo')
  getAllHousesAndOwnerInfo() {
    return this.houseService.getAllHousesAndOwnerInfo();
  }

  @Get('getAllHousesWithOwnerAndLocation')
  getAllHousesWithOwnerAndLocation() {
    console.log("Get all houses with owner and location");
    return this.houseService.getAllHousesWithOwnerAndLocation();
  }

  @Get('getHouse/:id')
  getHouse(@Param('id') id: string) {
    return this.houseService.findOne(id);
  }

  @Post('add')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  add(@Body() house: AddHouseInputDto) {
    return this.houseService.add(house);
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() house: UpdateHouseInputDto) {
    return this.houseService.update(id, house);
  }

  @Get('getOwnerInfo/:id')
  getOwnerInfo(@Param('id') id: string) {
    return this.houseService.getOwnerInfo(id);
  }

  @Get('getHouseWithOwnerAndLocation/:id')
  getHouseWithOwnerAndLocation(@Param('id') id: string) {
    return this.houseService.getHouseWithOwnerAndLocation(id);
  }

}
