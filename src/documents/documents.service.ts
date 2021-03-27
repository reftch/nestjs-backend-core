import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntity } from './document.entity'
import { ResponseDTO, Data } from '../common/dto/response.dto';
import { FieldEntity } from '../fields/field.entity';

@Injectable()
export class DocumentsService {

  constructor(
    @InjectRepository(DocumentEntity) private readonly repository: Repository<DocumentEntity>,
    @InjectRepository(FieldEntity) private readonly columnsRepository: Repository<FieldEntity>,
  ) {}

  async findAll(processId: string, jobId: string, query?): Promise<ResponseDTO<DocumentEntity>> {
    const response = new ResponseDTO(new Array());

    const columns = await this.columnsRepository.createQueryBuilder('columns')
      .where('columns.processId = :processId', {processId: processId})
      .getMany();      

    const qb = this.repository.createQueryBuilder('docs')
      .leftJoin("DOCJOB", "dj", "dj.docId = docs.docid")
      .leftJoinAndSelect("docs.binary", "binary")
      .leftJoinAndSelect("docs.attributes", 'attributes')
      .where('dj.jobId = :jobId', { jobId: jobId})
      .orderBy('docs.docid', 'DESC');
      
    const count = await qb.getCount();
    response.meta.totalNumberOfPages = Math.ceil(count/this.getLimit(query));
    response.meta.totalNumberOfItems = count;

    await qb.offset(this.getOffset(query))
      .limit(this.getLimit(query))
      .getMany()
      .then(documents => {
        documents.forEach(async i => {
          response.data.push(new Data(i.id, 'documents', i))
          columns.forEach((col) => {
            const val = i.attributes[col.id.toLowerCase()];
            if (val) {
              i.attributes[col.attributeName.toLowerCase()] = val;
              delete i.attributes[col.id.toLowerCase()];
            } 
          });

          Object.keys(i.attributes).forEach(function(key) { 
             const val = i.attributes[key];
             if (val === '' || val === 'null' || val === null) {
               delete i.attributes[key]; 
             }
          });
        });
      });
  
    return response;
  }

  private getOffset(query): number {
    return query && 'page' in query && query.page.number ? (query.page.number - 1) * this.getLimit(query) : 0;
  }

  private getLimit(query): number {
    return query && 'page' in query && query.page.size ? query.page.size: 25;
  }

 }
