import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DirectoriesService } from './directories.service';
import { ResponseDTO, Data } from '../common/dto/response.dto';
import { DirectoryEntity } from './directory.entity';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn(),
}));

describe('DirectoriesService', () => {
  let service: DirectoriesService;
  let repositoryMock: MockType<Repository<DirectoryEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DirectoriesService,
        { provide: getRepositoryToken(DirectoryEntity), useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<DirectoriesService>(DirectoriesService);
    repositoryMock = module.get(getRepositoryToken(DirectoryEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });

  it('should find a directories', async () => {
    const responseDTO = new ResponseDTO(new Array());
    const directories = [{id: 'dir1', type: 'directories'}, {id: 'dir2', type: 'directories'}];
    directories.forEach(i => responseDTO.data.push(new Data(i.id, 'directories', i)));

    // Now can control the return value of mock's methods
    repositoryMock.find.mockReturnValue(directories);
    expect(await service.findAll('TestProcess1')).toEqual(responseDTO);
  });

  it('should not find any directories', async () => {
    const responseDTO = new ResponseDTO(new Array());

    // Now can control the return value of mock's methods
    repositoryMock.find.mockReturnValue(null);
    expect(await service.findAll('TestProcess1')).toEqual(responseDTO);
  });

});