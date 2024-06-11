/* eslint-disable */
import { Observable } from 'rxjs';

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  tipoUser: boolean;
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
}

export interface UserServiceClient {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;
  // Otros métodos...
}