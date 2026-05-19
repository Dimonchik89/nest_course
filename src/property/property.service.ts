import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PropertyFeature } from '../entities/propertyFeature.entity';
import { PaginationDto } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(PropertyFeature)
    private propertyFeatureRepository: Repository<PropertyFeature>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const skip =
      ((paginationDto.page || 1) - 1) *
      (paginationDto.limit ?? DEFAULT_PAGE_SIZE);
    const take = paginationDto.limit ?? DEFAULT_PAGE_SIZE;

    return await this.propertyRepository.find({
      skip,
      take,
    });
  }

  async findOne(id: string) {
    const property = await this.propertyRepository.findOne({
      where: {
        id,
      },
      relations: ['propertyFeature', 'user'], // добавляем если в получаемом обьекте нужны связаные таблицы
      select: {
        // добавляем если из связанных таблиц нужны не все поля а только некоторые, выбираем нужные
        propertyFeature: {
          id: true,
          bedrooms: true,
          bathrooms: true,
          parkingSpots: true,
          area: true,
          hasSwimmingPool: true,
          hasGardenYard: true,
          hasBalcony: true,
        },
        user: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    });

    if (!property) throw new NotFoundException();
    return property;
  }

  async create(dto: CreatePropertyDto) {
    const { userId, ...tailDto } = dto;

    return await this.propertyRepository.save({
      ...tailDto,
      user: {
        id: userId,
      },
    });
  }

  async update(id: string, dto: UpdatePropertyDto) {
    return await this.propertyRepository.update({ id }, dto);
  }

  async delete(id: string) {
    return await this.propertyRepository.delete({
      id,
    });
  }

  async createPropertyFeature(dto: any) {
    const { propertyId, ...tailDto } = dto;
    const existing = await this.propertyFeatureRepository.findOne({
      where: {
        property: {
          id: propertyId,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('Property feature already exists');
    }

    const propertyFeature = this.propertyFeatureRepository.create({
      ...tailDto,
      property: { id: propertyId },
    });

    return await this.propertyFeatureRepository.save(propertyFeature);
  }
}
