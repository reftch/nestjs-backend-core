import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDTO, Data } from '../common/dto/response.dto';
import { ProcessEntity } from './processes.entity';
import { ProcessDTO } from 'src/processes/edit-process.dto';

@Injectable()
export class ProcessesService {
  constructor(
    @InjectRepository(ProcessEntity)
    private readonly processesRepository: Repository<ProcessEntity>
  ) {}

  async findAll(): Promise<ResponseDTO<ProcessEntity>> {
    const response = new ResponseDTO(new Array());
    const processes = await this.processesRepository.find();
    if (processes) {
      processes.forEach(p => response.data.push(new Data(p.id, 'processes', p)));
    }
    
    return response;
  }

  async findOne(id: string): Promise<ResponseDTO<ProcessEntity>> {
    const process = await this.processesRepository.findOne(id);
    if (process) {
      return new ResponseDTO(new Data(process.id, 'processes', process));
    } else {
      throw new NotFoundException(`Process with id: [${id}] was not found.`);
    }
  }

  async update(id: string, processData: ProcessDTO): Promise<ResponseDTO<ProcessEntity>> {
    let toUpdate = await this.processesRepository.findOne({ id: id});
    if (toUpdate) {
      Object.entries(processData.data.attributes).forEach((e) => toUpdate[e[0]] = e[1]);  
      const process = await this.processesRepository.save(toUpdate);
      return new ResponseDTO(new Data(process.id, "processes", process));
    } else {
      throw new NotFoundException(`Process with id: [${id}] was not found.`);
    }
  }

  async delete(id: string): Promise<ResponseDTO<ProcessEntity>> {
    let toDelete = await this.processesRepository.findOne({ id: id});
    if (toDelete) {
      const process = await this.processesRepository.delete(id);
      return new ResponseDTO(new Data(toDelete.id, "processes", process));
    } else {
      throw new NotFoundException(`Process with id: [${id}] was not found.`);
    }
  }
 
}
