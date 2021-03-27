import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from './job.entity'
import { ResponseDTO, Data } from '../common/dto/response.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly repository: Repository<JobEntity>
  ) {}

  async findAll(processId: string, query?): Promise<ResponseDTO<JobEntity>> {
    const response = new ResponseDTO(new Array());
    
    const qb = this.repository.createQueryBuilder('jobs')
      .where('jobs.processId = :processId', { processId: processId })
      .orderBy('jobs.id', 'DESC');

    const count = await qb.getCount();
    response.meta.totalNumberOfPages = Math.ceil(count/this.getLimit(query));
    response.meta.totalNumberOfItems = count;

    const jobs = await qb
      .offset(this.getOffset(query))
      .limit(this.getLimit(query))
      .getMany();

    if (jobs) {
      jobs.forEach(i => response.data.push(new Data(i.id, 'jobs', i)));  
    }  

    return response;
  }

  private getOffset(query): number {
    return query && 'page' in query && query.page.number ? (query.page.number - 1) * this.getLimit(query) : 0;
  }

  private getLimit(query): number {
    return query && 'page' in query && query.page.size ? query.page.size: 25;
  }
}
