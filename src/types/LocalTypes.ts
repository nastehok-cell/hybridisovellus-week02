import type { User, UserWithNoPassword } from 'hybrid-types/DBTypes';

type Credentials = Pick<User, 'username' | 'password'>;

type AuthContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};

export type { Credentials, AuthContextType };
