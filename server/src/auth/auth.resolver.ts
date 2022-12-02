import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => String)
  registration(@Args('input') user: SignUpDto) {
    this.authService.registration({ ...user });
  }

  @Mutation((returns) => String)
  login(@Args('input') user: SignInDto) {
    this.authService.login({ ...user });
  }
}
