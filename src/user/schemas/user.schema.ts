import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from '../../role/schemas/role.schema';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  username: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;

  @Prop()
  password: string;

  @Prop()
  profilePicture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
