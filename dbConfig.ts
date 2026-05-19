import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Property } from './src/entities/property.entity';

export const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  port: 5430,
  database: 'sacura_dev_data',
  username: 'admin',
  password: '123456',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // для production режима обязательно false иначе при, например, удалении столбца в таблице автоматически применятся изменения в базу данных и столбец с данными из нее удалиться безвозвратно
};
