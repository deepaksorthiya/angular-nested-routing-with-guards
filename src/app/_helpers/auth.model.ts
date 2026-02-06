export interface AuthUser {
  id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  email?: string;
  name?: string;
  phone?: string;
  website?: string;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
  credentials?: string;
  authenticated?: boolean;
  details?: Details;
  authorities: Authority[];
  principal: Principal;
}

export interface Details {
  remoteAddress?: string;
  sessionId?: string;
}

export interface Principal {
  password?: string;
  username?: string;
  authorities: Authority[];
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
}

export interface Authority {
  authority?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
