import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateInput, updatePasswordInput } from './dto/update-user.inputs';
import { UsersEntity } from './users.entity';
import { GraphQLUpload } from 'apollo-upload-server';
import { FilesService } from 'src/files/files.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private readonly filesService: FilesService,
  ) {}

  async getAllUsers(): Promise<UsersEntity[]> {
    return await this.usersRepository.find({
      relations: ['avatar'],
    });
  }

  async findUserById(id: string): Promise<UsersEntity> {
    return await this.usersRepository.findOneBy({ id });
  }

  async getUserByEmail(email: string): Promise<UsersEntity> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['avatar'],
    });
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

  async updateUser(userId: string, input: UpdateInput, file?: GraphQLUpload) {
    const avatar = file && (await this.filesService.uploadAvatar(file));
    let oldUser;

    if (avatar) {
      oldUser = await this.usersRepository.findOne({
        where: { id: userId },
        relations: ['avatar'],
      });
    }

    await this.usersRepository
      .createQueryBuilder('user')
      .update(UsersEntity, avatar ? { ...input, avatar } : { ...input })
      .where('id = :id', { id: userId })
      .execute();

    if (avatar && oldUser.avatar.id) {
      await this.filesService.deleteFile(oldUser.avatar.id);
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['avatar'],
    });

    return await this.createToken(user);
  }

  async updatePassword(
    userId: string,
    { oldPassword, newPassword, confirmPassword }: updatePasswordInput,
  ) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isCorrectPassword) {
      throw new UnprocessableEntityException('Неправильно введены данные');
    }

    if (oldPassword === confirmPassword) {
      throw new UnprocessableEntityException('Неправильно введены данные');
    }

    await this.usersRepository
      .createQueryBuilder('user')
      .update(UsersEntity, { password: await bcrypt.hash(newPassword, 10) })
      .where('id = :id', { id: userId })
      .execute();

    return true;
  }

  async createToken({ id, email, firstName, lastName, avatar }: UsersEntity) {
    return await {
      token: jwt.sign(
        {
          id,
          email,
          firstName,
          lastName,
          avatar: avatar ? { id: avatar.id } : null,
          online: true,
        },
        process.env.SECRET_KEY || 'secret',
      ),
    };
  }

  async setOnlineStatus(online: boolean, id: string) {
    await this.usersRepository
      .createQueryBuilder('user')
      .update(UsersEntity, { online })
      .where('id = :id', { id })
      .execute();
  }
}
