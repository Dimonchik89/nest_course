import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [PropertyModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
