import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateInput, updatePasswordInput } from './dto/update-user.inputs';
import { UsersEntity } from './users.entity';
import { GraphQLUpload } from 'graphql-upload';
import { FilesService } from 'src/files/files.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UsersExceptions } from './users.exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private readonly filesService: FilesService,
  ) {}

  async getAllUsers(): Promise<UsersEntity[]> {
    return this.usersRepository.find({
      relations: ['avatar'],
    });
  }

  async findUserById(id: string): Promise<UsersEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  async getUserByEmail(email: string): Promise<UsersEntity> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['avatar'],
    });
  }

  async createUser(userDto: CreateUserDto) {
    const user = this.usersRepository.create(userDto);
    return this.usersRepository.save(user);
  }

  async findUsersByName(name: string) {
    if (!name) return [];

    return this.usersRepository.find({
      where: [
        { firstName: ILike(`%${name}%`) },
        { lastName: ILike(`%${name}%`) },
      ],
    });
  }

  async updateUser(userId: string, input: UpdateInput, file?: GraphQLUpload) {
    let avatar;
    const oldUser = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['avatar'],
    });

    if (file) {
      avatar = await this.filesService.uploadAvatar(file);
    }

    await this.usersRepository
      .createQueryBuilder('user')
      .update(
        UsersEntity,
        avatar
          ? { ...this.getNewUserInfo(input, oldUser), avatar }
          : { ...this.getNewUserInfo(input, oldUser) },
      )
      .where('id = :id', { id: userId })
      .execute();

    if (avatar && oldUser.avatar) {
      await this.filesService.deleteFile(oldUser.avatar.id);
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['avatar'],
    });

    return this.createToken(user);
  }

  private getNewUserInfo(info: UpdateInput, oldUser: UsersEntity) {
    const result = {};

    for (const key in info) {
      if (info[key]) {
        result[key] = info[key];
      } else {
        result[key] = oldUser[key];
      }
    }

    return result;
  }

  async updatePassword(
    userId: string,
    { oldPassword, newPassword, confirmPassword }: updatePasswordInput,
  ) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isCorrectPassword) {
      throw UsersExceptions.WrongUserData();
    }

    if (oldPassword === confirmPassword) {
      throw UsersExceptions.WrongUserData();
    }

    await this.usersRepository
      .createQueryBuilder('user')
      .update(UsersEntity, { password: await bcrypt.hash(newPassword, 10) })
      .where('id = :id', { id: userId })
      .execute();

    return true;
  }

  async createToken({ id }: UsersEntity) {
    return {
      token: jwt.sign(
        {
          id,
        },
        process.env.SECRET_KEY || 'secret',
      ),
    };
  }

  async setOnline(online: boolean, id: string) {
    await this.usersRepository
      .createQueryBuilder('user')
      .update(UsersEntity, { online })
      .where('id = :id', { id })
      .execute();
  }
}
