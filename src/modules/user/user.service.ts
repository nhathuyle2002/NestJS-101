import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'database/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UUID } from 'crypto';
import { Houses } from 'database/entities/house.entity';
import { UserRole } from 'src/common/enum/user-role.enum';
import { Locations } from 'database/entities/location.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    try {
      console.log('createUserDto :>> ', createUserDto);
      const user = this.userRepository.create({
        ...createUserDto,
      });
      console.log('user :>> ', user);
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      console.log('error :>> ', error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Users[]> {
    try {
      const user_list = await this.userRepository.find();
      return user_list;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<Users> {
    try {
      const user = this.findOne(id);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findOneByName(name: string): Promise<Users> {
    try {
      const user = this.userRepository.findOneBy({ name: name });
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    try {
      const exitsUser = await this.userRepository.findOneBy({ id: id });
      if (exitsUser) {
        exitsUser.name = updateUserDto.name;
        exitsUser.age = updateUserDto.age;
        return this.userRepository.save(exitsUser);
      } else {
        throw new BadRequestException('User not found');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const exitsUser = await this.userRepository.findOneBy({ id: id });
      if (exitsUser) {
        return this.userRepository.remove(exitsUser);
      } else {
        throw new BadRequestException('User not found');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserInfoAndHousesById(id: string) {
    try {
      const result = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: id })
        .leftJoinAndMapMany('user.houses', Houses, 'houses', 'user.id = houses.ownerId')
        .leftJoinAndMapOne('houses.location', Locations, 'locations', 'houses.locationId = locations.id')
        .getOne();
      console.log('getUserInfoAndHousesById result: ', result);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllUsersInfoAndHouses() {
    try {
      const result = await this.userRepository
        .createQueryBuilder('user')
        .where('user.role != :role', { role: UserRole.ADMIN })
        .leftJoinAndMapOne('user.houses', Houses, 'houses', 'user.id = houses.ownerId')
        .getMany();
      console.log('getAllUsersInfoAndHouses result: ', result);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
