import { Controller, Get, Header, HttpCode, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @HttpCode(201)
  @Get(':id')
  @Header('Content-Type', 'image/png')
  async getFileById(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.filesService.getFileById(id);
    response.end(file.data);
  }
}
