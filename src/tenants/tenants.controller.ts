import { Controller, Get, Put, Body, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import { TenantsService } from './tenants.service';
import { ResponseDTO } from '../common/dto/response.dto';
import { TenantEntity } from './tenant.entity';

@ApiTags('tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<ResponseDTO<TenantEntity>> {
    return await this.tenantsService.findAll();
  }

}
