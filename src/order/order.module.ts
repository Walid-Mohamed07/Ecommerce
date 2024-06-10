import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDtsModule } from '../orderDetails/orderDts.module';
import { OrderDtsService } from '../orderDetails/orderDts.service';
import {
  OrderDts,
  OrderDtsSchema,
} from '../orderDetails/schemas/orderDts.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
// import { OrderDtsController } from '../orderDetails/orderDts.controller';

@Module({
  imports: [
    OrderDtsModule,
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: OrderDts.name,
        schema: OrderDtsSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderDtsService],
})
export class OrderModule {}
