import { Injectable } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatsEntity } from 'src/chats/chats.enity';
import { ChatsService } from 'src/chats/chats.service';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(ChatsEntity)
    private readonly chatsRepository: Repository<ChatsEntity>,
    private readonly chatsService: ChatsService,
  ) {}

  async createMessage({ chatId, message, userFrom }) {
    const chat = await this.chatsService.getMyChatById(chatId);
    const createdMessage = await this.messageRepository.create({
      message,
      chat,
      userFrom,
    });

    await this.messageRepository.save(createdMessage);

    if (!createdMessage) throw new UnprocessableEntityException();

    await this.chatsService.setChatUpdated(chat.id);

    return createdMessage;
  }

  async setMessagesRead(messageIds: string[]) {
    await this.messageRepository
      .createQueryBuilder('message')
      .update(MessageEntity, { read: true })
      .where('id IN (:...id)', { id: messageIds })
      .execute();
  }
}
