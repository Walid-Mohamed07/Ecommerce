import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  // ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  // Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
// import { v4 as uuid } from 'uuid';
// import { CustomValidationPipe } from './pipes/validation.pipe';
import { UserService } from './user.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private user: UserEntity[] = [];

  @Get()
  find() {
    return this.userService.findUser();
  }

  @Get(':id')
  @UseInterceptors(AnyFilesInterceptor())
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  create(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    console.log(profilePicture);
    console.log(createUserDto);
    return this.userService.createUser(profilePicture, createUserDto);
  }

  @Patch(':id')
  @Roles(Role.Admin) // Requires 'admin' role
  @UseInterceptors(FileInterceptor('profilePicture'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    return this.userService.updateUser(id, updateUserDto, profilePicture);
  }

  @Delete(':id')
  @Roles(Role.Admin) // Requires 'admin' role
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
