import React, { createContext, useState, useEffect } from 'react';
import type { UserWithNoPassword } from 'hybrid-types/DBTypes';
import { useAuthentication, useUser } from '../hooks/apiHooks';
import { useNavigate } from 'react-router';
import type { AuthContextType, Credentials } from '../types/LocalTypes';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserWithNoPassword | null>(null);
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
                    localStorage.setItem('user', JSON.stringify(userResult));
                    setUser(userResult);
                } else {
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                }
            } catch (error) {
                console.error('Auto-login error:', error);
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            }
        }
    };

        useEffect(() => {
                handleAutoLogin();
        }, []);
           
    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, handleAutoLogin }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserProvider, UserContext };