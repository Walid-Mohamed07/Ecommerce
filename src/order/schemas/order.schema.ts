import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Product } from '../../product/schemas/product.schema';

@Schema({
  timestamps: true,
})
export class Order extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customerId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop()
  orderDate: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
