import { Args, Mutation, Resolver,Query } from '@nestjs/graphql';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserRequest, UserServiceClient, LoginRequest, GetUserRequest, DeleteUserRequest, GetUsersRequest } from './users.pb';
import { CreateUserInput } from './dto/create-user.input';
import { createUserResponse } from './createUserResponse.entity';
import { LoginUserInput } from './dto/login-user.input';
import { LoginUserResponse } from './loginUserResponse.entity';
import { GetUserResponse } from './getUserResponse.entity';
import { GetUserInput } from './dto/get-user.input';

import { DeleteUserInput } from './dto/delete-user.input';
import { GetUsersResponse } from './getUsersResponse.entity';

@Resolver()
export class UsersResolver implements OnModuleInit {
  constructor(
    @Inject('UserServiceClient')
    private readonly userServiceClient: ClientGrpcProxy,
  ) {}

  private userService: UserServiceClient;

  onModuleInit(): void {
    this.userService = this.userServiceClient.getService<UserServiceClient>('UserService');
  }

  @Mutation(() => createUserResponse)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<createUserResponse> {
    const request: CreateUserRequest = {
      name: createUserInput.name,
      email: createUserInput.email,
      password: createUserInput.password,
      tipoUser: createUserInput.tipoUser,
    };
    const response: createUserResponse = await firstValueFrom(this.userService.createUser(request));
    return response;
  }

  @Mutation(() => LoginUserResponse)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput): Promise<LoginUserResponse> {
    const request: LoginRequest = {
      email: loginUserInput.email,
      password: loginUserInput.password,
    };
    const response = await firstValueFrom(this.userService.login(request));
    return {
      token: response.token,
    };
  }

  @Query(() => GetUserResponse)
  async getUser(@Args('getUserInput') getUserInput: GetUserInput): Promise<GetUserResponse> {
    const request: GetUserRequest = { id: getUserInput.id };
    const response = await firstValueFrom(this.userService.getUser(request));

    if (!response || !response.user) {
      throw new Error(`User with id ${getUserInput.id} not found`);
    }
    
    
    // Convertir Long a number
    const id: number = Number(`${response.user.id}`);
    
    return {
      id,
      name: response.user.name,
      email: response.user.email,
      password: response.user.password,
      tipoUser: response.user.tipoUser,
    };
  }
  @Mutation(() => Boolean) 
  async deleteUser(@Args('deleteUserInput') deleteUserInput: DeleteUserInput): Promise<boolean> {
    const request: DeleteUserRequest = { id: deleteUserInput.id };
    await firstValueFrom(this.userService.deleteUser(request));
    return true; 
  }
  @Query(() => GetUsersResponse)
  async getUsers(): Promise<GetUsersResponse> {
    const request: GetUsersRequest = {};
    const response = await firstValueFrom(this.userService.getUsers(request));

    
    const users = response.users.map(user => ({
      id: Number(user.id),
      name: user.name,
      email: user.email,
      password: user.password,
      tipoUser: user.tipoUser ?? false, 
    }));

    return { users };
  }
}