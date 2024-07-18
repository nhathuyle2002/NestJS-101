import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterInputDto } from './dto/register.input.dto';
import { RegisterOutputDto } from './dto/register.output.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginInputDto, LoginOutputDto } from './dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    register(@Body() registerInputDto: RegisterInputDto): Promise<RegisterOutputDto> {
        return this.authService.register(registerInputDto);
    }

    @Post('login')
    login(@Body() loginInputDto: LoginInputDto): Promise<LoginOutputDto> {
        return this.authService.login(loginInputDto);
    }
}
