import { Field, ObjectType } from '@nestjs/graphql';
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
@Entity('chats')
export class ChatsEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => [UsersEntity])
  @Column({ type: 'simple-array', nullable: true })
  @JoinTable()
  @ManyToMany(() => UsersEntity, (user) => user.chats)
  users: UsersEntity[];

  @Field(() => [MessageEntity])
  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages: MessageEntity[];

  @Field()
  @CreateDateColumn()
  createdAt: string;
}
