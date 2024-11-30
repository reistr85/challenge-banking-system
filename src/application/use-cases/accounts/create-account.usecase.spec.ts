import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountUseCase } from './create-account.usecase';
import { IClientRepository } from '@/domain/repositories/iclient.repository';
import { IAccountRepository } from '@/domain/repositories/iaccount.repository';
import { CreateAccountDto } from '@/application/dtos/accounts/create-account.dto';
import { CreatedAccountDto } from '@/application/dtos/accounts/created-account.dto';
import { AccountEntity } from '@/domain/entities/account.entity';
import { NotFoundException } from '@nestjs/common';
import { ClientModel } from '@/infrastructure/database/sequelize/models/client.model';
import { AccountModel } from '@/infrastructure/database/sequelize/models/account.model';

describe('CreateAccountUseCase', () => {
  let createAccountUseCase: CreateAccountUseCase;
  let clientsRepository: jest.Mocked<IClientRepository>;
  let accountsRepository: jest.Mocked<IAccountRepository>;

  beforeEach(async () => {
    const mockClientRepository: jest.Mocked<IClientRepository> = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCpf: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const mockAccountRepository: jest.Mocked<IAccountRepository> = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByNumber: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      createTransaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountUseCase,
        { provide: IClientRepository, useValue: mockClientRepository },
        { provide: IAccountRepository, useValue: mockAccountRepository },
      ],
    }).compile();

    createAccountUseCase =
      module.get<CreateAccountUseCase>(CreateAccountUseCase);
    clientsRepository = module.get<IClientRepository>(
      IClientRepository,
    ) as jest.Mocked<IClientRepository>;
    accountsRepository = module.get<IAccountRepository>(
      IAccountRepository,
    ) as jest.Mocked<IAccountRepository>;
  });

  it('should create an account when the client exists', async () => {
    // Arrange
    const createAccountDto: CreateAccountDto = {
      clientId: 'ec624ff1-ddcf-4bec-bc43-3498c049b0d1',
    };

    const mockClient = {
      name: 'John Doe',
      phone: '84988481941',
      cpf: '02664093347',
      birth: '1985-11-20',
      accounts: [],
    };
    const accountEntity = new AccountEntity({
      ...createAccountDto,
      number: 521446,
    });
    const savedAccountEntity = {
      ...accountEntity,
      id: 'ec624ff1-ddcf-4bec-bc43-3498c049b0d1',
      number: 521446,
    };

    clientsRepository.findById.mockResolvedValue(mockClient as ClientModel);
    accountsRepository.create.mockResolvedValue({
      ...savedAccountEntity,
      number: 521446,
    } as AccountModel);

    const expectedDto = CreatedAccountDto.toDto({
      id: savedAccountEntity.id,
      ...accountEntity,
      number: 521446,
    });

    const result = await createAccountUseCase.execute(createAccountDto);

    expect(clientsRepository.findById).toHaveBeenCalledWith(
      'ec624ff1-ddcf-4bec-bc43-3498c049b0d1',
    );
    delete accountEntity.id;
    expect(accountsRepository.create).toHaveBeenCalledWith({
      ...accountEntity,
      number: result.number,
    });
    expect(result).toEqual({
      ...expectedDto,
      number: result.number,
      id: 'ec624ff1-ddcf-4bec-bc43-3498c049b0d1',
    });
  });

  it('should throw NotFoundException when the client does not exist', async () => {
    const createAccountDto: CreateAccountDto = {
      clientId: 'ec624ff1-ddcf-4bec-bc43-3498c049b0d1',
    };

    clientsRepository.findById.mockResolvedValue(null);

    await expect(
      createAccountUseCase.execute(createAccountDto),
    ).rejects.toThrow(NotFoundException);
    expect(clientsRepository.findById).toHaveBeenCalledWith(
      'ec624ff1-ddcf-4bec-bc43-3498c049b0d1',
    );
    expect(accountsRepository.create).not.toHaveBeenCalled();
  });
});
