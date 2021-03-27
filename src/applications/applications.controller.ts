import { Controller, Get, Query, Put, Body, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import { ResponseDTO } from '../common/dto/response.dto';
import { ApplicationsService } from './applications.service';
import { ApplicationEntity } from './application.entity';

@ApiTags('applications')
@Controller('processes')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @Get(':id/applications')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Param('id') processId): Promise<ResponseDTO<ApplicationEntity>> {
    return await this.service.findAll(processId);
  }

}
