import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOnlineDto {
  @Field()
  userId: string;

  @Field()
  online: boolean;
}
