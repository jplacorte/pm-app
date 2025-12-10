type role = 'admin' | 'user'

export interface User {
  id: string
  email: string
  role: role
}

export interface AuthResponse {
  accessToken: string;
  user: User
}