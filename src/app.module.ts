import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { ScheduleModule } from './schedule/schedule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from './dbConfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [PropertyModule, ScheduleModule, TypeOrmModule.forRoot(pgConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
