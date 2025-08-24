export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  expiresIn?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
