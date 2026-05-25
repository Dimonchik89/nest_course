import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from '../property/dto/pagination.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateOne(@Body() dto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateOne(dto, id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }

  @Post('like-property')
  likeProperty(@Body() dto: { userId: string; propertyId: string }) {
    return this.userService.likeProperty(dto);
  }

  @Post('unlike-property')
  unlikeProperty(@Body() dto: { userId: string; propertyId: string }) {
    return this.userService.unlikeProperty(dto);
  }
}
