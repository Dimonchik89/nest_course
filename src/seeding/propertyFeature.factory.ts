import { setSeederFactory } from 'typeorm-extension';
import { PropertyFeature } from '../entities/propertyFeature.entity';

export const PropertyFeatureFactory = setSeederFactory(
  PropertyFeature,
  (faker) => {
    const propertyFeature = new PropertyFeature();
    propertyFeature.bedrooms = faker.number.int({ min: 1, max: 5 });
    propertyFeature.bathrooms = faker.number.int({ min: 1, max: 3 });
    propertyFeature.parkingSpots = faker.number.int({ min: 1, max: 3 });
    propertyFeature.area = faker.number.int({ min: 25, max: 250 });
    propertyFeature.hasSwimmingPool = faker.datatype.boolean();
    propertyFeature.hasGardenYard = faker.datatype.boolean();
    propertyFeature.hasBalcony = faker.datatype.boolean();

    return propertyFeature;
  },
);
