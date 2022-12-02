import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpDto {
  @Field()
  readonly firstName: string;

  @Field()
  readonly lastName: string;

  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}
