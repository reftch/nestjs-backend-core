import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldEntity } from './field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FieldEntity])],
  providers: [FieldsService],
  controllers: [FieldsController]
})
export class FieldsModule {}
