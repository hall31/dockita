
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User, Calendar, Users, Settings, Home, Video } from 'lucide-react';
import { useAuth } from './AuthContext';

interface AppNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const AppNavigation: React.FC<AppNavigationProps> = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { id: 'profile', label: 'Profil', icon: User },
      { id: 'meeting', label: 'Consultation', icon: Video }
    ];

    if (user?.role === 'patient') {
      return [
        { id: 'dashboard', label: 'Accueil', icon: Home },
        ...commonItems
      ];
    } else if (user?.role === 'doctor') {
      return [
        { id: 'dashboard', label: 'Accueil', icon: Home },
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'appointments', label: 'RDV', icon: Calendar },
        ...commonItems
      ];
    } else if (user?.role === 'admin') {
      return [
        { id: 'dashboard', label: 'Accueil', icon: Home },
        { id: 'users', label: 'Utilisateurs', icon: Users },
        { id: 'settings', label: 'Paramètres', icon: Settings },
        ...commonItems
      ];
    }
    
    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center">
          {menuItems.slice(0, 4).map((item) => (
            <Button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              variant="ghost"
              size="sm"
              className={`flex-1 flex flex-col items-center gap-2 py-3 px-3 h-auto ${
                currentView === item.id
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
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
            className="flex flex-col items-center gap-2 py-3 px-3 h-auto text-red-500 hover:text-red-600 hover:bg-red-50"
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
