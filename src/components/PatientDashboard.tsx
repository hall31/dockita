
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Search, Star, MapPin, Phone, ChevronRight } from 'lucide-react';
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
      case 'confirmed': return 'bg-slate-100 text-slate-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'completed': return 'bg-slate-100 text-slate-600';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
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
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-12 pt-6">
          <h1 className="text-3xl font-light text-slate-900 mb-2">
            Bonjour {user?.name}
          </h1>
          <p className="text-slate-500 text-lg">Gérez vos consultations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex mb-12 bg-slate-50 rounded-lg p-2">
          <Button
            onClick={() => setActiveTab('appointments')}
            variant={activeTab === 'appointments' ? 'default' : 'ghost'}
            className={`flex-1 h-12 ${activeTab === 'appointments' 
              ? 'bg-white text-slate-900 shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
          >
            <Calendar className="h-5 w-5 mr-3" />
            Mes rendez-vous
          </Button>
          <Button
            onClick={() => setActiveTab('doctors')}
            variant={activeTab === 'doctors' ? 'default' : 'ghost'}
            className={`flex-1 h-12 ${activeTab === 'doctors' 
              ? 'bg-white text-slate-900 shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
          >
            <Search className="h-5 w-5 mr-3" />
            Médecins
          </Button>
        </div>

        {/* Mes Rendez-vous */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="card-modern">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-medium text-slate-900 flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-slate-500" />
                  Mes rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-slate-50 rounded-lg p-6 hover:bg-slate-100 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-slate-900 text-lg">{appointment.doctor}</h3>
                        <p className="text-slate-500">{appointment.specialization}</p>
                      </div>
                      <Badge className={`${getStatusColor(appointment.status)} border-0 font-medium`}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 text-slate-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(appointment.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {appointment.time}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        size="sm" 
                        className="button-modern h-10"
                        disabled={!appointment.canJoin}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {appointment.canJoin ? 'Rejoindre' : 'Bientôt'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="button-outline-modern h-10"
                      >
                        Détails
                        <ChevronRight className="h-4 w-4 ml-2" />
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
            <Card className="card-modern">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-medium text-slate-900 flex items-center gap-3">
                  <Search className="h-6 w-6 text-slate-500" />
                  Médecins disponibles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockDoctors.map((doctor) => (
                  <div key={doctor.id} className="bg-slate-50 rounded-lg p-6 hover:bg-slate-100 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-slate-900 text-lg">{doctor.name}</h3>
                        <p className="text-slate-500">{doctor.specialization}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-amber-500 fill-current" />
                            <span className="text-slate-600 font-medium">{doctor.rating}</span>
                          </div>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500">{doctor.experience}</span>
                        </div>
                      </div>
                      <Badge 
                        className={`${doctor.status === 'connected' ? 'bg-slate-100 text-slate-700' : 'bg-slate-100 text-slate-600'} border-0 font-medium`}
                      >
                        {doctor.status === 'connected' ? 'Connecté' : 'Disponible'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-500 mb-6">
                      <MapPin className="h-4 w-4" />
                      {doctor.location}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        size="sm" 
                        className="button-modern h-10"
                      >
                        Prendre rendez-vous
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="button-outline-modern h-10"
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
