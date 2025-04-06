import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// src/users/types/user.type.ts
import { User as PrismaUser } from '@prisma/client';

// 从Prisma类型派生安全类型
export type SafeUser = Omit<PrismaUser, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    public jwtService: JwtService,
  ) {}

  // 用户注册
  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await argon2.hash(registerDto.password);

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        username: registerDto.username,
        password: hashedPassword,
        role: 'USER', // 默认角色
      },
    });

    return this.generateAccessToken(user);
  }

  // 用户登录
  async login(loginDto: LoginDto) {
    const user = await this.validateCredentials(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAccessToken(user);
  }

  // 凭证验证
  private async validateCredentials(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isValid = await argon2.verify(user.password, password);
    return isValid ? user : null;
  }

  // 生成JWT
  private generateAccessToken(user: SafeUser) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
