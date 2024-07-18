import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { UserRole } from 'src/common/enum/user-role.enum';
import { RolesGuard } from '../auth/role.guard';

@Controller('user')
@ApiTags('User')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAllUsers')
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Get('getProfile')
  @Roles(UserRole.ADMIN, UserRole.USER)
  getProfile(@Req() req) {
    return req.user;
  }

  @Get('getUserInfoAndHousesById/:id')
  @Roles(UserRole.ADMIN)
  getUserInfoAndHousesById(@Param('id') id: string) {
    return this.userService.getUserInfoAndHousesById(id);
  }

  @Get('getAllUsersInfoAndHouses')
  @Roles(UserRole.ADMIN)
  getAllUsersInfoAndHouses() {
    return this.userService.getAllUsersInfoAndHouses();
  }
}
