
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
  phone?: string;
  specialization?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('telemedicine_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulation d'authentification
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        name: email.includes('doc') ? 'Dr. Kofi Asante' : 'Aminata Diallo',
        role: email.includes('doc') ? 'doctor' : email.includes('admin') ? 'admin' : 'patient',
        phone: '+221 77 123 45 67',
        specialization: email.includes('doc') ? 'Médecine générale' : undefined,
        avatar: `https://images.unsplash.com/photo-${email.includes('doc') ? '1612349317150' : '1494790108755'}-f21c8e30c3e1?w=150&h=150&fit=crop&crop=face`
      };
      setUser(mockUser);
      localStorage.setItem('telemedicine_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('telemedicine_user');
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    if (userData.email && userData.password && userData.name && userData.role) {
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        phone: userData.phone,
        specialization: userData.specialization,
      };
      setUser(newUser);
      localStorage.setItem('telemedicine_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('telemedicine_user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
