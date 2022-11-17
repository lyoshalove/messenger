import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { UsersGateway } from './users.gateway';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, UsersGateway, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
