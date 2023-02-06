import { UseGuards } from '@nestjs/common/decorators';
import { Args, Resolver, Query, Mutation, Subscription } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/users.decorator';
import { GraphqlAuthGuard } from 'src/guards/auth.guard';
import { pubsub } from 'src/pubsub/pubsub';
import { UsersEntity } from 'src/users/users.entity';
import { ChatsEntity } from './chats.enity';
import { ChatsService } from './chats.service';

@UseGuards(GraphqlAuthGuard)
@Resolver('Chat')
export class ChatsResolver {
  constructor(private chatService: ChatsService) {}

  @Query(() => ChatsEntity)
  async getChatByIdWithMessages(
    @Args('id') id: string,
    @CurrentUser() user: UsersEntity,
  ) {
    return await this.chatService.getChatByIdWithMessages(id, user);
  }

  @Query(() => [ChatsEntity])
  getMyChats(@CurrentUser() user: UsersEntity) {
    return this.chatService.getMyChats(user);
  }

  @Query(() => ChatsEntity)
  getMyChatById(@Args('id') id: string) {
    return this.chatService.getMyChatById(id);
  }

  @Mutation(() => ChatsEntity)
  async createChat(
    @Args('userToId') userToId: string,
    @CurrentUser() user: UsersEntity,
  ) {
    return await this.chatService.createChat(userToId, user);
  }

  @Subscription(() => ChatsEntity, {
    filter: (payload: any, variables: any) => {
      return payload.chatUpdated.users.filter((user) => {
        return user.id === variables.userId;
      }).length;
    },
  })
  chatUpdated(@Args('userId') userId: string) {
    return pubsub.asyncIterator('chatUpdated');
  }
}
