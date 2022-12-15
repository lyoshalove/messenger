import { Args, Resolver, Query } from '@nestjs/graphql';
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
}
