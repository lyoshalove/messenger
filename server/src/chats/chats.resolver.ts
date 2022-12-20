import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/users.decorator';
import { UsersEntity } from 'src/users/users.entity';
import { ChatsEntity } from './chats.enity';
import { ChatsService } from './chats.service';

@Resolver('Chat')
export class ChatsResolver {
  constructor(private chatService: ChatsService) {}

  @Query(() => ChatsEntity)
  async getChat(@Args('id') id: string, @CurrentUser() user: UsersEntity) {
    return await this.chatService.getChatByIdWithMessages(id, user);
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
