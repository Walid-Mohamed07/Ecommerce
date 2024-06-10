import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
// import { log } from 'console';

@Injectable()
export class UserService {
  // private users: UserEntity[] = [];

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  storeUserImage(image: Express.Multer.File): string {
    let filename = '';
    const imageStoragePath =
      'D:/QARA/NestJSFundamentals/NestJSFundamentals/NestProjects/ecommerce-app/lib/media/images/profilePecture/';

    // Create the directory if it doesn't exist
    const uploadDir = path.join(imageStoragePath);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Generate a unique filename and save the file
    filename = `${uuidv4()}-${image.originalname}`;
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, image.buffer);

    return `${imageStoragePath}${filename}`;
  }

  findUser() {
    return this.userModel.find().populate('role', { _id: 0, name: 1 }).exec();
  }

  findUserByEmail({ email }) {
    return this.userModel
      .findOne({ email })
      .populate('role', { _id: 0, name: 1 })
      .exec();
  }

  async findUserById(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new NotFoundException(`User #${id} not found!`);
    const user = await this.userModel
      .findOne({ _id: id })
      .populate('role', { _id: 0, name: 1 })
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found!`);
    }
    return user;
  }

  async createUser(
    profilePicture: Express.Multer.File,
    createUserDto: CreateUserDto,
  ) {
    console.log(profilePicture);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = new this.userModel({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role
        ? createUserDto.role
        : '663d04e39eb5dd842bc1e3a0',
      profilePicture: profilePicture
        ? this.storeUserImage(profilePicture)
        : null,
    });
    return newUser.save();
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    profilePicture: Express.Multer.File,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new NotFoundException(`Invalid ID!`);
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    const existingUser = await this.userModel
      .findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            username: updateUserDto.username,
            email: updateUserDto.email,
            password: hashedPassword,
            role: updateUserDto.role,
            profilePicture: profilePicture
              ? this.storeUserImage(profilePicture)
              : null,
          },
        },
        { new: true },
      )
      .populate('role', { _id: 0, name: 1 })
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found!`);
    }
    return existingUser;

    // const index = this.users.findIndex((user) => user.id == id);
    // this.users[index] = {
    //   ...this.users[index],
    //   ...updateUserDto,
    // };

    // return this.users[index];
  }

  async deleteUser(id: string) {
    // this.users = this.users.filter((user) => user.id != id);
    const res = await this.userModel.findByIdAndDelete(id);
    if (res == null) {
      throw new NotFoundException(`User #${id} not found!`);
    }
    return res;
  }
}
