import { Controller, Get, Header, HttpCode, Param } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @HttpCode(201)
  @Get(':id')
  @Header('Content-Type', 'image/png')
  async getFileById(@Param('id') id: string) {
    const file = await this.filesService.getFileById(id);
    return file.data;
  }
}
