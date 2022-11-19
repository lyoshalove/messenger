import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async getAllUsers(): Promise<UsersEntity[]> {
    return await this.usersRepository.find();
  }

  async findUserById(id: string): Promise<UsersEntity> {
    return await this.usersRepository.findOneBy({ id });
  }

  async getUserByEmail(email: string): Promise<UsersEntity> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async createUser(userDto: CreateUserDto) {
    const user = this.usersRepository.create(userDto);
    return await this.usersRepository.save(user);
  }

  async findUsersByName(name: string) {
    if (!name) return [];

    return await this.usersRepository.find({
      where: [
        { firstName: ILike(`%${name}%`) },
        { lastName: ILike(`%${name}%`) },
      ],
    });
  }
}
