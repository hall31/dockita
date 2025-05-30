
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Calendar, Video, User, Menu, Bell } from 'lucide-react';
import DockitaWelcome from './DockitaWelcome';
import DockitaTeleconsultation from './DockitaTeleconsultation';
import DockitaProfile from './DockitaProfile';

const DockitaApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'consultation' | 'profile'>('welcome');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  const navigationItems = [
    { id: 'welcome', icon: Home, label: language === 'fr' ? 'Accueil' : 'Home' },
    { id: 'calendar', icon: Calendar, label: language === 'fr' ? 'RDV' : 'Appointments' },
    { id: 'consultation', icon: Video, label: language === 'fr' ? 'Consultation' : 'Consultation' },
    { id: 'profile', icon: User, label: language === 'fr' ? 'Profil' : 'Profile' }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return <DockitaWelcome />;
      case 'consultation':
        return <DockitaTeleconsultation onEndCall={() => setCurrentView('welcome')} />;
      case 'profile':
        return <DockitaProfile />;
      default:
        return <DockitaWelcome />;
    }
  };

  return (
    <div className="dockita-theme min-h-screen">
      {/* Header mobile */}
      <div className="dockita-nav fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Menu className="h-6 w-6 text-slate-600" />
            <h1 className="text-xl font-bold text-emerald-600">Dockita</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="text-slate-600"
            >
              {language.toUpperCase()}
            </Button>
            <Bell className="h-6 w-6 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className={`${currentView !== 'consultation' ? 'pt-16 pb-20 md:pt-0 md:pb-0' : ''}`}>
        {renderCurrentView()}
      </div>

      {/* Navigation bottom (mobile) */}
      {currentView !== 'consultation' && (
        <div className="dockita-nav fixed bottom-0 left-0 right-0 z-50 md:hidden">
          <div className="grid grid-cols-4 gap-1 p-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setCurrentView(item.id as any)}
                className={`flex flex-col items-center py-3 px-2 ${
                  currentView === item.id
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-slate-600'
                }`}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation sidebar (desktop) */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 dockita-nav z-40">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <h1 className="text-2xl font-bold text-emerald-600">Dockita</h1>
          </div>
          
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setCurrentView(item.id as any)}
                className={`w-full justify-start ${
                  currentView === item.id
                    ? 'bg-emerald-50 text-emerald-600 border-r-2 border-emerald-500'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <Button
              variant="outline"
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="w-full dockita-button-outline"
            >
              {language === 'fr' ? 'Switch to English' : 'Passer en français'}
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu principal avec marge pour sidebar sur desktop */}
      <div className="hidden md:block md:ml-64">
        {/* Le contenu est déjà rendu ci-dessus */}
      </div>
    </div>
  );
};

export default DockitaApp;
