import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessEntity } from './processes.entity'
import { ProcessesService } from './processes.service'
import { ProcessesController } from './processes.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ProcessEntity])],
  providers: [ProcessesService],
  controllers: [
    ProcessesController
  ]
})
export class ProcessesModule {}
