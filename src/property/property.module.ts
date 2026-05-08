import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { PropertyFeature } from '../entities/propertyFeature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, PropertyFeature])],
  controllers: [PropertyController],
  providers: [
    PropertyService,
    // установить валидацию для целого модуля (не глобально на весь проект а только контроллер этого модуля)
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        // преобразовывает наши параметры для валидации
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class PropertyModule {}
