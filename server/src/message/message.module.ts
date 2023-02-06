import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { ChatsService } from 'src/chats/chats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { ChatsEntity } from 'src/chats/chats.enity';
import { UsersEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { FilesService } from 'src/files/files.service';
import { FilesEntity } from 'src/files/files.entity';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MessageEntity,
      ChatsEntity,
      UsersEntity,
      FilesEntity,
    ]),
  ],
  providers: [
    MessageService,
    MessageResolver,
    ChatsService,
    UsersService,
    FilesService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class MessageModule {}
