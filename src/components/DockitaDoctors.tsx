
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  Languages,
  Video,
  Calendar,
  ChevronRight
} from 'lucide-react';

const DockitaDoctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = [
    { id: 'all', name: 'Toutes' },
    { id: 'general', name: 'Médecine générale' },
    { id: 'pediatrie', name: 'Pédiatrie' },
    { id: 'gynecologie', name: 'Gynécologie' },
    { id: 'cardiologie', name: 'Cardiologie' },
    { id: 'dermatologie', name: 'Dermatologie' }
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Aminata Kone",
      specialty: "Médecine générale",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      status: "online",
      languages: ["Français", "Bambara"],
      experience: "8 ans",
      rating: 4.9,
      consultations: 234,
      location: "Bamako, Mali",
      nextAvailable: "Maintenant",
      price: "15 000 FCFA"
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
      consultations: 456,
      location: "Accra, Ghana",
      nextAvailable: "Dans 30 min",
      price: "20 000 FCFA"
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
      consultations: 378,
      location: "Dakar, Sénégal",
      nextAvailable: "14:30",
      price: "25 000 FCFA"
    },
    {
      id: 4,
      name: "Dr. Ibrahim Traore",
      specialty: "Cardiologie",
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      status: "online",
      languages: ["Français", "Mooré"],
      experience: "20 ans",
      rating: 4.7,
      consultations: 512,
      location: "Ouagadougou, Burkina Faso",
      nextAvailable: "15:00",
      price: "30 000 FCFA"
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            doctor.specialty.toLowerCase().includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="px-4 py-2 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">
          Nos Médecins
        </h2>
        <p className="text-slate-600">
          {doctors.length} médecins qualifiés à votre service
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher un médecin ou une spécialité..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      {/* Filtres par spécialité */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {specialties.map((specialty) => (
          <Button
            key={specialty.id}
            onClick={() => setSelectedSpecialty(specialty.id)}
            variant={selectedSpecialty === specialty.id ? "default" : "outline"}
            size="sm"
            className={`whitespace-nowrap rounded-full ${
              selectedSpecialty === specialty.id
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            {specialty.name}
          </Button>
        ))}
      </div>

      {/* Liste des médecins */}
      <div className="space-y-4">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="shadow-md hover:shadow-lg transition-all duration-300 border-0 active-scale-98">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-emerald-100"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                    doctor.status === 'online' ? 'bg-emerald-400' : 
                    doctor.status === 'busy' ? 'bg-orange-400' : 'bg-slate-400'
                  }`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">{doctor.name}</h3>
                      <p className="text-emerald-600 font-medium">{doctor.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-800">{doctor.price}</p>
                      <p className="text-xs text-slate-500">par consultation</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-slate-600 ml-1">{doctor.rating}</span>
                    </div>
                    <span className="text-slate-400">•</span>
                    <span className="text-sm text-slate-500">{doctor.consultations} consultations</span>
                  </div>

                  <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{doctor.experience}</span>
                    </div>
                  </div>

                  <div className="flex items-center mt-2">
                    <Languages className="h-4 w-4 text-slate-400 mr-2" />
                    <span className="text-sm text-slate-500">
                      {doctor.languages.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      doctor.status === 'online' ? 'bg-emerald-100 text-emerald-700' :
                      doctor.status === 'busy' ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {doctor.status === 'online' ? `Disponible ${doctor.nextAvailable}` :
                       doctor.status === 'busy' ? `Libre à ${doctor.nextAvailable}` : 'Hors ligne'}
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        RDV
                      </Button>
                      <Button 
                        size="sm"
                        className={`rounded-full ${
                          doctor.status === 'online' 
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                            : 'bg-slate-300 text-slate-500'
                        }`}
                        disabled={doctor.status !== 'online'}
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Consulter
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Aucun médecin trouvé
          </h3>
          <p className="text-slate-600">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </div>
  );
};

export default DockitaDoctors;
