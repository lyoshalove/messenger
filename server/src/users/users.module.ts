import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { UsersGateway } from './users.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, UsersGateway],
})
export class UsersModule {}
