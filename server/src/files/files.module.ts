import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesEntity } from './files.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilesEntity])],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
