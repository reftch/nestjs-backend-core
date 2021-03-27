import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDTO, Data } from '../common/dto/response.dto';
import { ApplicationEntity } from './application.entity'

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly repository: Repository<ApplicationEntity>
  ) {}

  async findAll(processId: string): Promise<ResponseDTO<ApplicationEntity>> {
    const response = new ResponseDTO(new Array());
    const items = await this.repository.find({
      where: { processId: `${processId}`},
    });
    if (items) {
      items.forEach(p => {
        const main = { main: {
          type: p.type,
          config: p.config
        }};
        response.data.push(new Data(p.id, 'applications', main));
      });
    };
    return response;
  }

}
