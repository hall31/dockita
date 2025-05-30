
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User, Calendar, Users, Settings, Home, Video, Search } from 'lucide-react';
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
        { id: 'doctors', label: 'Médecins', icon: Search },
        ...commonItems
      ];
    } else if (user?.role === 'doctor') {
      return [
        { id: 'dashboard', label: 'Accueil', icon: Home },
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'appointments', label: 'RDV', icon: Calendar },
        { id: 'profile', label: 'Profil', icon: User }
      ];
    } else if (user?.role === 'admin') {
      return [
        { id: 'dashboard', label: 'Accueil', icon: Home },
        { id: 'users', label: 'Utilisateurs', icon: Users },
        { id: 'settings', label: 'Paramètres', icon: Settings },
        { id: 'profile', label: 'Profil', icon: User }
      ];
    }
    
    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 nav-african px-6 py-4 z-50 shadow-2xl">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center">
          {menuItems.slice(0, 4).map((item) => (
            <Button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              variant="ghost"
              size="sm"
              className={`flex-1 flex flex-col items-center gap-2 py-3 px-3 h-auto transition-all duration-300 ${
                currentView === item.id
                  ? 'text-[#D4AF37] bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-lg shadow-lg'
                  : 'text-[#A3D9C2] hover:text-[#D4AF37] hover:bg-white/10 rounded-lg'
              }`}
            >
              <item.icon className={`h-5 w-5 ${currentView === item.id ? 'animate-pulse' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
          
          <Button
            onClick={logout}
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-2 py-3 px-3 h-auto text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs font-medium">Sortir</span>
          </Button>
        </div>
        
        {/* Indicator bar */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#D4AF37] rounded-full"></div>
      </div>
    </div>
  );
};

export default AppNavigation;
