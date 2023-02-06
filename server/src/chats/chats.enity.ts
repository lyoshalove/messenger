import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MessageEntity } from 'src/message/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@ObjectType()
@Entity('chat')
export class ChatsEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => [UsersEntity])
  @Column({ type: 'simple-array', nullable: true })
  @JoinTable()
  @ManyToMany(() => UsersEntity, (user) => user.chats)
  users: UsersEntity[];

  @Field(() => [MessageEntity], { nullable: true })
  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages: MessageEntity[];

  @Field(() => Int, { defaultValue: 0 })
  unreadMessagesCount: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
