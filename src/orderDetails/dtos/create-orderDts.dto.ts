import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDtsDto {
  @IsString()
  readonly orderId: string;

  @IsNumber()
  readonly quantity: number;

  @IsString()
  readonly status: string;
}
