import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity()
export class PropertyFeature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column()
  parkingSpots: number;

  @Column()
  area: number;

  @Column()
  hasSwimmingPool: boolean;

  @Column()
  hasGardenYard: boolean;

  @Column()
  hasBalcony: boolean;

  @OneToOne(() => Property, (property) => property.propertyFeature, {
    onDelete: 'CASCADE', // при удалении конкретной таблицы property будет удалены и связанная с ней propertyFeature
  })
  @JoinColumn({ name: 'propertyId' })
  property: Property;
}
