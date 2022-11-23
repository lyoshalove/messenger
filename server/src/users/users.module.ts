import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { UsersGateway } from './users.gateway';
import { UsersResolver } from './users.resolver';
import { FilesService } from 'src/files/files.service';
import { FilesEntity } from 'src/files/files.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, FilesEntity])],
  providers: [UsersService, UsersGateway, UsersResolver, FilesService],
  exports: [UsersService],
})
export class UsersModule {}
