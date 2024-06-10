import { Module } from '@nestjs/common';
import { OrderDtsController } from './orderDts.controller';
import { OrderDtsService } from './orderDts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDts, OrderDtsSchema } from './schemas/orderDts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderDts.name,
        schema: OrderDtsSchema,
      },
    ]),
  ],
  controllers: [OrderDtsController],
  providers: [OrderDtsService],
  exports: [OrderDtsService],
})
export class OrderDtsModule {}
