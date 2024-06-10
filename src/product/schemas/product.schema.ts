import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from '../../category/schemas/category.schema';

// export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product extends Document {
  @Prop({ unique: [true, 'Duplicate product name entered'] })
  name: string;

  @Prop()
  stockAvailableQuantity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
