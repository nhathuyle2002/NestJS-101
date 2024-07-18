import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Houses } from 'database/entities/house.entity';
import { DataSource, Repository } from 'typeorm';
import { AddHouseInputDto, UpdateHouseInputDto } from './dto';
import { Users } from 'database/entities/user.entity';

@Injectable()
export class HouseService {
  
  constructor(
    @InjectRepository(Houses)
    private readonly houseRepository: Repository<Houses>,
    private readonly dataSource: DataSource,
  ) {}

  async findOne(id: string): Promise<Houses> {
    try {
      return await this.houseRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  add(house: AddHouseInputDto) {
    try {
      const newHouse = this.houseRepository.create(house);
      return this.houseRepository.save(newHouse);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, house: UpdateHouseInputDto) {
    try {
      const existHouse = await this.houseRepository.findOneBy({ id: id });
      if (!house) {
        throw new BadRequestException('House not found');
      }
      const updateHouse = this.houseRepository.create(house);
      return this.houseRepository.merge(existHouse, updateHouse);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOwnerInfo(id: string) {
    try {
      const house = await this.houseRepository.findOneBy({ id: id });
      if (!house) {
        throw new BadRequestException('House not found');
      }

      const user = await this.dataSource
        .getRepository(Users)
        .createQueryBuilder('user')
        .where('id = :id', { id: house.ownerId })
        .getOne();

      console.log(user);

      return { ...house, owner: user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllHousesAndOwnerInfo() {
    try {
      const result = await this.houseRepository
        .createQueryBuilder('house')
        .leftJoinAndSelect('house.owner', 'user')
        .getMany();
      console.log(result);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getHouseWithOwnerAndLocation(id: string) {
    try {
      const house = await this.houseRepository
        .createQueryBuilder('house')
        .where('house.id = :id', { id: id })
        .leftJoinAndSelect('house.owner', 'user')
        .leftJoinAndSelect('house.location', 'location')
        .getOne();
      console.log(house);
      return house;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllHousesWithOwnerAndLocation() {
    try {
      const houses = await this.houseRepository
        .createQueryBuilder('house')
        .leftJoinAndSelect('house.owner', 'user')
        .leftJoinAndSelect('house.location', 'location')
        .getMany();
      console.log(houses);
      return houses;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
