
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User, Calendar, Users, Settings, Home, Video } from 'lucide-react';
import { useAuth } from './AuthContext';

interface AppNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const AppNavigation: React.FC<AppNavigationProps> = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getMenuItems = () => {
    const commonItems = [
      { id: 'profile', label: 'Mon Profil', icon: User },
      { id: 'meeting', label: 'Consultation', icon: Video }
    ];

    if (user?.role === 'patient') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        ...commonItems
      ];
    } else if (user?.role === 'doctor') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'appointments', label: 'Rendez-vous', icon: Calendar },
        ...commonItems
      ];
    } else if (user?.role === 'admin') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'users', label: 'Utilisateurs', icon: Users },
        { id: 'settings', label: 'Paramètres', icon: Settings },
        ...commonItems
      ];
    }
    
    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-africa-900/95 backdrop-blur-lg border-t border-white/20 px-4 py-2 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center">
          {menuItems.slice(0, 4).map((item) => (
            <Button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              variant="ghost"
              size="sm"
              className={`flex-1 flex flex-col items-center gap-1 py-2 px-2 ${
                currentView === item.id
                  ? 'text-accent bg-accent/10'
                  : 'text-africa-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
          
          <Button
            onClick={logout}
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 py-2 px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs font-medium">Sortir</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppNavigation;
