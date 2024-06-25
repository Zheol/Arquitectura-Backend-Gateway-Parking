import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';

import { DeleteUserInput } from './dto/delete-user.input';
import { CreateUserRequest, LoginRequest, LoginResponse } from './users.pb';
import { GetUserResponse } from './getUserResponse.entity';
import { GetUserInput } from './dto/get-user.input';
import { User } from './users.entity';



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
              login: jest.fn(),
              getService: jest.fn(),
              deleteUser: jest.fn(),
              getServices: jest.fn(),
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

  it('login should authenticate a user and return a token', async () => {
    const loginUserInput: LoginRequest = {
      email: 'john.doe@example.com',
      password: 'password',
    };

    const mockLoginResponse: LoginResponse = {
      success: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTkzNzAzNTIsInN1YiI6MTN9.RKPWmqtq83mxsmBI8DnPre5R0bsYBUXdxY52piRRjEc',
      message: 'Login successful',
    };

    jest.spyOn(resolver, 'login').mockResolvedValue({ token: mockLoginResponse.token });

    const result = await resolver.login(loginUserInput);

    expect(result).toEqual({ token: mockLoginResponse.token });
  });

  it('getUser should return user details for a valid user id', async () => {
    const getUserInput: GetUserInput = { id: 5 }; 

    const mockGetUserResponse: GetUserResponse = {
      
        id: 5, 
        name: 'Marcelo',
        email: 'Marcelo1@gmail.com',
        password: '$2a$10$vooHCdu.uFuFY5HBkxHxnOgHIFVXoGWmH/Lz.l0MXiMAjX3BmNyAu',
        tipoUser: true,
        
      
    };
    jest.spyOn(resolver, 'getUser').mockResolvedValue({
      id: mockGetUserResponse.id,
      name: mockGetUserResponse.name,
      email: mockGetUserResponse.email,
      password: mockGetUserResponse.password,
      tipoUser: mockGetUserResponse.tipoUser,
    });
    

    const result = await resolver.getUser(getUserInput);

    expect(result).toEqual({
      id: mockGetUserResponse.id,
      name: mockGetUserResponse.name,
      email: mockGetUserResponse.email,
      password: mockGetUserResponse.password,
      tipoUser: mockGetUserResponse.tipoUser,
    });
  });


  it('deleteUser Success', async () => {
    const deleteUserInput: DeleteUserInput = { id: 5 }; 

    
    jest.spyOn(resolver, 'deleteUser').mockResolvedValue(true);

    const result = await resolver.deleteUser(deleteUserInput);

    expect(result).toEqual(true);
  });

  it('getUsers should return list of users', async () => {
    
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashedpassword',
        tipoUser: true,
        
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'anotherhashedpassword',
        tipoUser: false,
        
      },
    ];

    
    jest.spyOn(resolver, 'getUsers').mockResolvedValue({ users: mockUsers });

    const result = await resolver.getUsers();

    
    expect(result).toEqual({ users: mockUsers });
  });
});