import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentEntity } from './document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldEntity } from '../fields/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity, FieldEntity])],
  providers: [DocumentsService],
  controllers: [DocumentsController]
})
export class DocumentsModule {}
