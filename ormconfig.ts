import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

const config = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgresun',
  password: process.env.DATABASE_PASSWORD || 'postgrespw',
  database: process.env.DATABASE_NAME || 'nestjs-demo',
  entities: ['./database/entities/*.ts'],
  migrations: ['./database/migrations/*.ts'],
  synchronize: false,
});

config.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export { config };

