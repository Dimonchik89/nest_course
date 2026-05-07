import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyService {
  async findAll() {
    return 'All';
  }

  async findOne() {
    return 'one';
  }

  async create() {
    return 'create';
  }

  async update() {
    return 'upddate';
  }
}
