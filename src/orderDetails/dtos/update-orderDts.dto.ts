import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDtsDto } from './create-orderDts.dto';

export class UpdateOrderDtsDto extends PartialType(CreateOrderDtsDto) {}
