import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantEntity } from './tenant.entity'
import { ResponseDTO, Data } from '../common/dto/response.dto';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly processesRepository: Repository<TenantEntity>
  ) {}

  async findAll(): Promise<ResponseDTO<TenantEntity>> {
    const response = new ResponseDTO(new Array());
    const tenants = await this.processesRepository.find();
    if (tenants) {
      tenants.forEach(t => response.data.push(new Data(t.id, 'tenants', t)));
    }
    return response;
  }

}
