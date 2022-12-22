import { UseGuards } from '@nestjs/common/decorators';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/users.decorator';
import { GraphqlAuthGuard } from 'src/guards/auth.guard';
import { UsersEntity } from 'src/users/users.entity';
import { ChatsEntity } from './chats.enity';
import { ChatsService } from './chats.service';

@UseGuards(GraphqlAuthGuard)
@Resolver('Chat')
export class ChatsResolver {
  constructor(private chatService: ChatsService) {}

  @Query(() => ChatsEntity)
  async getChat(@Args('id') id: string, @CurrentUser() user: UsersEntity) {
    return await this.chatService.getChatByIdWithMessages(id, user);
  }

  @Query(() => [ChatsEntity])
  getMyChats(@CurrentUser() user: UsersEntity) {
    return this.chatService.getMyChats(user);
  }

  @Mutation(() => ChatsEntity)
  async createChat(
    @Args('userToId') userToId: string,
    @CurrentUser() user: UsersEntity,
  ) {
    return await this.chatService.createChat(userToId, user);
  }
}
