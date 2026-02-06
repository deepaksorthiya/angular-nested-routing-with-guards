import { User } from '../_models/user';

export interface AuthUser extends User {
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
