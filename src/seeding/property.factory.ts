import { setSeederFactory } from 'typeorm-extension';
import { Property } from '../entities/property.entity';

export const PropertyFactory = setSeederFactory(Property, (faker) => {
  const property = new Property();
  property.name = faker.location.street();
  property.description = faker.lorem.sentence();
  property.price = +faker.commerce.price({ min: 10000, max: 1000000 });

  return property;
});
