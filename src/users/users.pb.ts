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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface UserServiceClient {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;
  login(request: LoginRequest): Observable<LoginResponse>;
  // Otros métodos...
}