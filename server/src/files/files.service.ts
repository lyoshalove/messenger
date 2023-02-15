import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesEntity } from './files.entity';
import { Upload } from 'src/types/Upload';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesEntity)
    private filesRepository: Repository<FilesEntity>,
  ) {}

  async uploadAvatar({ filename, createReadStream }: Upload) {
    const fileStream = createReadStream();
    const buffer = await this.streamToBuffer(fileStream);

    const newFile = await this.filesRepository.create({
      fileName: filename,
      data: buffer,
    });

    await this.filesRepository.save(newFile);

    return newFile;
  }

  async deleteFile(id: string) {
    const file = await this.filesRepository.findOneBy({ id });

    await this.filesRepository.remove(file);
  }

  async getFileById(id: string) {
    const file = await this.filesRepository.findOneBy({ id });

    if (!file) {
      throw new NotFoundException();
    }

    return file;
  }

  private async streamToBuffer(stream): Promise<Buffer> {
    const buffer = [];

    return new Promise((resolve, reject) =>
      stream
        .on('error', (error) => reject(error))
        .on('data', (data) => buffer.push(data))
        .on('end', () => resolve(Buffer.concat(buffer))),
    );
  }
}
