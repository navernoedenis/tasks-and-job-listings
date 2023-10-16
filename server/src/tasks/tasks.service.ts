import { prisma } from '@/prisma';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { type AuthUser } from '@/auth/models/auth-user.model';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  async create(authUser: AuthUser, createTaskDto: CreateTaskDto) {
    return prisma.task.create({
      data: { ...createTaskDto, authorId: authUser.id },
    });
  }

  async findAll() {
    return prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findMyAll(authUser: AuthUser) {
    return prisma.task.findMany({
      where: { authorId: authUser.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, notFoundException: boolean = false) {
    const task = await prisma.task.findFirst({
      where: { id },
    });

    if (!task && notFoundException) {
      throw new NotFoundException("Task wasn't found");
    }

    return task;
  }

  async update(id: string, authUser: AuthUser, updateTaskDto: UpdateTaskDto) {
    await this.findTaskAndCheckCopyright(id, authUser);

    return prisma.task.update({
      data: updateTaskDto,
      where: { id },
    });
  }

  async remove(id: string, authUser: AuthUser) {
    await this.findTaskAndCheckCopyright(id, authUser);
    return prisma.task.delete({ where: { id } });
  }

  private async findTaskAndCheckCopyright(id: string, authUser: AuthUser) {
    const task = await this.findOne(id, true);

    if (task.authorId !== authUser.id) {
      throw new ForbiddenException('You are not an author');
    }

    return task;
  }
}
