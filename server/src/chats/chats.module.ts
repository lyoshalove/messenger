import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsEntity } from './chats.enity';
import { UsersEntity } from 'src/users/users.entity';
import { MessageEntity } from 'src/message/message.entity';
import { UsersService } from 'src/users/users.service';
import { FilesModule } from 'src/files/files.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatsEntity, UsersEntity, MessageEntity]),
    FilesModule,
  ],
  providers: [ChatsService, ChatsResolver, UsersService, JwtService],
})
export class ChatsModule {}
