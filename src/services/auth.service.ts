import api from './api';

export interface LoginCredentials {
  name: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  role: 'user' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/register', data);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post('/logout');
    localStorage.removeItem('token');
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/refresh');
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  }

  async updateProfile(id: string, name: string): Promise<AuthResponse> {
    const response = await api.put<AuthResponse>(`/update/${id}`, { name });
    return response.data;
  }

  async updateRole(id: string, role: 'user' | 'admin'): Promise<AuthResponse> {
    const response = await api.put<AuthResponse>(`/update/role/${id}`, { role });
    return response.data;
  }

  getCurrentUser(): AuthResponse['user'] | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export const authService = new AuthService(); 