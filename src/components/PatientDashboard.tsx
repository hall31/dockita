
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Search, Star, MapPin, Phone, ChevronRight, Stethoscope, Heart, AlertCircle } from 'lucide-react';
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
      canJoin: false,
      urgency: 'normal'
    },
    {
      id: '2',
      doctor: 'Dr. Aminata Ba',
      specialization: 'Cardiologie',
      date: '2024-01-10',
      time: '10:00',
      status: 'completed',
      canJoin: false,
      urgency: 'high'
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
      status: 'connected',
      languages: ['Français', 'Wolof']
    },
    {
      id: '2',
      name: 'Dr. Aminata Ba',
      specialization: 'Cardiologie',
      rating: 4.9,
      experience: '15 ans',
      location: 'Abidjan, Côte d\'Ivoire',
      status: 'available',
      languages: ['Français', 'Dioula']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'status-pending';
      case 'pending': return 'bg-orange-500 text-white';
      case 'completed': return 'status-active';
      case 'cancelled': return 'bg-red-500 text-white';
      default: return 'status-pending';
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

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'normal': return <Heart className="h-4 w-4 text-[#D4AF37]" />;
      default: return <Heart className="h-4 w-4 text-green-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A3D2F] via-[#1C5E47] to-[#0F4A37] african-pattern">
      <div className="max-w-4xl mx-auto p-6 african-scrollbar">
        {/* Header avec accueil personnalisé */}
        <div className="mb-12 pt-6 animate-fade-in-up">
          <div className="flex items-center mb-4">
            <Stethoscope className="h-8 w-8 text-[#D4AF37] mr-3" />
            <h1 className="text-3xl font-bold text-white">
              Bonjour {user?.name}
            </h1>
          </div>
          <p className="text-[#A3D9C2] text-lg">Votre santé, notre priorité</p>
          <div className="mt-4 h-1 w-32 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-full"></div>
        </div>

        {/* Quick Health Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slide-in-right">
          <Card className="card-african">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#D4AF37]/20 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-[#A3D9C2] text-sm">Prochain RDV</p>
                  <p className="text-white text-lg font-semibold">15 Jan</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-african">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-[#A3D9C2] text-sm">Santé générale</p>
                  <p className="text-white text-lg font-semibold">Bonne</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-african">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Video className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[#A3D9C2] text-sm">Consultations</p>
                  <p className="text-white text-lg font-semibold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex mb-12 bg-white/10 rounded-xl p-2 backdrop-blur-lg">
          <Button
            onClick={() => setActiveTab('appointments')}
            className={`flex-1 h-12 transition-all duration-300 ${activeTab === 'appointments' 
              ? 'bg-[#D4AF37] text-[#0A3D2F] shadow-lg' 
              : 'text-[#A3D9C2] hover:text-[#D4AF37] hover:bg-white/10'} rounded-lg`}
          >
            <Calendar className="h-5 w-5 mr-3" />
            Mes rendez-vous
          </Button>
          <Button
            onClick={() => setActiveTab('doctors')}
            className={`flex-1 h-12 transition-all duration-300 ${activeTab === 'doctors' 
              ? 'bg-[#D4AF37] text-[#0A3D2F] shadow-lg' 
              : 'text-[#A3D9C2] hover:text-[#D4AF37] hover:bg-white/10'} rounded-lg`}
          >
            <Search className="h-5 w-5 mr-3" />
            Médecins
          </Button>
        </div>

        {/* Mes Rendez-vous */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-fade-in-up">
            <Card className="card-african">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-[#D4AF37]" />
                  Mes rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="glass-effect rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-white text-lg">{appointment.doctor}</h3>
                          {getUrgencyIcon(appointment.urgency)}
                        </div>
                        <p className="text-[#A3D9C2]">{appointment.specialization}</p>
                      </div>
                      <Badge className={`${getStatusColor(appointment.status)} border-0 font-medium px-3 py-1`}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 text-[#A3D9C2] mb-6">
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
                        className="button-african h-10"
                        disabled={!appointment.canJoin}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {appointment.canJoin ? 'Rejoindre' : 'Bientôt'}
                      </Button>
                      <Button 
                        size="sm" 
                        className="button-african-outline h-10"
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
          <div className="space-y-6 animate-fade-in-up">
            <Card className="card-african">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
                  <Search className="h-6 w-6 text-[#D4AF37]" />
                  Médecins disponibles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockDoctors.map((doctor) => (
                  <div key={doctor.id} className="glass-effect rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{doctor.name}</h3>
                        <p className="text-[#A3D9C2]">{doctor.specialization}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-[#D4AF37] fill-current" />
                            <span className="text-[#A3D9C2] font-medium">{doctor.rating}</span>
                          </div>
                          <span className="text-[#A3D9C2]">•</span>
                          <span className="text-[#A3D9C2]">{doctor.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[#A3D9C2] text-sm">Langues:</span>
                          {doctor.languages.map((lang, index) => (
                            <Badge key={index} className="bg-[#388E6D] text-white text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge 
                        className={`${doctor.status === 'connected' ? 'status-active' : 'status-pending'} border-0 font-medium px-3 py-1`}
                      >
                        {doctor.status === 'connected' ? 'Connecté' : 'Disponible'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[#A3D9C2] mb-6">
                      <MapPin className="h-4 w-4" />
                      {doctor.location}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        size="sm" 
                        className="button-african h-10"
                      >
                        Prendre rendez-vous
                      </Button>
                      <Button 
                        size="sm" 
                        className="button-african-outline h-10"
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
