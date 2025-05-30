
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../components/AuthContext';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import PatientDashboard from '../components/PatientDashboard';
import DoctorDashboard from '../components/DoctorDashboard';
import AdminDashboard from '../components/AdminDashboard';
import ProfileInterface from '../components/ProfileInterface';
import VideoMeeting from '../components/VideoMeeting';
import AppNavigation from '../components/AppNavigation';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [currentView, setCurrentView] = useState('dashboard');

  if (!user) {
    return (
      <div className="min-h-screen">
        {authView === 'login' ? (
          <LoginForm onSwitchToRegister={() => setAuthView('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setAuthView('login')} />
        )}
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        if (user.role === 'patient') return <PatientDashboard />;
        if (user.role === 'doctor') return <DoctorDashboard />;
        if (user.role === 'admin') return <AdminDashboard />;
        return <PatientDashboard />;
      
      case 'profile':
        return <ProfileInterface />;
      
      case 'meeting':
        return <VideoMeeting isHost={user.role === 'doctor'} onLeave={() => setCurrentView('dashboard')} />;
      
      case 'patients':
        return <DoctorDashboard />;
      
      case 'appointments':
        return <DoctorDashboard />;
      
      case 'users':
        return <AdminDashboard />;
      
      case 'settings':
        return <AdminDashboard />;
      
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-africa-900 via-africa-800 to-emerald-900">
      <div className="pb-20"> {/* Space for bottom navigation */}
        {renderCurrentView()}
      </div>
      <AppNavigation currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
