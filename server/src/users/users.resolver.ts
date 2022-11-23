import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/users.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateInput, updatePasswordInput } from './dto/update-user.inputs';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { GraphQLUpload } from 'apollo-upload-server';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => UsersEntity)
  getMe(@CurrentUser() user: UsersEntity) {
    return user;
  }

  @Query((returns) => [UsersEntity])
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Mutation((returns) => String)
  @UseGuards(new AuthGuard())
  async updateUser(
    @Args('input') input: UpdateInput,
    // @Args('file') file: { file: GraphQLUpload },
    @CurrentUser() user: UsersEntity,
  ) {
    // const _file = await file;

    return await this.usersService.updateUser(
      user.id,
      { ...input },
      // _file.file,
    );
  }

  @Mutation((returns) => Boolean)
  async updatePassword(
    @Args('input') input: updatePasswordInput,
    @CurrentUser() user: UsersEntity,
  ) {
    return await this.usersService.updatePassword(user.id, { ...input });
  }
}
