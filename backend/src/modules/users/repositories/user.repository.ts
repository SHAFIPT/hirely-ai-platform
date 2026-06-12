import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IUserRepository } from '../interfaces/user.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<any> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(userData: any): Promise<any> {
    return this.prisma.user.create({ data: userData });
  }

  async update(id: string, userData: any): Promise<any> {
    return this.prisma.user.update({ where: { id }, data: userData });
  }

  async updateRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }
}
