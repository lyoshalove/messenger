import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/message/message.entity';
import { UsersEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ChatsEntity } from './chats.enity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatsEntity)
    private readonly chatsRepository: Repository<ChatsEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly usersService: UsersService,
  ) {}

  async createChat(userToId: string, userFrom: UsersEntity) {
    const userTo = await this.usersService.findUserById(userToId);

    if (!Boolean(userTo)) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const existingChat = await this.existChat(userTo?.id, userFrom?.id);

    if (existingChat) {
      return existingChat;
    }

    const chat = new ChatsEntity();

    if (userTo?.id === userFrom?.id) {
      chat.users = [userTo];
    } else {
      chat.users = [userFrom, userTo];
    }

    return await this.chatsRepository.save(chat);
  }

  async existChat(userTo: string, userFrom: string) {
    const isSelf = userTo === userFrom ? 1 : 2;
    const existingChat = (
      await this.chatsRepository
        .createQueryBuilder('chat')
        .leftJoinAndSelect('chat.users', 'users')
        .where('users.id IN (:...users)', { users: [userFrom, userTo] })
        .getMany()
    )
      .map((chat) => chat.users.length === isSelf && chat)
      .filter((chat) => chat)
      .map((chat) => {
        const correctCount = chat.users.reduce((acc, user) => {
          return (acc += Number([userFrom, userTo].includes(user.id)));
        }, 0);
        return correctCount === chat.users.length && chat;
      })
      .filter((chat) => chat);

    return existingChat[0];
  }

  async getChatByIdWithMessages(id: string, user: UsersEntity) {
    const chat = await this.chatsRepository
      .createQueryBuilder('chat')
      .where('chat.id = :id', { id })
      .getOne();

    chat.users = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.chats', 'chat')
      .where('chat.id = :id', { id })
      .getMany();

    if (!chat.users.filter((u) => user.id === u.id).length)
      throw new ForbiddenException('Ты хочешь попасть в чужой чат');

    chat.messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.chat', 'chat')
      .leftJoinAndSelect('message.userFrom', 'user')
      .leftJoinAndSelect('user.avatar', 'file')
      .where('chat.id = :id', { id })
      .orderBy('message.createdAt', 'ASC')
      .getMany();

    return chat;
  }

  async getMyChatById(chat_id: string) {
    const chat = await this.chatsRepository
      .createQueryBuilder('chat')
      .where('chat.id = :id', { id: chat_id })
      .innerJoinAndSelect('chat.users', 'users')
      .getOne();

    return this.addUsersAndMessagesToChat(chat);
  }

  async getMyChats(user: UsersEntity) {
    const chats = await this.chatsRepository
      .createQueryBuilder('chat')
      .innerJoinAndSelect('chat.users', 'users', 'users.id IN (:...id)', {
        id: [user.id],
      })
      .getMany();

    return chats.map((chat) => this.addUsersAndMessagesToChat(chat));
  }

  async addUsersAndMessagesToChat(chat: ChatsEntity) {
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.chats', 'chat')
      .leftJoinAndSelect('user.avatar', 'file')
      .where('chat.id = :id', { id: chat.id })
      .getMany();

    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.chat', 'chat')
      .leftJoinAndSelect('message.userFrom', 'user')
      .where('chat.id = :id', { id: chat.id })
      .orderBy('message.createdAt', 'ASC')
      .getMany();

    chat.messages = messages;
    chat.users = users;

    return chat;
  }
}
