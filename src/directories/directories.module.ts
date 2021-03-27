import { Module } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { DirectoriesController } from './directories.controller';
import { DirectoryEntity } from './directory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DirectoryEntity])],
  providers: [DirectoriesService],
  controllers: [DirectoriesController]
})
export class DirectoriesModule {}
