import { Body, Controller, Patch, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@/auth/guards/auth.guard';
import { AuthSession } from '@/auth/decorators/auth-session.decorator';
import { type AuthUser } from '@/auth/models/auth-user.model';

import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
@UseGuards(AuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Patch('/me')
  update(
    @AuthSession() authUser: AuthUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(authUser.id, updateProfileDto);
  }
}
