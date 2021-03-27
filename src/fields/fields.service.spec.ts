import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FieldsService } from './fields.service';
import { ResponseDTO, Data } from '../common/dto/response.dto';
import { FieldEntity } from './field.entity';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn(),
}));

describe('FieldsService', () => {
  let service: FieldsService;
  let repositoryMock: MockType<Repository<FieldEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FieldsService,
        { provide: getRepositoryToken(FieldEntity), useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<FieldsService>(FieldsService);
    repositoryMock = module.get(getRepositoryToken(FieldEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });

  it('should find a fields', async () => {
    const responseDTO = new ResponseDTO(new Array());
    const fields = [{id: 'field1', type: 'fields'}, {id: 'field2', type: 'fields'}];
    fields.forEach(i => responseDTO.data.push(new Data(i.id.slice(-2), 'fields', i)));

    // Now can control the return value of mock's methods
    repositoryMock.find.mockReturnValue(fields);
    expect(await service.findAll('TestProcess1')).toEqual(responseDTO);
  });

  it('should not find any fields', async () => {
    const responseDTO = new ResponseDTO(new Array());

    // Now can control the return value of mock's methods
    repositoryMock.find.mockReturnValue(null);
    expect(await service.findAll('TestProcess1')).toEqual(responseDTO);
  });

});