import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Resolver('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthModel)
  registration(@Args('input') user: SignUpDto) {
    console.log(user);
    this.authService.registration({ ...user });
  }

  @Mutation(() => AuthModel)
  login(@Args('input') user: SignInDto) {
    console.log(user);
    this.authService.login({ ...user });
  }
}
