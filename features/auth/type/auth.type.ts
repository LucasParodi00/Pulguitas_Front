export interface User {
    id: string;
    email: string;
    name: string;
    role?: 'user' | 'admin';
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
}

export interface DecodedToken {
    sub: string;
    email: string;
    name: string;
    role?: string;
    exp: number;
    iat: number;
}
