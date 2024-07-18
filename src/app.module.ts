import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { HouseModule } from './modules/house/house.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME || 'postgresun',
      password: process.env.DATABASE_PASSWORD || 'postgrespw',
      database: process.env.DATABASE_NAME || 'nestjs-demo',
      entities: [join(__dirname + '../database/entities/*.ts')],
      synchronize: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    HouseModule,
  ],
})
export class AppModule {}
