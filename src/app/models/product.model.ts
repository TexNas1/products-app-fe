import { IsNotEmpty, IsNumber, MaxLength, Min } from 'class-validator';

export class Product {
  constructor() {
    this.id = 0;
    this.name = '';
    this.price = 0;
    this.description = '';
  }

  id: number;

  @IsNotEmpty({ message: 'Name is required.' })
  @MaxLength(255, { message: 'Name must be less than 255 characters.' })
  name: string;

  @IsNotEmpty({ message: 'Price is required.' })
  @IsNumber({}, { message: 'Price must be a number.' })
  @Min(0, { message: 'Price must be greater than zero.' })
  price: number;

  @MaxLength(1000, { message: 'Description must be less than 1000 characters.' })
  description: string;
}
