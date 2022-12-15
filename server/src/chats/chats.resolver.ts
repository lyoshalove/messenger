<<<<<<< HEAD
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
=======
import { Args, Resolver, Query } from '@nestjs/graphql';
>>>>>>> feat/new-features
import { CurrentUser } from 'src/decorators/users.decorator';
import { UsersEntity } from 'src/users/users.entity';
import { ChatsEntity } from './chats.enity';
import { ChatsService } from './chats.service';

@Resolver('Chat')
export class ChatsResolver {
  constructor(private chatService: ChatsService) {}

<<<<<<< HEAD
  @Query((returns) => ChatsEntity)
  getChat(
    @Args('id') id: string,
    @Args('limit') limit: number,
    @Args('offset') offset: number,
    @CurrentUser() user: UsersEntity,
  ) {
    return this.chatService.getChatByIdWithMessages(id, limit, offset, user);
=======
  @Query(() => ChatsEntity)
  async getChat(@Args('id') id: string, @CurrentUser() user: UsersEntity) {
    return await this.chatService.getChatByIdWithMessages(id, user);
>>>>>>> feat/new-features
  }

  @Query((returns) => [ChatsEntity])
  getMyChats(@CurrentUser() user: UsersEntity) {
    console.log(user);
    return this.chatService.getMyChats(user);
  }

  @Mutation((returns) => ChatsEntity)
  async createChat(
    @Args('userTo') userTo: string,
    @CurrentUser() user: UsersEntity,
  ) {
    return await this.chatService.createChat(userTo, user);
  }
}
