import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@/auth/guards/auth.guard';
import { AuthSession } from '@/auth/decorators/auth-session.decorator';
import { type AuthUser } from '@/auth/models/auth-user.model';

import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @AuthSession() authUser: AuthUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(authUser, createTaskDto);
  }

  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get('me')
  async findMyAll(@AuthSession() authUser: AuthUser) {
    return this.tasksService.findMyAll(authUser);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  async update(
    @AuthSession() authUser: AuthUser,
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
  ) {
    return this.tasksService.update(id, authUser, updateTaskDto);
  }

  @Delete(':id')
  async remove(@AuthSession() authUser: AuthUser, @Param('id') id: string) {
    return this.tasksService.remove(id, authUser);
  }
}
