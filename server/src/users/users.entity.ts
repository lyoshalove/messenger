import { Field, ObjectType } from '@nestjs/graphql';
import { ChatsEntity } from 'src/chats/chats.enity';
import { FilesEntity } from 'src/files/files.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
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

  @OneToOne(() => FilesEntity, {
    eager: true,
  })
  @JoinColumn()
  @Field({ nullable: true })
  avatar: FilesEntity;

  @Field()
  @Column('boolean', { default: false, nullable: true })
  online: boolean;

  @ManyToMany(() => ChatsEntity, (chat) => chat.users)
  chats: ChatsEntity[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
