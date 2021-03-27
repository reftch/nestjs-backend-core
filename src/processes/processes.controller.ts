import { Controller, Get, Put, Body, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import { ProcessesService } from './processes.service';
import { ResponseDTO } from '../common/dto/response.dto';
import { ProcessEntity } from './processes.entity';
import { ProcessDTO } from '../processes/edit-process.dto';

@ApiTags('processes')
@Controller('processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Get()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<ResponseDTO<ProcessEntity>> {
    return await this.processesService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'The found process'})
  @ApiNotFoundResponse({status: 404, description: 'The process was not found'})
  async findOne(@Param('id') id): Promise<ResponseDTO<ProcessEntity>> {
    return await this.processesService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The process has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiNotFoundResponse({status: 404, description: 'The process was not found'})
  async update(@Param('id') id, @Body() processData: ProcessDTO) {
    return this.processesService.update(id, processData);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The process has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiNotFoundResponse({status: 404, description: 'The process was not found'})
  async delete(@Param('id') id) {
    return this.processesService.delete(id);
  }

}
