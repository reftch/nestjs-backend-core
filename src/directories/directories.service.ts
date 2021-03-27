import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectoryEntity } from './directory.entity'
import { ResponseDTO, Data } from '../common/dto/response.dto';

@Injectable()
export class DirectoriesService {
  constructor(
    @InjectRepository(DirectoryEntity)
    private readonly repository: Repository<DirectoryEntity>
  ) {}

  async findAll(processId: string): Promise<ResponseDTO<DirectoryEntity>> {
    const response = new ResponseDTO(new Array());
    const directories = await this.repository.find({
      where: { processId: `${processId}`},
    });
    if (directories) {
      directories.forEach(p => response.data.push(new Data(p.id, 'directories', p)));
    };
    return response;
  }

}
