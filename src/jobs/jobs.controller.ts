import { Controller, Get, Query, Put, Body, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import { ResponseDTO } from '../common/dto/response.dto';
import { JobEntity } from './job.entity';
import { JobsService } from './jobs.service';

@ApiTags('jobs')
@Controller('processes')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get(':id/jobs')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Param('id') processId, @Query() query?): Promise<ResponseDTO<JobEntity>> {
    return await this.jobsService.findAll(processId, query);
  }

}
