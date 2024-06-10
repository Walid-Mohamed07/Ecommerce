import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  readonly customerId: string;

  @IsString()
  readonly product: string;

  @IsString()
  readonly orderDate: string = new Date().toString();
}
