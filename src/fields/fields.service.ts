import { Injectable } from '@nestjs/common';
import { FieldEntity } from './field.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDTO, Data } from '../common/dto/response.dto';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(FieldEntity) private readonly repository: Repository<FieldEntity>,
  ) {}

  async findAll(processId: string): Promise<ResponseDTO<FieldEntity>> {
    const response = new ResponseDTO(new Array());
    const fields = await this.repository.find({
      where: { processId: `${processId}`},
    });
    if (fields) {
      fields.forEach(p => response.data.push(new Data(p.id.slice(-2), 'fields', p)));
    };
    return response;
  }

}
