import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/users.decorator';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query()
  getMe(@CurrentUser() user: Users) {
    return user;
  }
}
