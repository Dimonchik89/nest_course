import {
  Body,
  Controller,
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

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return this.propertyService.findOne();
  }

  @Post()
  //   @UsePipes(
  //     new ValidationPipe({
  //       whitelist: true,
  //       forbidNonWhitelisted: true,
  //     }),
  //   )
  create(@Body() body: CreatePropertyDto) {
    // console.log(headers);

    return this.propertyService.create();
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
  updateOne(@Param('id', ParseIdPipe) id, @Body() dto: CreatePropertyDto) {
    console.log(typeof id);
    return this.propertyService.update();
  }

  @Patch('headers/:id')
  validationHeaders(
    @RequestHeader(HeadersDto)
    headers: HeadersDto,
  ) {
    return headers;
  }
}
