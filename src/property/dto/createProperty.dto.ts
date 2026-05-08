import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(2, 10, { message: 'занадто довге' })
  name: string;

  @IsString()
  @Length(2, 10)
  description: string;

  @IsInt()
  @IsPositive()
  price: number;
}

// Группы не работают при глобальной проверке
// export class CreatePropertyDto {
//   @IsString({ always: true })
//   @Length(2, 10, { message: 'занадто довге' })
//   name: string;

//   @IsString()
//   @Length(2, 10, { groups: ['create'] })
//   @Length(4, 8, { groups: ['update'] })
//   description: string;

//   @IsInt({ always: true })
//   @IsPositive()
//   area: number;
// }
