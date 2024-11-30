import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientUseCase } from './create-client.usecase';
import { IClientRepository } from '@/domain/repositories/iclient.repository';
import { CreateClientDto } from '@/application/dtos/clients/create-client.dto';
import { CreatedClientDto } from '@/application/dtos/clients/created-client.dto';
import { ClientEntity } from '@/domain/entities/client.entity';
import { ClientModel } from '@/infrastructure/database/sequelize/models/client.model';

describe('CreateClientUseCase', () => {
  let createClientUseCase: CreateClientUseCase;
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
        CreateClientUseCase,
        { provide: IClientRepository, useValue: mockClientRepository },
      ],
    }).compile();

    createClientUseCase = module.get<CreateClientUseCase>(CreateClientUseCase);
    clientsRepository = module.get<IClientRepository>(
      IClientRepository,
    ) as jest.Mocked<IClientRepository>;
  });

  it('should create a client and return CreatedClientDto', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      phone: '84988481941',
      cpf: '02664093347',
      birth: '1985-11-20',
    };

    const clientEntity = new ClientEntity(createClientDto);
    const savedClientEntity = { ...clientEntity };

    clientsRepository.create.mockResolvedValue({
      ...savedClientEntity,
      id: 'ec624ff1-ddcf-4bec-bc43-3498c049b0d1',
    } as ClientModel);

    const expectedCreatedClientDto: CreatedClientDto = {
      name: 'John Doe',
      phone: '84988481941',
      cpf: '02664093347',
      birth: '1985-11-20',
      id: 'ec624ff1-ddcf-4bec-bc43-3498c049b0d1',
    };

    const result = await createClientUseCase.execute(createClientDto);

    expect(clientsRepository.create).toHaveBeenCalledWith(clientEntity);
    expect(result).toEqual(expectedCreatedClientDto);
  });

  it('should throw an error if the repository fails phone', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      phone: '8498848194',
      cpf: '02664093347',
      birth: '1985-11-20',
    };

    await expect(createClientUseCase.execute(createClientDto)).rejects.toThrow(
      'Invalid Phone',
    );
  });

  it('should throw an error if the repository fails cpf', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      phone: '84988481941',
      cpf: '026640933425',
      birth: '1985-11-20',
    };

    await expect(createClientUseCase.execute(createClientDto)).rejects.toThrow(
      'Invalid CPF',
    );
  });

  it('should throw an error if the repository fails birth', async () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      phone: '84988481941',
      cpf: '02664093347',
      birth: '1985-11-202',
    };

    await expect(createClientUseCase.execute(createClientDto)).rejects.toThrow(
      'Invalid Birth',
    );
  });
});
