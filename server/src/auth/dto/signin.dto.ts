import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInDto {
  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}
