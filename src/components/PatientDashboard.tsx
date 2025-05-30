
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Search, Star, MapPin, Phone } from 'lucide-react';
import { useAuth } from './AuthContext';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');

  const mockAppointments = [
    {
      id: '1',
      doctor: 'Dr. Kofi Asante',
      specialization: 'Médecine générale',
      date: '2024-01-15',
      time: '14:30',
      status: 'confirmed',
      canJoin: false
    },
    {
      id: '2',
      doctor: 'Dr. Aminata Ba',
      specialization: 'Cardiologie',
      date: '2024-01-10',
      time: '10:00',
      status: 'completed',
      canJoin: false
    }
  ];

  const mockDoctors = [
    {
      id: '1',
      name: 'Dr. Kofi Asante',
      specialization: 'Médecine générale',
      rating: 4.8,
      experience: '10 ans',
      location: 'Dakar, Sénégal',
      status: 'connected'
    },
    {
      id: '2',
      name: 'Dr. Aminata Ba',
      specialization: 'Cardiologie',
      rating: 4.9,
      experience: '15 ans',
      location: 'Abidjan, Côte d\'Ivoire',
      status: 'available'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-africa-900 via-africa-800 to-emerald-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Bonjour {user?.name} 👋
          </h1>
          <p className="text-africa-200">Gérez vos consultations médicales</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white/10 p-1 rounded-lg backdrop-blur-lg">
          <Button
            onClick={() => setActiveTab('appointments')}
            variant={activeTab === 'appointments' ? 'default' : 'ghost'}
            className={`flex-1 ${activeTab === 'appointments' 
              ? 'bg-accent text-primary' 
              : 'text-white hover:bg-white/20'}`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Mes RDV
          </Button>
          <Button
            onClick={() => setActiveTab('doctors')}
            variant={activeTab === 'doctors' ? 'default' : 'ghost'}
            className={`flex-1 ${activeTab === 'doctors' 
              ? 'bg-accent text-primary' 
              : 'text-white hover:bg-white/20'}`}
          >
            <Search className="h-4 w-4 mr-2" />
            Médecins
          </Button>
        </div>

        {/* Mes Rendez-vous */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Mes rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{appointment.doctor}</h3>
                        <p className="text-africa-200 text-sm">{appointment.specialization}</p>
                      </div>
                      <Badge className={`${getStatusColor(appointment.status)} text-white border-0`}>
                        {getStatusText(appointment.status)}
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
                        {appointment.canJoin ? 'Rejoindre' : 'Bientôt disponible'}
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

        {/* Recherche de Médecins */}
        {activeTab === 'doctors' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Médecins disponibles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockDoctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{doctor.name}</h3>
                        <p className="text-africa-200 text-sm">{doctor.specialization}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-africa-200 text-sm">{doctor.rating}</span>
                          </div>
                          <span className="text-africa-300 text-sm">•</span>
                          <span className="text-africa-200 text-sm">{doctor.experience}</span>
                        </div>
                      </div>
                      <Badge 
                        className={`${doctor.status === 'connected' ? 'bg-green-500' : 'bg-blue-500'} text-white border-0`}
                      >
                        {doctor.status === 'connected' ? 'Connecté' : 'Disponible'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-1 text-africa-200 text-sm mb-3">
                      <MapPin className="h-4 w-4" />
                      {doctor.location}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-accent hover:bg-accent/90 text-primary"
                      >
                        Prendre RDV
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contacter
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
