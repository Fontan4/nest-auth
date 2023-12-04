import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './DTOs/create-user.dto';
import { LoginUserDTO } from './DTOs/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const exists = await this.findOne({ email: data.email });
    if (exists) {
      throw new UnauthorizedException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prismaService.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  async findOne(condition: any): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: condition });
  }

  async login(data: LoginUserDTO): Promise<string> {
    const user = await this.findOne({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, name: user.name, email: data.email };
    return await this.jwtService.signAsync(payload);
  }

  async logout(req: Request): Promise<void> {
    req.res?.clearCookie('jwt');
  }
}
