import { Controller, Get, Param } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { FieldEntity } from './field.entity';

@ApiTags('fields')
@Controller('processes')
export class FieldsController {
  constructor(private readonly service: FieldsService) {}

  @Get(':id/fields')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Param('id') processId): Promise<ResponseDTO<FieldEntity>> {
    return await this.service.findAll(processId);
  }

}

