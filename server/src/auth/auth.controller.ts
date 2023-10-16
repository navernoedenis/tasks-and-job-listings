import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { type Request, type Response } from 'express';
import { CreateUserDto } from '@/users/dto/create-user.dto';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { AuthSession } from './decorators/auth-session.decorator';
import { AuthUserDto } from './dto/auth-user.dto';
import { type AuthUser } from './models/auth-user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() authUserDto: AuthUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const user = await this.authService.login(authUserDto);

    request.session.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    request.session.save(() => {
      response.status(HttpStatus.OK).json(user);
    });
  }

  @Post('/logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    request.session.destroy(() => {
      response.status(HttpStatus.OK).end();
    });
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/check-session')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async checkSession(@AuthSession() authUser: AuthUser) {
    return this.authService.checkSession(authUser);
  }
}
