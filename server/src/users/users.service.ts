import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async findById(id: string): Promise<Users> {
    return await this.usersRepository.findOneBy({ id });
  }
}
