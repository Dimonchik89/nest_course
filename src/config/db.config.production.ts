import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

export default (): PostgresConnectionOptions => ({
  type: 'postgres',
  port: +process.env.dbPort,
  database: process.env.dbName,
  username: process.env.dbUserName,
  password: process.env.dbPassword,
  entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
  synchronize: false,
});
