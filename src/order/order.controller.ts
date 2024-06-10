import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { OrderService } from './order.service';
import { OrderDtsService } from '../orderDetails/orderDts.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderDtsService: OrderDtsService,
  ) {}

  @Public()
  @Get()
  find() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.create(createOrderDto);
    return this.orderDtsService.create({
      orderId: order.id,
      quantity: 1,
      status: 'In progress...',
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
