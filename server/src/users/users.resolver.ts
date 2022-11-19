import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/users.decorator';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => UsersEntity)
  getMe(@CurrentUser() user: UsersEntity) {
    return user;
  }
}
