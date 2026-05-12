import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: [
        'properties',
        'properties.propertyFeature',
        'likedProperties',
        'likedProperties.propertyFeature',
      ],
    });

    // альтернативний варiант (швидший якщо багато записiв в пов'язаних таблицях)
    // const user = await this.userRepository
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.properties', 'property')
    //   .leftJoinAndSelect('property.propertyFeature', 'feature')
    //   .leftJoinAndSelect('user.likedProperties', 'likedProperty')
    //   .leftJoinAndSelect(
    //     'likedProperty.propertyFeature',
    //     'likedPropertyFeature',
    //   )
    //   .where('user.id = :id', { id })
    //   .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.findUserById(id);
  }

  async create(dto: CreateUserDto) {
    // додати перевiрку на унiкальнiсть email
    return await this.userRepository.save(dto);
  }

  async updateOne(dto: UpdateUserDto, id: string) {
    await this.findUserById(id);

    return await this.userRepository.update({ id }, dto);
  }

  async deleteOne(id: string) {
    await this.findUserById(id);

    return await this.userRepository.delete({ id });
  }

  async likeProperty({
    userId,
    propertyId,
  }: {
    userId: string;
    propertyId: string;
  }) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'likedProperties')
      .of(userId)
      .add(propertyId);

    return { message: 'Added to favorites' };
  }

  async unlikeProperty({
    userId,
    propertyId,
  }: {
    userId: string;
    propertyId: string;
  }) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'likedProperties')
      .of(userId)
      .remove(propertyId);

    return { message: 'Removed from favorites' };
  }
}
