import { Controller, Get, Query, Put, Body, Param, Delete, 
        UseInterceptors, ClassSerializerInterceptor, SerializeOptions } from '@nestjs/common';
import { ApiResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import { ResponseDTO } from '../common/dto/response.dto';
import { DocumentEntity } from './document.entity';
import { DocumentsService } from './documents.service';

@ApiTags('documents')
@Controller('processes')
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/jobs/:jobId/documents')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Param('id') processId, @Param('jobId') jobId, @Query() query?): Promise<ResponseDTO<DocumentEntity>> {
    return await this.service.findAll(processId, jobId, query);
  }

}
