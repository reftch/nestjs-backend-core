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
    // TypeOrmModule.forRoot(),
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'remotemysql.com',
        port: 3306,
        username: 'ir3MA7Hylq',
        password: 'wwVCRbxdgk',
        database: 'ir3MA7Hylq',
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: false,
    }),
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
