import { Observable } from 'rxjs';


export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  tipoUser: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  tipoUser: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
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

export interface GetUserRequest {
  id: number;
}

export interface GetUserResponse {
  user: User;
}

export interface DeleteUserRequest {
  id: number;
}

export interface DeleteUserResponse {
  success: boolean;
}

export interface UserServiceClient {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;
  login(request: LoginRequest): Observable<LoginResponse>;
  getUser(request: GetUserRequest): Observable<GetUserResponse>;
  deleteUser(request: DeleteUserRequest): Observable<DeleteUserResponse>;
  // Otros métodos...
}