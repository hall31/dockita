
import React, { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const mockUser = { id: 1, name: 'User', email: 'user@example.com' };
  
  const login = async (email: string, password: string) => {
    console.log('Login:', email, password);
  };
  
  const logout = () => {
    console.log('Logout');
  };
  
  const value = {
    user: mockUser,
    login,
    logout,
    isAuthenticated: true
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
