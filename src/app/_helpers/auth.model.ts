export interface AuthUser {
  id: number;
  username: string;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
