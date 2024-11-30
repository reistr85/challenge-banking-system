import { Test, TestingModule } from '@nestjs/testing';
import { GetByIdClientUseCase } from './get-by-id-client.usecase';
import { IClientRepository } from '@/domain/repositories/iclient.repository';
import { GetByIdClientDto } from '@/application/dtos/clients/get-by-id-client.dto';
import { NotFoundException } from '@nestjs/common';
import { ClientModel } from '@/infrastructure/database/sequelize/models/client.model';

describe('GetByIdClientUseCase', () => {
  let getByIdClientUseCase: GetByIdClientUseCase;
  let clientsRepository: jest.Mocked<IClientRepository>;

  beforeEach(async () => {
    const mockClientRepository: jest.Mocked<IClientRepository> = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCpf: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetByIdClientUseCase,
        { provide: IClientRepository, useValue: mockClientRepository },
      ],
    }).compile();

    getByIdClientUseCase =
      module.get<GetByIdClientUseCase>(GetByIdClientUseCase);
    clientsRepository = module.get<IClientRepository>(
      IClientRepository,
    ) as jest.Mocked<IClientRepository>;
  });

  it('should return a client when found', async () => {
    const clientId = '123';
    const mockClient = {
      name: 'John Doe',
      phone: '84988481941',
      cpf: '02664093347',
      birth: '1985-11-20',
      accounts: [],
    };
    const expectedDto = GetByIdClientDto.toDto(mockClient);

    clientsRepository.findById.mockResolvedValue(mockClient as ClientModel);

    const result = await getByIdClientUseCase.execute(clientId);

    expect(clientsRepository.findById).toHaveBeenCalledWith(clientId);
    expect(result).toEqual(expectedDto);
  });

  it('should throw NotFoundException when client is not found', async () => {
    const clientId = '456';

    clientsRepository.findById.mockResolvedValue(null);

    await expect(getByIdClientUseCase.execute(clientId)).rejects.toThrow(
      NotFoundException,
    );
    expect(clientsRepository.findById).toHaveBeenCalledWith(clientId);
  });
});
