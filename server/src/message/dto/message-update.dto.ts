import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessagesUpdated {
  @Field()
  chatId: string;

  @Field(() => [String])
  messageIds: string[];
}

@ObjectType()
export class MessageUpdateDto {
  @Field(() => MessagesUpdated)
  messagesUpdated: MessagesUpdated;
}
