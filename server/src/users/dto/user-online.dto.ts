import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOnlineDto {
  @Field()
  id: string;

  @Field()
  online: boolean;
}
