import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { ResponseDTO, Data } from '../common/dto/response.dto';
import { JobEntity } from './job.entity';
import { Repository } from 'typeorm';

let jobs = [{id: 'job1', type: 'jobs'}, {id: 'job2', type: 'jobs'}];
let count = 2;

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({  
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getCount: jest.fn().mockReturnValueOnce(count),
    offset: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnValueOnce(jobs),
  }))
}));


describe('JobsService', () => {
  let service: JobsService;
  let repositoryMock: MockType<Repository<JobEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        { provide: getRepositoryToken(JobEntity), useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    repositoryMock = module.get(getRepositoryToken(JobEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });

  it('should find a jobs', async () => {
    const responseDTO = new ResponseDTO(new Array());
    responseDTO.meta.totalNumberOfItems = 2;
    responseDTO.meta.totalNumberOfPages = 1;

    jobs.forEach(i => responseDTO.data.push(new Data(i.id, 'jobs', i)));

    // Now can control the return value of mock's methods
    expect(await service.findAll('TestProcess1')).toEqual(responseDTO);
  });

  it('should find a jobs with page number', async () => {
    const responseDTO = new ResponseDTO(new Array());
    responseDTO.meta.totalNumberOfItems = 2;
    responseDTO.meta.totalNumberOfPages = 1;

    jobs.forEach(i => responseDTO.data.push(new Data(i.id, 'jobs', i)));

    let query = {page: { number: 1 }};
    // Now can control the return value of mock's methods
    expect(await service.findAll('TestProcess1', query)).toEqual(responseDTO);
  });

  it('should find a jobs with page number and page size', async () => {
    const responseDTO = new ResponseDTO(new Array());
    responseDTO.meta.totalNumberOfItems = 2;
    responseDTO.meta.totalNumberOfPages = 1;
    jobs.forEach(i => responseDTO.data.push(new Data(i.id, 'jobs', i)));

    let query = {page: { number: 1, size: 10 }};
    // Now can control the return value of mock's methods
    expect(await service.findAll('TestProcess1', query)).toEqual(responseDTO);
  });

  it('should not find any jobs', async () => {
    const responseDTO = new ResponseDTO(new Array());
    responseDTO.meta.totalNumberOfItems = 0;
    responseDTO.meta.totalNumberOfPages = 0;

    // Now can control the return value of mock's methods
    count = 0;
    jobs = undefined;
    expect(await service.findAll('TestProcess1')).toEqual(responseDTO);
  });

});