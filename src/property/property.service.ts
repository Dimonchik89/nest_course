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

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(PropertyFeature)
    private propertyFeatureRepository: Repository<PropertyFeature>,
  ) {}

  async findAll() {
    return await this.propertyRepository.find();
  }

  async findOne(id: string) {
    const property = await this.propertyRepository.findOne({
      where: {
        id,
      },
      relations: ['propertyFeature'], // добавляем если в получаемом обьекте нужны связаные таблицы
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
      },
    });

    if (!property) throw new NotFoundException();
    return property;
  }

  async create(dto: CreatePropertyDto) {
    return await this.propertyRepository.save(dto);
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
