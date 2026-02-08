import {createContext, useState} from 'react';
import type {UserWithNoPassword} from 'hybrid-types/DBTypes';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useLocation, useNavigate} from 'react-router';
import type {AuthContextType, Credentials} from '../types/LocalTypes';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials: Credentials) => {
    const result = await postLogin(credentials);
    localStorage.setItem('token', result.token);
    setUser(result.user);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const handleAutoLogin = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const userResult = await getUserByToken(token);
      setUser(userResult);
      navigate(location.pathname || '/');
    }
  };

  return (
    <UserContext.Provider value={{user, handleLogin, handleLogout, handleAutoLogin}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
