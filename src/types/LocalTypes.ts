import type { User, UserWithNoPassword } from 'hybrid-types/DBTypes';

type Credentials = Pick<User, 'username' | 'password'>;

export type LoginResponse = {
    message: string;
    token: string;
    user: UserWithNoPassword;  
};

export type AuthContextType = {
    user: UserWithNoPassword | null;
    handleLogin: (credentials: Credentials) => Promise<void>;
    handleLogout: () => void;
    handleAutoLogin: () => Promise<void>;
};

export type { Credentials };