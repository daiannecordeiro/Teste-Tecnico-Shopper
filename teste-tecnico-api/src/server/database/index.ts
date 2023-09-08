import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CreateTables1694131500744 } from './migrations/1694131500744-CreateTables';
import { Packs } from './entities/packs';
import { Product } from './entities/product';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST,
  port: Number(process.env.MYSQL_LOCAL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Packs, Product],
  migrations: [CreateTables1694131500744],
  subscribers: [],
});
