import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { prisma } from '@/prisma';
import { type AuthUser } from '@/auth/models/auth-user.model';

import { CreateJobListingDto } from './dto/create-job-listing.dto';
import { UpdateJobListingDto } from './dto/update-job-listing.dto';

@Injectable()
export class JobListingsService {
  async create(authUser: AuthUser, createJobListingDto: CreateJobListingDto) {
    return prisma.jobListing.create({
      data: { ...createJobListingDto, postedById: authUser.id },
    });
  }

  async findAll() {
    return prisma.jobListing.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findMyAll(authUser: AuthUser) {
    return prisma.jobListing.findMany({
      where: { postedById: authUser.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, notFoundException: boolean = false) {
    const jobListening = await prisma.jobListing.findFirst({
      where: { id },
    });

    if (!jobListening && notFoundException) {
      throw new NotFoundException("Job Listetning wasn't found");
    }

    return jobListening;
  }

  async update(
    id: string,
    authUser: AuthUser,
    updateJobListingDto: UpdateJobListingDto,
  ) {
    await this.findJobListeningAndCheckCopyright(id, authUser);

    return prisma.jobListing.update({
      where: { id },
      data: updateJobListingDto,
    });
  }

  async remove(id: string, authUser: AuthUser) {
    await this.findJobListeningAndCheckCopyright(id, authUser);

    return prisma.jobListing.delete({
      where: { id },
    });
  }

  private async findJobListeningAndCheckCopyright(
    id: string,
    authUser: AuthUser,
  ) {
    const jobListening = await this.findOne(id, true);

    if (jobListening.postedById !== authUser.id) {
      throw new ForbiddenException('You are not an author');
    }

    return jobListening;
  }
}
