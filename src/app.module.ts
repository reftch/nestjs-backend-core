import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { ProcessesModule } from './processes/processes.module';
import { TenantsModule } from './tenants/tenants.module';
import { JobsModule } from './jobs/jobs.module';
import { DocumentsModule } from './documents/documents.module';
import { DirectoriesModule } from './directories/directories.module';
import { FieldsModule } from './fields/fields.module';
import { ApplicationsModule } from './applications/applications.module';
import { CommandsModule } from './commands/commands.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProcessesModule,
    TenantsModule,
    JobsModule,
    DocumentsModule,
    DirectoriesModule,
    FieldsModule,
    ApplicationsModule,
    CommandsModule,
  ],
  providers: []
})
export class AppModule {
  // constructor(private readonly connection: Connection) {}
}
