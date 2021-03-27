import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProcessesService } from './processes.service';
import { ResponseDTO, Data } from '../common/dto/response.dto';
import { ProcessDTO } from './edit-process.dto';
import { ProcessEntity } from './processes.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn(),
  findOne: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  delete: jest.fn(id => id),
}));

describe('ProcessesService', () => {
  let service: ProcessesService;
  let repositoryMock: MockType<Repository<ProcessEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessesService,
        { provide: getRepositoryToken(ProcessEntity), useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<ProcessesService>(ProcessesService);
    repositoryMock = module.get(getRepositoryToken(ProcessEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });

  it('should find a processes', async () => {
    const responseDTO = new ResponseDTO(new Array());
    const processes = [{id: 'TestProcess1', type: 'processes'}, {id: 'TestProcess2', type: 'processes'}];
    processes.forEach(p => responseDTO.data.push(new Data(p.id, p.type, p)));

    // Now can control the return value of mock's methods
    repositoryMock.find.mockReturnValue(processes);
    expect(await service.findAll()).toEqual(responseDTO);
  });

  it('should not find a processes', async () => {
    const responseDTO = new ResponseDTO(new Array());

    // Now can control the return value of mock's methods
    repositoryMock.find.mockReturnValue(null);
    expect(await service.findAll()).toEqual(responseDTO);
  });

  it('should return an empty response', async () => {
    const responseDTO = new ResponseDTO(new Array());
    const processes = [];
    processes.forEach(p => responseDTO.data.push(new Data(p.id, p.type, p)));

    // Now can control the return value of mock's methods
    repositoryMock.find.mockReturnValue(processes);
    expect(await service.findAll()).toEqual(responseDTO);
  });

  it('should return one process', async () => {
    const process = {id: 'TestProcess1', type: 'processes'};
    const responseDTO = new ResponseDTO(new Data(process.id, 'processes', process));

    // Now can control the return value of mock's methods
    repositoryMock.findOne.mockReturnValue(process);
    expect(await service.findOne('TestProcess1')).toEqual(responseDTO);

    // And make assertions on how often and with what params your mock's methods are called
    expect(repositoryMock.findOne).toHaveBeenCalledWith(process.id);
  });

  it('should return an error', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    try {
      (await service.findOne('TestProcess1'));
    } catch (e) {
      expect(e instanceof NotFoundException).toBeTruthy();
    }
  });

  it('should update process', async () => {
    const processDTO: ProcessDTO = { data: { attributes: { version: '3.11' } } };
    const process = {id: 'TestProcess1', type: 'processes', version: '3.11'};
    const responseDTO = new ResponseDTO(new Data(process.id, 'processes', process));

    // Now can control the return value of mock's methods
    repositoryMock.save.mockReturnValue(process);
    expect(await service.update('TestProcess1', processDTO)).toEqual(responseDTO);
  });

  it('should return an error during update', async () => {
    const processDTO: ProcessDTO = { data: { attributes: { version: '3.11' } } };
    repositoryMock.findOne.mockReturnValue(null);
    try {
      (await service.update('TestProcess1', processDTO));
    } catch (e) {
      expect(e instanceof NotFoundException).toBeTruthy();
    }
  });

  it('should delete process', async () => {
    const processDTO: ProcessDTO = { data: { attributes: { version: '3.11' } } };
    const process = {id: 'TestProcess1', type: 'processes', version: '3.11'};
    const responseDTO = new ResponseDTO(new Data(process.id, 'processes', process));

    // Now can control the return value of mock's methods
    repositoryMock.delete.mockReturnValue(process);
    expect(await service.delete('TestProcess1')).toEqual(responseDTO);
  });

  it('should return an error during delete', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    try {
      (await service.delete('TestProcess1'));
    } catch (e) {
      expect(e instanceof NotFoundException).toBeTruthy();
    }
  });

});