
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
      case 'confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="mb-8 pt-4">
          <h1 className="text-2xl font-light text-gray-900 mb-2">
            Bonjour {user?.name}
          </h1>
          <p className="text-gray-500">Gérez vos consultations médicales</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex mb-8 bg-white rounded-lg p-1 shadow-sm border border-gray-100">
          <Button
            onClick={() => setActiveTab('appointments')}
            variant={activeTab === 'appointments' ? 'default' : 'ghost'}
            className={`flex-1 h-10 ${activeTab === 'appointments' 
              ? 'bg-emerald-500 text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Mes rendez-vous
          </Button>
          <Button
            onClick={() => setActiveTab('doctors')}
            variant={activeTab === 'doctors' ? 'default' : 'ghost'}
            className={`flex-1 h-10 ${activeTab === 'doctors' 
              ? 'bg-emerald-500 text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            <Search className="h-4 w-4 mr-2" />
            Médecins
          </Button>
        </div>

        {/* Mes Rendez-vous */}
        {activeTab === 'appointments' && (
          <div className="space-y-4 animate-fade-in">
            <Card className="card-modern">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-emerald-500" />
                  Mes rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{appointment.doctor}</h3>
                        <p className="text-gray-500 text-sm">{appointment.specialization}</p>
                      </div>
                      <Badge className={`${getStatusColor(appointment.status)} border-0 font-medium`}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
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
                        className="button-modern h-9"
                        disabled={!appointment.canJoin}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {appointment.canJoin ? 'Rejoindre' : 'Bientôt disponible'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="button-outline-modern h-9"
                      >
                        Détails
                        <ChevronRight className="h-4 w-4 ml-1" />
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
          <div className="space-y-4 animate-fade-in">
            <Card className="card-modern">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Search className="h-5 w-5 text-emerald-500" />
                  Médecins disponibles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockDoctors.map((doctor) => (
                  <div key={doctor.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                        <p className="text-gray-500 text-sm">{doctor.specialization}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-gray-600 text-sm font-medium">{doctor.rating}</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <span className="text-gray-500 text-sm">{doctor.experience}</span>
                        </div>
                      </div>
                      <Badge 
                        className={`${doctor.status === 'connected' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'} border-0 font-medium`}
                      >
                        {doctor.status === 'connected' ? 'Connecté' : 'Disponible'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                      <MapPin className="h-4 w-4" />
                      {doctor.location}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="button-modern h-9"
                      >
                        Prendre rendez-vous
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="button-outline-modern h-9"
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
