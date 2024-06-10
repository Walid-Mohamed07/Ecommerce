import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
// import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../category/schemas/category.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  findAll() {
    return this.productModel.find().populate('category').exec();
  }

  async findById(id: string) {
    const product = await this.productModel
      .findOne({ _id: id })
      .populate('category')
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found!`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    // const newProduct = new this.productModel(createProductDto);
    // return newProduct.save();
    console.log(createProductDto);
    const getCategoryId = await this.categoryModel
      .findOne({ _id: createProductDto.category })
      .exec();
    console.log(getCategoryId.id);
    console.log(getCategoryId._id);
    try {
      const newProduct = new this.productModel({
        name: createProductDto.name,
        stockAvailableQuantity: createProductDto.stockAvailableQuantity,
        category: createProductDto.category,
      });
      return await newProduct.save();
    } catch (error) {
      console.log('errorrrrrrrrrrrrrr: ' + error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.productModel
      .findByIdAndUpdate({ _id: id }, { $set: updateProductDto }, { new: true })
      .exec();

    if (!existingProduct) {
      throw new NotFoundException(`Product #${id} not found!`);
    }
    return existingProduct;
  }

  async delete(id: string) {
    // this.users = this.users.filter((user) => user.id != id);
    const res = await this.productModel.findByIdAndDelete(id);
    if (res == null) {
      throw new NotFoundException(`Product #${id} not found!`);
    }
    return res;
  }
}
