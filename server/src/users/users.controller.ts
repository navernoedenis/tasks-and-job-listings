import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@/auth/guards/auth.guard';
import { AuthSession } from '@/auth/decorators/auth-session.decorator';
import { type AuthUser } from '@/auth/models/auth-user.model';

import { excludeFields } from '@/utils/helpers/exclude-fields';

import { UpdateRoleDto } from './dto/update-role.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return users.map((user) => {
      return excludeFields(user, ['password', 'updatedAt']);
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne('id', id, true);
    return excludeFields(user, ['password', 'updatedAt']);
  }

  @Delete(':id')
  async remove(@Param('id') userId: string, @AuthSession() authUser: AuthUser) {
    return this.usersService.remove(userId, authUser);
  }

  @Patch(':id/role')
  async updateRole(
    @AuthSession() authUser: AuthUser,
    @Body() updateRoleDto: UpdateRoleDto,
    @Param('id') userId: string,
  ) {
    return this.usersService.updateRole(userId, authUser, updateRoleDto);
  }
}
