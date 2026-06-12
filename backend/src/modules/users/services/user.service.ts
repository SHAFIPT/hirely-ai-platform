import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<any> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<any> {
    return this.userRepository.findById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userData = {
      ...createUserDto,
      password: hashedPassword,
      role: 'user',
    };
    return this.userRepository.create(userData);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const userData: any = { ...updateUserDto };
    if ('password' in userData && userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    return this.userRepository.update(id, userData);
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.updateRefreshToken(id, hashedRefreshToken);
  }

  async removeRefreshToken(id: string): Promise<void> {
    await this.userRepository.updateRefreshToken(id, null);
  }

  async validateRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<boolean> {
    const user = await this.findById(id);
    if (!user || !user.refreshToken) {
      return false;
    }
    return bcrypt.compare(refreshToken, user.refreshToken);
  }
}
