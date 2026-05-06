import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import {
  CreatePropertyZodSchema,
  createPropertySchema,
} from './dto/createPropertyZod.dto';

@Controller('schedule')
export class ScheduleController {
  @Post()
  //   Валидация при помощи Zod
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  create(@Body() body: CreatePropertyZodSchema) {
    return body;
  }
}
