
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Video, Search, Users, Phone, MessageCircle, UserCheck } from 'lucide-react';
import { useAuth } from './AuthContext';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('patients');
  const [searchTerm, setSearchTerm] = useState('');

  const mockPatients = [
    {
      id: '1',
      name: 'Aminata Diallo',
      age: 35,
      phone: '+221 77 123 45 67',
      relationStatus: 'active',
      lastConsultation: '2024-01-05',
      upcomingAppointment: '2024-01-15',
      urgency: 'normal'
    },
    {
      id: '2',
      name: 'Omar Traoré',
      age: 42,
      phone: '+225 07 98 76 54',
      relationStatus: 'pending',
      lastConsultation: null,
      upcomingAppointment: null,
      urgency: 'low'
    }
  ];

  const mockAppointments = [
    {
      id: '1',
      patient: 'Aminata Diallo',
      date: '2024-01-15',
      time: '14:30',
      status: 'confirmed',
      canJoin: false,
      type: 'consultation',
      notes: 'Suivi tension artérielle'
    },
    {
      id: '2',
      patient: 'Omar Traoré',
      date: '2024-01-12',
      time: '09:00',
      status: 'completed',
      canJoin: false,
      type: 'urgence',
      notes: 'Douleurs thoraciques'
    }
  ];

  const getRelationStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getRelationStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'pending': return 'En attente';
      case 'inactive': return 'Inactif';
      default: return status;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-400';
      case 'normal': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-africa-900 via-africa-800 to-emerald-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Dr. {user?.name} 👨‍⚕️
          </h1>
          <p className="text-africa-200">Interface médecin - {user?.specialization}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-africa-200 text-sm">Patients actifs</p>
                  <p className="text-white text-xl font-bold">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-africa-200 text-sm">RDV aujourd'hui</p>
                  <p className="text-white text-xl font-bold">6</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Video className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-africa-200 text-sm">Consultations</p>
                  <p className="text-white text-xl font-bold">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white/10 p-1 rounded-lg backdrop-blur-lg">
          <Button
            onClick={() => setActiveTab('patients')}
            variant={activeTab === 'patients' ? 'default' : 'ghost'}
            className={`flex-1 ${activeTab === 'patients' 
              ? 'bg-accent text-primary' 
              : 'text-white hover:bg-white/20'}`}
          >
            <Users className="h-4 w-4 mr-2" />
            Mes Patients
          </Button>
          <Button
            onClick={() => setActiveTab('appointments')}
            variant={activeTab === 'appointments' ? 'default' : 'ghost'}
            className={`flex-1 ${activeTab === 'appointments' 
              ? 'bg-accent text-primary' 
              : 'text-white hover:bg-white/20'}`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Rendez-vous
          </Button>
          <Button
            onClick={() => setActiveTab('search')}
            variant={activeTab === 'search' ? 'default' : 'ghost'}
            className={`flex-1 ${activeTab === 'search' 
              ? 'bg-accent text-primary' 
              : 'text-white hover:bg-white/20'}`}
          >
            <Search className="h-4 w-4 mr-2" />
            Recherche
          </Button>
        </div>

        {/* Mes Patients */}
        {activeTab === 'patients' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Relations patients
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockPatients.map((patient) => (
                  <div key={patient.id} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{patient.name}</h3>
                        <p className="text-africa-200 text-sm">{patient.age} ans</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Phone className="h-3 w-3 text-africa-300" />
                          <span className="text-africa-200 text-sm">{patient.phone}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge className={`${getRelationStatusColor(patient.relationStatus)} text-white border-0`}>
                          {getRelationStatusText(patient.relationStatus)}
                        </Badge>
                        <div className={`text-sm ${getUrgencyColor(patient.urgency)}`}>
                          ● {patient.urgency === 'high' ? 'Urgent' : patient.urgency === 'normal' ? 'Normal' : 'Faible'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-africa-200 text-sm mb-3">
                      <p>Dernière consultation: {patient.lastConsultation ? new Date(patient.lastConsultation).toLocaleDateString('fr-FR') : 'Aucune'}</p>
                      {patient.upcomingAppointment && (
                        <p>Prochain RDV: {new Date(patient.upcomingAppointment).toLocaleDateString('fr-FR')}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-accent hover:bg-accent/90 text-primary"
                      >
                        <UserCheck className="h-4 w-4 mr-2" />
                        Gérer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Rendez-vous */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Planning des consultations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{appointment.patient}</h3>
                        <p className="text-africa-200 text-sm">{appointment.type}</p>
                        <p className="text-africa-300 text-xs mt-1">{appointment.notes}</p>
                      </div>
                      <Badge className={`${appointment.status === 'confirmed' ? 'bg-green-500' : 'bg-blue-500'} text-white border-0`}>
                        {appointment.status === 'confirmed' ? 'Confirmé' : 'Terminé'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-africa-200 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(appointment.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {appointment.time}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-accent hover:bg-accent/90 text-primary"
                        disabled={!appointment.canJoin}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {appointment.canJoin ? 'Lancer' : 'Bientôt'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Détails
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recherche de Patients */}
        {activeTab === 'search' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Rechercher des patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder="Rechercher par nom, téléphone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                  />
                </div>
                
                <div className="space-y-4">
                  {filteredPatients.map((patient) => (
                    <div key={patient.id} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-white font-semibold">{patient.name}</h3>
                          <p className="text-africa-200 text-sm">{patient.phone}</p>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-accent hover:bg-accent/90 text-primary"
                        >
                          Connecter
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
