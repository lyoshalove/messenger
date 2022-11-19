import { Field, ObjectType } from '@nestjs/graphql';
import { ChatsEntity } from 'src/chats/chats.enity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class UsersEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column('boolean', { default: false, nullable: true })
  online: boolean;

  @ManyToMany(() => ChatsEntity, (chat) => chat.users)
  chats: ChatsEntity[];

  @Field()
  @CreateDateColumn()
  createdAt: string;
}
