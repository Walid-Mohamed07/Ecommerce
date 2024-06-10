import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  // @Length(3, 20)
  readonly name: string;

  // @IsString()
  // readonly imagePath: string;

  @IsNotEmpty()
  @IsNumber()
  readonly stockAvailableQuantity: number;

  @IsString()
  readonly category: string;
}
