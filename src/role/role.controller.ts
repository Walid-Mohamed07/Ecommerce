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
  UseGuards,
  // Query,
} from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { RoleService } from './role.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/api-key/roles.guard';

@Controller('role')
@UseGuards(RolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles(Role.Admin) // Requires 'admin' role
  find() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin) // Requires 'admin' role
  findOne(@Param('id') id: string) {
    return this.roleService.findById(id);
  }

  @Post()
  @Roles(Role.Admin) // Requires 'admin' role
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Patch(':id')
  @Roles(Role.Admin) // Requires 'admin' role
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Roles(Role.Admin) // Requires 'admin' role
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
