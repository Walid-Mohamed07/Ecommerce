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
import { CreateOrderDtsDto } from './dtos/create-orderDts.dto';
import { UpdateOrderDtsDto } from './dtos/update-orderDts.dto';
import { OrderDtsService } from './orderDts.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('orderDts')
export class OrderDtsController {
  constructor(private readonly orderDtsService: OrderDtsService) {}

  @Public()
  @Get()
  find() {
    return this.orderDtsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDtsService.findById(id);
  }

  @Post()
  create(@Body() createOrderDtsDto: CreateOrderDtsDto) {
    return this.orderDtsService.create(createOrderDtsDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDtsDto: UpdateOrderDtsDto,
  ) {
    return this.orderDtsService.update(id, updateOrderDtsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.orderDtsService.delete(id);
  }
}
