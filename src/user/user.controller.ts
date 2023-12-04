import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { CreateUserDto } from './DTOs/create-user.dto';
import { LoginUserDTO } from './DTOs/login-user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('/api')
export class UserController {
  constructor(
    private readonly uService: UserService,
    private readonly JwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    const data = await this.uService.create(body);
    const { password, ...result } = data;
    return result;
  }

  @Post('/login')
  async login(
    @Body() body: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.uService.login(body);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 3600000),
    });
    return;
  }

  @Get('/user')
  async user(@Req() req: Request) {
    try {
      const jwt = req.cookies['jwt'];
      const data = await this.JwtService.verifyAsync(jwt);
      const user = this.uService.findOne({ email: data.email });
      const { password, ...result } = await user;
      return result;
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'success' };
  }
}
