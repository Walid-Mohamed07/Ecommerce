import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Order } from '../../order/schemas/order.schema';

@Schema({
  timestamps: true,
})
export class OrderDts extends Document {
  @Prop({
    unique: [true, 'Duplicate Order details!'],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  })
  orderId: Order;

  @Prop()
  quantity: number;

  @Prop()
  status: string;
}

export const OrderDtsSchema = SchemaFactory.createForClass(OrderDts);
