import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdpipe';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  //   indOne(@Param('id', ParseIntPipe) id: number) ParseIdPipe - использовал для преобразования строки в число (мой кастомный pipe)
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Post()
  //   @UsePipes(
  //     new ValidationPipe({
  //       whitelist: true,
  //       forbidNonWhitelisted: true,
  //     }),
  //   )
  create(@Body() dto: CreatePropertyDto) {
    return this.propertyService.create(dto);
  }

  @Patch(':id')
  //   @UsePipes(
  //     new ValidationPipe({
  //       whitelist: true,
  //       forbidNonWhitelisted: true,
  //       groups: ['update'],
  //       always: true, // тогда в dto можно не указывать { always: true }
  //     }),
  //   )
  //   ParseIdPipe - ручное преобразование донных
  //   updateOne(@Param('id', ParseIdPipe) id, @Body() dto: CreatePropertyDto) ParseIdPipe - использовал для преобразования строки в число (мой кастомный pipe)
  updateOne(@Param('id') id, @Body() dto: UpdatePropertyDto) {
    return this.propertyService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.propertyService.delete(id);
  }

  @Patch('headers/:id')
  validationHeaders(
    @RequestHeader(HeadersDto)
    headers: HeadersDto,
  ) {
    return 'headers';
  }
}
