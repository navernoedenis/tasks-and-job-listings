import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from '@/auth/auth.module';
import { JobListingsModule } from '@/job-listings/job-listings.module';
import { ProfilesModule } from '@/profiles/profiles.module';
import { TasksModule } from '@/tasks/tasks.module';
import { UsersModule } from '@/users/users.module';

import { UserRolesGuard } from '@/users/guards/user-roles.guard';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AuthModule,
    JobListingsModule,
    TasksModule,
    UsersModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: UserRolesGuard,
    },
  ],
})
export class AppModule {}
