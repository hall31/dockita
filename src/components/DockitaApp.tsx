
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Calendar, Video, User, Menu, Bell, Search } from 'lucide-react';
import DockitaWelcome from './DockitaWelcome';
import DockitaTeleconsultation from './DockitaTeleconsultation';
import DockitaProfile from './DockitaProfile';
import DockitaDoctors from './DockitaDoctors';
import DockitaEmergency from './DockitaEmergency';
import DockitaPharmacy from './DockitaPharmacy';
import DockitaLabs from './DockitaLabs';
import DockitaHistory from './DockitaHistory';
import DockitaAppointments from './DockitaAppointments';
import DockitaSettings from './DockitaSettings';

const DockitaApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'consultation' | 'profile' | 'doctors' | 'emergency' | 'pharmacy' | 'labs' | 'history' | 'appointments' | 'settings'>('welcome');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  const navigationItems = [
    { id: 'welcome', icon: Home, label: language === 'fr' ? 'Accueil' : 'Home' },
    { id: 'doctors', icon: Search, label: language === 'fr' ? 'Médecins' : 'Doctors' },
    { id: 'consultation', icon: Video, label: language === 'fr' ? 'Consultation' : 'Consultation' },
    { id: 'profile', icon: User, label: language === 'fr' ? 'Profil' : 'Profile' }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return (
          <DockitaWelcome 
            onStartConsultation={() => setCurrentView('consultation')}
            onNavigateToService={(service: string) => {
              switch (service) {
                case 'urgences':
                  setCurrentView('emergency');
                  break;
                case 'pharmacie':
                  setCurrentView('pharmacy');
                  break;
                case 'analyses':
                  setCurrentView('labs');
                  break;
                case 'historique':
                  setCurrentView('history');
                  break;
                case 'rendez-vous':
                  setCurrentView('appointments');
                  break;
                case 'parametres':
                  setCurrentView('settings');
                  break;
                default:
                  break;
              }
            }}
          />
        );
      case 'consultation':
        return <DockitaTeleconsultation onEndCall={() => setCurrentView('welcome')} />;
      case 'profile':
        return <DockitaProfile />;
      case 'doctors':
        return <DockitaDoctors />;
      case 'emergency':
        return <DockitaEmergency />;
      case 'pharmacy':
        return <DockitaPharmacy />;
      case 'labs':
        return <DockitaLabs />;
      case 'history':
        return <DockitaHistory />;
      case 'appointments':
        return <DockitaAppointments />;
      case 'settings':
        return <DockitaSettings />;
      default:
        return <DockitaWelcome onStartConsultation={() => setCurrentView('consultation')} onNavigateToService={() => {}} />;
    }
  };

  return (
    <div className="dockita-theme min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
      {/* Header mobile fixe */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-emerald-100 shadow-sm">
        <div className="flex items-center justify-between p-4 safe-area-top">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              Dockita
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="text-emerald-600 font-medium bg-emerald-50 hover:bg-emerald-100 rounded-full px-3 py-1"
            >
              {language.toUpperCase()}
            </Button>
            <div className="relative">
              <Bell className="h-6 w-6 text-emerald-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal avec padding pour header et navigation */}
      <div className={`${currentView !== 'consultation' ? 'pt-20 pb-24' : 'pt-0 pb-0'} min-h-screen`}>
        {renderCurrentView()}
      </div>

      {/* Navigation bottom fixe (cachée pendant consultation) */}
      {currentView !== 'consultation' && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-emerald-100 shadow-lg safe-area-bottom">
          <div className="grid grid-cols-4 gap-1 p-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setCurrentView(item.id as any)}
                className={`flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-300 ${
                  currentView === item.id
                    ? 'text-emerald-600 bg-gradient-to-t from-emerald-50 to-emerald-100 shadow-md border border-emerald-200'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <item.icon className={`h-6 w-6 mb-1 ${currentView === item.id ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
                {currentView === item.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DockitaApp;
