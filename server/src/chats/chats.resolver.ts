import { Query } from '@nestjs/common';
import { Args, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/users.decorator';
import { UsersEntity } from 'src/users/users.entity';
import { ChatsService } from './chats.service';

@Resolver('Chat')
export class ChatsResolver {
  constructor(private chatService: ChatsService) {}

  @Query()
  getChat(
    @Args('id') id: string,
    @Args('limit') limit: number,
    @Args('offset') offset: number,
    @CurrentUser() user: UsersEntity,
  ) {
    return this.chatService.getChatByIdWithMessages(id, limit, offset, user);
  }
}
