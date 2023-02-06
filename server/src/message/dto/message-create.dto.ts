import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessageCreateDto {
  @Field()
  chatId: string;

  @Field()
  message: string;
}
