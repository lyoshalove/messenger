import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/users.decorator';
import { GraphqlAuthGuard } from 'src/guards/auth.guard';
import { UpdateInput, updatePasswordInput } from './dto/update-user.inputs';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { GraphQLUpload } from 'graphql-upload';
import { AuthModel } from 'src/auth/auth.model';
import { pubsub } from 'src/pubsub/pubsub';
import { UserOnlineDto } from './dto/user-online.dto';

@UseGuards(GraphqlAuthGuard)
@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UsersEntity)
  getMe(@CurrentUser() user: UsersEntity) {
    return user;
  }

  @Query(() => [UsersEntity])
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Query(() => UsersEntity)
  getUserById(@Args('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Mutation(() => AuthModel)
  async updateUser(
    @Args('input') input: UpdateInput,
    @Args({ name: 'file', nullable: true, type: () => GraphQLUpload })
    file: GraphQLUpload,
    @CurrentUser() user: UsersEntity,
  ) {
    const _file = await file;

    return this.usersService.updateUser(user.id, { ...input }, _file);
  }

  @Mutation(() => Boolean)
  async updatePassword(
    @Args('input') input: updatePasswordInput,
    @CurrentUser() user: UsersEntity,
  ) {
    return this.usersService.updatePassword(user.id, { ...input });
  }

  @Subscription(() => UserOnlineDto)
  userOnline() {
    return pubsub.asyncIterator('userOnline');
  }
}
