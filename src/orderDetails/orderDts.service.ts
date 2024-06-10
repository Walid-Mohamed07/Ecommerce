import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDts } from './schemas/orderDts.schema';
import { UpdateOrderDtsDto } from './dtos/update-orderDts.dto';
import { CreateOrderDtsDto } from './dtos/create-orderDts.dto';
// import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderDtsService {
  constructor(
    @InjectModel(OrderDts.name) private readonly orderDtsModel: Model<OrderDts>,
  ) {}

  findAll() {
    return this.orderDtsModel.find().exec();
  }

  async findById(id: string) {
    const orderDts = await this.orderDtsModel.findOne({ _id: id }).exec();
    if (!orderDts) {
      throw new NotFoundException(`Order #${id} not found!`);
    }
    return orderDts;
  }

  create(createOrderDtsDto: CreateOrderDtsDto) {
    const newOrderDts = new this.orderDtsModel(createOrderDtsDto);
    return newOrderDts.save();
  }

  async update(id: string, updateOrderDtsDto: UpdateOrderDtsDto) {
    const existingOrderDts = await this.orderDtsModel
      .findByIdAndUpdate(
        { _id: id },
        { $set: updateOrderDtsDto },
        { new: true },
      )
      .exec();

    if (!existingOrderDts) {
      throw new NotFoundException(`Order #${id} not found!`);
    }
    return existingOrderDts;
  }

  async delete(id: string) {
    // this.users = this.users.filter((user) => user.id != id);
    const res = await this.orderDtsModel.findByIdAndDelete(id);
    if (res == null) {
      throw new NotFoundException(`Order #${id} not found!`);
    }
    return res;
  }
}
