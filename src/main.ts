import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import dbConfig from './config/db.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // чтоб не устанавливать проверку на каждом контроллере
  //   app.useGlobalPipes(
  //     new ValidationPipe({
  //       whitelist: true,
  //       forbidNonWhitelisted: true,
  //     }),
  //   );
  await app.listen(process.env.PORT ?? 3000);
  console.log(dbConfig());
}
bootstrap();
