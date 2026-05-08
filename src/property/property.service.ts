import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async findAll() {
    return await this.propertyRepository.find();
  }

  async findOne(id: string) {
    const property = await this.propertyRepository.findOne({
      where: {
        id,
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
}
