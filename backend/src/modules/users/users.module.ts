import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  providers: [PrismaService, UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UsersModule {}
