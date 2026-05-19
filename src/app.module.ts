import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { ScheduleModule } from './schedule/schedule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { pgConfig } from '../dbConfig';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import dbConfigProduction from './config/db.config.production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // можно использовать везде не подключая в других модулях
      expandVariables: true, // можно в env-файле испоьзовать из как переменный url=${dbName}
      load: [dbConfig, dbConfigProduction],
    }),
    PropertyModule,
    ScheduleModule,
    // TypeOrmModule.forRoot(pgConfig), // использовали просто файл с настройками (данные базы данны были в файле а не env)
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV === 'production' ? dbConfigProduction : dbConfig,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
