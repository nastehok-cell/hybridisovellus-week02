import React, { createContext, useState } from 'react';
import type { UserWithNoPassword } from 'hybrid-types/DBTypes';
import { useAuthentication, useUser } from '../hooks/apiHooks';
import { useNavigate } from 'react-router';
import type { AuthContextType, Credentials } from '../types/LocalTypes';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserWithNoPassword | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const { postLogin } = useAuthentication();
    const { getUserByToken } = useUser();
    const navigate = useNavigate();
    
    
    const handleLogin = async (credentials: Credentials) => {
        try {
            const result = await postLogin(credentials);
            console.log('Login result:', result);
            
            localStorage.setItem('token', result.token);
            
            if (result.user) {
                localStorage.setItem('user', JSON.stringify(result.user));
                setUser(result.user);
            }
            
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };
    
    const handleAutoLogin = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userResult = await getUserByToken();
                console.log('Auto-login user:', userResult);
                if (userResult) {
                    setUser(userResult);
                }
            } catch (error) {
                console.error('Auto-login error:', error);
            }
        }
    };
           
    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, handleAutoLogin }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };