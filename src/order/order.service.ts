import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './schemas/order.schema';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
// import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  findAll() {
    return this.orderModel
      .find()
      .populate('product', { name: 1 })
      .populate('customerId', { username: 1, email: 1 })
      .exec();
  }

  async findById(id: string) {
    const order = await this.orderModel
      .findOne({ _id: id })
      .populate('product', { name: 1 })
      .populate('customerId', { username: 1, email: 1 })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found!`);
    }
    return order;
  }

  create(createOrderDto: CreateOrderDto) {
    const newOrder = new this.orderModel({
      customerId: createOrderDto.customerId,
      product: createOrderDto.product,
      orderDate: createOrderDto.orderDate,
    });
    return newOrder.save();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const existingOrder = await this.orderModel
      .findByIdAndUpdate({ _id: id }, { $set: updateOrderDto }, { new: true })
      .exec();

    if (!existingOrder) {
      throw new NotFoundException(`Order #${id} not found!`);
    }
    return existingOrder;
  }

  async delete(id: string) {
    // this.users = this.users.filter((user) => user.id != id);
    const res = await this.orderModel.findByIdAndDelete(id);
    if (res == null) {
      throw new NotFoundException(`Order #${id} not found!`);
    }
    return res;
  }
}
