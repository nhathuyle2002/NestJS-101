import { BadRequestException, Injectable } from '@nestjs/common';
import {
  LoginInputDto,
  LoginOutputDto,
  RegisterInputDto,
  RegisterOutputDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'database/entities/user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}
  async register(
    registerInputDto: RegisterInputDto,
  ): Promise<RegisterOutputDto> {
    console.log(registerInputDto);
    try {
      const user = await this.userRepository.findOneBy({
        name: registerInputDto.name,
      });
      if (user) {
        throw new BadRequestException('User already exists');
      }

      // encode password
      const salt = process.env.SALT || 10;
      const hashedPassword = await bcrypt.hash(registerInputDto.password, salt);
      const temp: RegisterInputDto = {
        ...registerInputDto,
        password: hashedPassword,
      };
      const newUser = this.userRepository.create(temp);
      console.log(newUser);
      await this.userRepository.save(newUser);
      return plainToInstance(RegisterOutputDto, newUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginInputDto: LoginInputDto): Promise<LoginOutputDto> {
    try {
      const user = await this.userRepository.findOneBy({
        name: loginInputDto.name,
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (!(await bcrypt.compare(loginInputDto.password, user.password))) {
        throw new BadRequestException('Wrong username or password');
      }

      const payload = { id: user.id, name: user.name, role: user.role };
      const loginOutputDto: LoginOutputDto = {
        token: await this.jwtService.signAsync(payload),
      };
      return loginOutputDto;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
