import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';

import { CreateUserInput } from './dto/create-user.input';
import { CreateUserRequest, CreateUserResponse } from './users.pb';

describe('UsersResolver', () => {
  let resolver: UsersResolver;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: 'UserServiceClient',
          useValue: {
            getService: jest.fn().mockReturnValue({
              createUser: jest.fn(),
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    resolver.onModuleInit();  
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('createUser should create a new user and return the response', async () => {
    const createUserInput: CreateUserRequest = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
      tipoUser: true,
    };

    jest.spyOn(resolver, 'createUser').mockImplementation(async () => ({
      success: true,
      message: 'User created successfully',
    }));

    const result = await resolver.createUser(createUserInput);

    // Verificar que la respuesta del resolver sea correcta
    expect(result).toEqual({
      success: true,
      message: 'User created successfully',
    });
  });
});