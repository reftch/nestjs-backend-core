import { Test, TestingModule } from '@nestjs/testing';
import { TenantsService } from './tenants.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from './tenant.entity';
import { ResponseDTO, Data } from '../common/dto/response.dto';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn(),
}));

describe('TenantsService', () => {
  let service: TenantsService;
  let repositoryMock: MockType<Repository<TenantEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantsService,
        { provide: getRepositoryToken(TenantEntity), useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<TenantsService>(TenantsService);
    repositoryMock = module.get(getRepositoryToken(TenantEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });

  it('should find a tenants', async () => {
    const responseDTO = new ResponseDTO(new Array());
    const tenants = [{id: 'Tenant1', type: 'tenants'}, {id: 'Tenant2', type: 'tenants'}];
    tenants.forEach(t => responseDTO.data.push(new Data(t.id, 'tenants', t)));

    // Now can control the return value of mock's methods
    repositoryMock.find.mockReturnValue(tenants);
    expect(await service.findAll()).toEqual(responseDTO);
  });

  it('should not find any tenants', async () => {
    const responseDTO = new ResponseDTO(new Array());

    // Now can control the return value of mock's methods
    repositoryMock.find.mockReturnValue(null);
    expect(await service.findAll()).toEqual(responseDTO);
  });


});
