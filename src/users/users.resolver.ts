import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserRequest, UserServiceClient } from './users.pb';
import { CreateUserInput } from './dto/create-user.input';
import { createUserResponse } from './createUserResponse.entity';
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
}