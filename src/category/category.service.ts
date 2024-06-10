import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './schemas/category.schema';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
// import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  findAll() {
    return this.categoryModel.find().exec();
  }

  async findById(id: string) {
    const category = await this.categoryModel.findOne({ _id: id }).exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found!`);
    }
    return category;
  }

  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.categoryModel
      .findByIdAndUpdate(
        { _id: id },
        { $set: updateCategoryDto },
        { new: true },
      )
      .exec();

    if (!existingCategory) {
      throw new NotFoundException(`Category #${id} not found!`);
    }
    return existingCategory;
  }

  async delete(id: string) {
    // this.users = this.users.filter((user) => user.id != id);
    const res = await this.categoryModel.findByIdAndDelete(id);
    if (res == null) {
      throw new NotFoundException(`Category #${id} not found!`);
    }
    return res;
  }
}
