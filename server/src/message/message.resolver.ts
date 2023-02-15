import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { ChatsService } from 'src/chats/chats.service';
import { CurrentUser } from 'src/decorators/users.decorator';
import { GraphqlAuthGuard } from 'src/guards/auth.guard';
import { pubsub } from 'src/pubsub/pubsub';
import { UsersEntity } from 'src/users/users.entity';
import { MessageCreateDto } from './dto/message-create.dto';
import { MessagesUpdated } from './dto/message-update.dto';
import { MessageEntity } from './message.entity';
import { MessageService } from './message.service';

@UseGuards(GraphqlAuthGuard)
@Resolver()
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    private chatsService: ChatsService,
  ) {}

  @Mutation(() => MessageEntity)
  async sendMessage(
    @Args('input') input: MessageCreateDto,
    @CurrentUser() userFrom: UsersEntity,
  ) {
    const message = await this.messageService.createMessage({
      ...input,
      userFrom,
    });
    const chat = await this.chatsService.getChatByIdWithMessages(
      input.chatId,
      userFrom,
    );

    pubsub.publish('messageSent', { messageSent: message });
    pubsub.publish('chatUpdated', { chatUpdated: chat });
    return message;
  }

  @Mutation(() => Boolean)
  async setMessagesRead(
    @Args({ name: 'messageIds', type: () => [String] }) messageIds: string[],
    @Args('chatId') chatId: string,
  ) {
    await this.messageService.setMessagesRead(messageIds);
    const chat = await this.chatsService.getMyChatById(chatId);

    pubsub.publish('messagesUpdated', {
      messagesUpdated: {
        chatId,
        messageIds,
      },
    });
    pubsub.publish('chatUpdated', { chatUpdated: chat });

    return true;
  }

  @Subscription(() => MessagesUpdated, {
    filter: (payload: any, variables: any) => {
      return payload.messagesUpdated.chatId === variables.chatId;
    },
  })
  messagesUpdated(@Args('chatId') chatId: string) {
    return pubsub.asyncIterator('messagesUpdated');
  }

  @Subscription(() => MessageEntity, {
    filter: (payload: any, variables: any) => {
      return payload.messageSent.chat.id === variables.chatId;
    },
  })
  messageSent(@Args('chatId') chatId: string) {
    return pubsub.asyncIterator('messageSent');
  }
}
