import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Role extends Document {
  @Prop({ unique: [true, 'Duplicate role name entered'] })
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
