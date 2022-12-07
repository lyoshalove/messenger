import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Resolver('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthModel)
  async registration(@Args('input') user: SignUpDto) {
    return await this.authService.registration({ ...user });
  }

  @Mutation(() => AuthModel)
  async login(@Args('input') user: SignInDto) {
    return await this.authService.login({ ...user });
  }
}
