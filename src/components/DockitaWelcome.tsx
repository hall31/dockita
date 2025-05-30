
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Video, Users, Heart, Clock, MapPin } from 'lucide-react';

const DockitaWelcome: React.FC = () => {
  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Aminata Kone",
      specialty: "Médecine générale",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      status: "online",
      languages: ["Français", "Bambara"],
      experience: "8 ans"
    },
    {
      id: 2,
      name: "Dr. Kwame Asante",
      specialty: "Pédiatrie",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      status: "online",
      languages: ["Français", "English", "Twi"],
      experience: "12 ans"
    },
    {
      id: 3,
      name: "Dr. Fatou Diallo",
      specialty: "Gynécologie",
      photo: "https://images.unsplash.com/photo-1594824902437-bb4d3d91db1b?w=150&h=150&fit=crop&crop=face",
      status: "busy",
      languages: ["Français", "Wolof"],
      experience: "15 ans"
    }
  ];

  const nextAppointment = {
    doctor: "Dr. Aminata Kone",
    date: "Aujourd'hui",
    time: "14:30",
    type: "Consultation générale"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 african-pattern">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header de bienvenue */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-emerald-500 mr-4" />
            <h1 className="text-5xl font-bold text-slate-800">Dockita</h1>
          </div>
          <p className="text-xl text-slate-600 font-light mb-2">
            Votre santé, notre priorité
          </p>
          <p className="text-lg text-slate-500">
            Télémédecine accessible et moderne pour l'Afrique
          </p>
          <div className="mt-4 h-1 w-32 bg-gradient-to-r from-emerald-500 to-orange-400 mx-auto rounded-full"></div>
        </div>

        {/* Actions principales */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Prendre rendez-vous */}
          <Card className="dockita-card african-pattern">
            <CardContent className="p-8 text-center">
              <Calendar className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                Prendre rendez-vous
              </h3>
              <p className="text-slate-600 mb-6">
                Consultez un médecin qualifié depuis chez vous
              </p>
              <Button className="dockita-button-primary w-full">
                <Calendar className="h-5 w-5 mr-2" />
                Nouveau rendez-vous
              </Button>
            </CardContent>
          </Card>

          {/* Prochain RDV */}
          {nextAppointment && (
            <Card className="dockita-card bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-emerald-600 mr-2" />
                  <h3 className="text-xl font-semibold text-emerald-800">
                    Prochain rendez-vous
                  </h3>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-slate-700">
                    <span className="font-medium">Dr:</span> {nextAppointment.doctor}
                  </p>
                  <p className="text-slate-700">
                    <span className="font-medium">Date:</span> {nextAppointment.date} à {nextAppointment.time}
                  </p>
                  <p className="text-slate-700">
                    <span className="font-medium">Type:</span> {nextAppointment.type}
                  </p>
                </div>
                <Button className="dockita-button-secondary w-full">
                  <Video className="h-5 w-5 mr-2" />
                  Rejoindre la consultation
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Médecins disponibles */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-semibold text-slate-800">
              Médecins disponibles
            </h2>
            <Button variant="outline" className="dockita-button-outline">
              <Users className="h-5 w-5 mr-2" />
              Voir tous
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableDoctors.map((doctor) => (
              <Card key={doctor.id} className="doctor-card fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                        doctor.status === 'online' ? 'bg-emerald-400' : 
                        doctor.status === 'busy' ? 'bg-orange-400' : 'bg-slate-400'
                      }`}></div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-slate-800">{doctor.name}</h3>
                      <p className="text-emerald-600 font-medium">{doctor.specialty}</p>
                      <p className="text-sm text-slate-500">{doctor.experience} d'expérience</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-slate-400 mr-1" />
                      <span className="text-sm text-slate-600">
                        Langues: {doctor.languages.join(', ')}
                      </span>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      doctor.status === 'online' ? 'bg-emerald-100 text-emerald-700' :
                      doctor.status === 'busy' ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {doctor.status === 'online' ? 'Disponible' :
                       doctor.status === 'busy' ? 'Occupé' : 'Hors ligne'}
                    </div>
                  </div>

                  <Button 
                    className={`w-full ${
                      doctor.status === 'online' 
                        ? 'dockita-button-primary' 
                        : 'dockita-button-outline'
                    }`}
                    disabled={doctor.status === 'offline'}
                  >
                    {doctor.status === 'online' ? 'Consulter maintenant' : 'Prendre RDV'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Urgences', icon: Heart, color: 'text-red-500' },
            { name: 'Pharmacie', icon: Calendar, color: 'text-emerald-500' },
            { name: 'Analyses', icon: Users, color: 'text-orange-500' },
            { name: 'Historique', icon: Clock, color: 'text-slate-500' }
          ].map((service, index) => (
            <Card key={index} className="dockita-card p-4 text-center cursor-pointer hover:shadow-lg transition-all">
              <service.icon className={`h-8 w-8 mx-auto mb-2 ${service.color}`} />
              <p className="text-sm font-medium text-slate-700">{service.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DockitaWelcome;
