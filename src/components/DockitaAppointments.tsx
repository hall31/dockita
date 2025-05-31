
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  Video, 
  User, 
  Phone,
  MapPin,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const DockitaAppointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');

  const appointments = [
    {
      id: 1,
      type: 'consultation',
      title: 'Consultation générale',
      doctor: 'Dr. Aminata Kone',
      specialty: 'Médecine générale',
      date: '2024-01-20',
      time: '09:30',
      duration: '30 min',
      mode: 'video',
      status: 'confirmed',
      location: 'Téléconsultation',
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      price: '15 000 FCFA'
    },
    {
      id: 2,
      type: 'analyse',
      title: 'Bilan sanguin',
      doctor: 'Dr. Kwame Asante',
      specialty: 'Analyses médicales',
      date: '2024-01-22',
      time: '08:00',
      duration: '20 min',
      mode: 'physical',
      status: 'pending',
      location: 'Laboratoire Central Bamako',
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      price: '25 000 FCFA'
    },
    {
      id: 3,
      type: 'consultation',
      title: 'Suivi cardiologique',
      doctor: 'Dr. Ibrahim Traore',
      specialty: 'Cardiologie',
      date: '2024-01-25',
      time: '14:00',
      duration: '45 min',
      mode: 'physical',
      status: 'confirmed',
      location: 'Cabinet médical - Hamdallaye',
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      price: '30 000 FCFA'
    }
  ];

  const todayAppointments = appointments.filter(
    apt => apt.date === new Date().toISOString().split('T')[0]
  );

  const upcomingAppointments = appointments.filter(
    apt => new Date(apt.date) > new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmé';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  return (
    <div className="px-4 py-2 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <Calendar className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          Mes Rendez-vous
        </h2>
        <p className="text-slate-600">
          Gérez vos consultations et rendez-vous
        </p>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-12">
          <Plus className="h-5 w-5 mr-2" />
          Nouveau RDV
        </Button>
        <Button variant="outline" className="border-emerald-200 text-emerald-600 rounded-xl h-12">
          <Calendar className="h-5 w-5 mr-2" />
          Calendrier
        </Button>
      </div>

      {/* Rendez-vous du jour */}
      {todayAppointments.length > 0 && (
        <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Clock className="h-5 w-5 text-emerald-600" />
              <span>Aujourd'hui</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={appointment.photo}
                      alt={appointment.doctor}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{appointment.title}</p>
                      <p className="text-sm text-slate-600">{appointment.doctor}</p>
                      <p className="text-sm text-emerald-600">{appointment.time}</p>
                    </div>
                    <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full">
                      {appointment.mode === 'video' ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prochains rendez-vous */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">
            Prochains rendez-vous
          </h3>
          <Button variant="ghost" size="sm" className="text-emerald-600">
            <Filter className="h-4 w-4 mr-1" />
            Filtrer
          </Button>
        </div>

        <div className="space-y-3">
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} className="shadow-md hover:shadow-lg transition-all duration-300 border-0 active-scale-98">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={appointment.photo}
                    alt={appointment.doctor}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-100"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-800">{appointment.title}</h4>
                        <p className="text-emerald-600 font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-slate-600">{appointment.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">{appointment.date}</p>
                        <p className="text-sm text-slate-600">{appointment.time}</p>
                        <p className="text-sm font-medium text-emerald-600 mt-1">{appointment.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{appointment.duration}</span>
                      </div>
                      <div className="flex items-center">
                        {appointment.mode === 'video' ? (
                          <Video className="h-4 w-4 mr-1" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-1" />
                        )}
                        <span className="truncate">{appointment.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </div>

                      <div className="flex space-x-2">
                        {appointment.mode === 'video' && appointment.status === 'confirmed' && (
                          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full">
                            <Video className="h-4 w-4 mr-1" />
                            Rejoindre
                          </Button>
                        )}
                        
                        {appointment.mode === 'physical' && (
                          <Button size="sm" variant="outline" className="rounded-full border-emerald-200 text-emerald-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            Itinéraire
                          </Button>
                        )}

                        <Button size="sm" variant="outline" className="rounded-full border-slate-200 text-slate-600">
                          <Phone className="h-4 w-4 mr-1" />
                          Appeler
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Statistiques */}
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-slate-800">{appointments.length}</p>
              <p className="text-sm text-slate-600">Total RDV</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">
                {appointments.filter(apt => apt.status === 'confirmed').length}
              </p>
              <p className="text-sm text-slate-600">Confirmés</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {appointments.filter(apt => apt.status === 'pending').length}
              </p>
              <p className="text-sm text-slate-600">En attente</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions en bas */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="border-slate-200 text-slate-600 rounded-xl h-12">
          <ChevronLeft className="h-5 w-5 mr-2" />
          Historique
        </Button>
        <Button variant="outline" className="border-emerald-200 text-emerald-600 rounded-xl h-12">
          Paramètres
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default DockitaAppointments;
