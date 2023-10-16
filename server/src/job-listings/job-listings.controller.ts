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

import { CreateJobListingDto } from './dto/create-job-listing.dto';
import { JobListingsService } from './job-listings.service';
import { UpdateJobListingDto } from './dto/update-job-listing.dto';

@Controller('job-listings')
export class JobListingsController {
  constructor(private readonly jobListingsService: JobListingsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @AuthSession() authUser: AuthUser,
    @Body() createJobListingDto: CreateJobListingDto,
  ) {
    return this.jobListingsService.create(authUser, createJobListingDto);
  }

  @Get()
  findAll() {
    return this.jobListingsService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard)
  findMyAll(@AuthSession() authUser: AuthUser) {
    return this.jobListingsService.findMyAll(authUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobListingsService.findOne(id, true);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @AuthSession() authUser: AuthUser,
    @Body() updateJobListingDto: UpdateJobListingDto,
    @Param('id') id: string,
  ) {
    return this.jobListingsService.update(id, authUser, updateJobListingDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@AuthSession() authUser: AuthUser, @Param('id') id: string) {
    return this.jobListingsService.remove(id, authUser);
  }
}
