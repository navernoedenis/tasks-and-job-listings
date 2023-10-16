import { Injectable } from '@nestjs/common';
import { prisma } from '@/prisma';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { profileSelect } from './helpers/profile.select';

@Injectable()
export class ProfilesService {
  async update(id: string, updateProfileDto: UpdateProfileDto) {
    return prisma.profile.update({
      data: updateProfileDto,
      select: profileSelect(),
      where: { userId: id },
    });
  }
}
