import { Controller, Get, Query, Put, Body, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import { ResponseDTO } from '../common/dto/response.dto';
import { DirectoryEntity } from './directory.entity';
import { DirectoriesService } from './directories.service';

@ApiTags('directories')
@Controller('processes')
export class DirectoriesController {
  constructor(private readonly service: DirectoriesService) {}

  @Get(':id/directories')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Param('id') processId): Promise<ResponseDTO<DirectoryEntity>> {
    return await this.service.findAll(processId);
  }

}
