
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Video, Users, Heart, Clock, MapPin, Star, ArrowRight } from 'lucide-react';

interface DockitaWelcomeProps {
  onStartConsultation: () => void;
}

const DockitaWelcome: React.FC<DockitaWelcomeProps> = ({ onStartConsultation }) => {
  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Aminata Kone",
      specialty: "Médecine générale",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      status: "online",
      languages: ["Français", "Bambara"],
      experience: "8 ans",
      rating: 4.9,
      consultations: 234
    },
    {
      id: 2,
      name: "Dr. Kwame Asante",
      specialty: "Pédiatrie",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      status: "online",
      languages: ["Français", "English", "Twi"],
      experience: "12 ans",
      rating: 4.8,
      consultations: 456
    },
    {
      id: 3,
      name: "Dr. Fatou Diallo",
      specialty: "Gynécologie",
      photo: "https://images.unsplash.com/photo-1594824902437-bb4d3d91db1b?w=150&h=150&fit=crop&crop=face",
      status: "busy",
      languages: ["Français", "Wolof"],
      experience: "15 ans",
      rating: 4.9,
      consultations: 378
    }
  ];

  const nextAppointment = {
    doctor: "Dr. Aminata Kone",
    date: "Aujourd'hui",
    time: "14:30",
    type: "Consultation générale"
  };

  return (
    <div className="px-4 py-2 space-y-6">
      {/* Message de bienvenue */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="h-8 w-8 text-emerald-500" />
          <span className="text-2xl">🌍</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          Bonjour ! 👋
        </h2>
        <p className="text-slate-600 text-lg">
          Votre santé, notre priorité
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-orange-400 mx-auto rounded-full"></div>
      </div>

      {/* Action rapide - Consultation d'urgence */}
      <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 border-0 shadow-xl">
        <CardContent className="p-6 text-center">
          <Video className="h-12 w-12 text-white mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            Consultation immédiate
          </h3>
          <p className="text-emerald-100 mb-4">
            Parlez à un médecin en moins de 2 minutes
          </p>
          <Button 
            onClick={onStartConsultation}
            className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold w-full h-12 rounded-xl shadow-lg"
          >
            <Video className="h-5 w-5 mr-2" />
            Commencer maintenant
          </Button>
        </CardContent>
      </Card>

      {/* Prochain RDV */}
      {nextAppointment && (
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 text-orange-600 mr-2" />
              <h3 className="font-semibold text-orange-800">Prochain RDV</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800">{nextAppointment.doctor}</p>
                <p className="text-sm text-slate-600">{nextAppointment.date} à {nextAppointment.time}</p>
                <p className="text-xs text-orange-600">{nextAppointment.type}</p>
              </div>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Médecins disponibles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-800">
            Médecins disponibles
          </h3>
          <Button variant="ghost" size="sm" className="text-emerald-600">
            Voir tous
          </Button>
        </div>

        <div className="space-y-3">
          {availableDoctors.map((doctor) => (
            <Card key={doctor.id} className="shadow-md hover:shadow-lg transition-all duration-300 border-0">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-emerald-100"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                      doctor.status === 'online' ? 'bg-emerald-400' : 
                      doctor.status === 'busy' ? 'bg-orange-400' : 'bg-slate-400'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 truncate">{doctor.name}</h4>
                    <p className="text-emerald-600 font-medium text-sm">{doctor.specialty}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-slate-600 ml-1">{doctor.rating}</span>
                      </div>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-500">{doctor.consultations} consultations</span>
                    </div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                      doctor.status === 'online' ? 'bg-emerald-100 text-emerald-700' :
                      doctor.status === 'busy' ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {doctor.status === 'online' ? 'Disponible' :
                       doctor.status === 'busy' ? 'Occupé' : 'Hors ligne'}
                    </div>
                  </div>

                  <Button 
                    size="sm"
                    onClick={doctor.status === 'online' ? onStartConsultation : undefined}
                    className={`${
                      doctor.status === 'online' 
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    } rounded-full font-medium`}
                    disabled={doctor.status !== 'online'}
                  >
                    {doctor.status === 'online' ? 'Consulter' : 'RDV'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Services rapides */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { name: 'Urgences', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
          { name: 'Pharmacie', icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { name: 'Analyses', icon: Users, color: 'text-orange-500', bg: 'bg-orange-50' },
          { name: 'Historique', icon: Clock, color: 'text-slate-500', bg: 'bg-slate-50' }
        ].map((service, index) => (
          <Card key={index} className="hover:shadow-md transition-all duration-300 cursor-pointer border-0">
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${service.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <service.icon className={`h-6 w-6 ${service.color}`} />
              </div>
              <p className="text-sm font-medium text-slate-700">{service.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DockitaWelcome;
