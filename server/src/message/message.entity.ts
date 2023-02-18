import { Field, ObjectType } from '@nestjs/graphql';
import { ChatsEntity } from 'src/chats/chats.enity';
import { UsersEntity } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('message')
export class MessageEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text')
  message: string;

  @Field()
  @Column('boolean', { default: false })
  read: boolean;

  @Field(() => [ChatsEntity])
  @ManyToOne(() => ChatsEntity, (chat) => chat.messages)
  chat: ChatsEntity;

  @Field(() => UsersEntity)
  @ManyToOne(() => UsersEntity, (user) => user.id)
  userFrom: UsersEntity;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
