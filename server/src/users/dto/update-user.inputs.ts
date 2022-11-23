import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateInput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

@InputType()
export class updatePasswordInput {
  @Field()
  password: string;

  @Field()
  newPassword: string;

  @Field()
  repeatNewPassword: string;
}
