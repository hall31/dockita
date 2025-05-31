
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Download, 
  Eye,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  MapPin,
  Phone
} from 'lucide-react';

const DockitaLabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'results' | 'appointments' | 'labs'>('results');

  const labResults = [
    {
      id: 1,
      type: 'Bilan sanguin complet',
      date: '2024-01-15',
      status: 'completed',
      doctor: 'Dr. Aminata Kone',
      lab: 'Laboratoire Central Bamako',
      results: [
        { name: 'Hémoglobine', value: '12.5 g/dL', normal: '12-15 g/dL', status: 'normal' },
        { name: 'Globules blancs', value: '8500 /mm³', normal: '4000-10000 /mm³', status: 'normal' },
        { name: 'Plaquettes', value: '250000 /mm³', normal: '150000-400000 /mm³', status: 'normal' },
        { name: 'Glycémie', value: '1.2 g/L', normal: '0.7-1.1 g/L', status: 'high' }
      ]
    },
    {
      id: 2,
      type: 'Analyse d\'urine',
      date: '2024-01-10',
      status: 'completed',
      doctor: 'Dr. Kwame Asante',
      lab: 'Laboratoire Moderne',
      results: [
        { name: 'Protéines', value: 'Négatives', normal: 'Négatives', status: 'normal' },
        { name: 'Glucose', value: 'Négatif', normal: 'Négatif', status: 'normal' },
        { name: 'Leucocytes', value: '2-3 /champ', normal: '<5 /champ', status: 'normal' }
      ]
    },
    {
      id: 3,
      type: 'Test COVID-19',
      date: '2024-01-08',
      status: 'pending',
      doctor: 'Dr. Fatou Diallo',
      lab: 'Laboratoire National'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      type: 'Bilan lipidique',
      date: '2024-01-20',
      time: '09:00',
      lab: 'Laboratoire Central Bamako',
      address: 'Avenue Modibo Keita, Bamako',
      instructions: ['Être à jeun depuis 12h', 'Apporter votre carte d\'identité', 'Arriver 15 min avant'],
      price: '25 000 FCFA'
    },
    {
      id: 2,
      type: 'Échographie abdominale',
      date: '2024-01-25',
      time: '14:30',
      lab: 'Centre d\'Imagerie Médicale',
      address: 'Hamdallaye ACI 2000',
      instructions: ['Boire 1L d\'eau 1h avant', 'Ne pas uriner avant l\'examen'],
      price: '35 000 FCFA'
    }
  ];

  const nearbyLabs = [
    {
      id: 1,
      name: 'Laboratoire Central Bamako',
      address: 'Avenue Modibo Keita, Bamako',
      distance: '1.2 km',
      rating: 4.6,
      phone: '+223 20 22 45 67',
      services: ['Analyses sanguines', 'Microbiologie', 'Biochimie'],
      hours: '7h-18h'
    },
    {
      id: 2,
      name: 'Laboratoire Moderne',
      address: 'Quartier du Fleuve, Bamako',
      distance: '2.1 km',
      rating: 4.8,
      phone: '+223 20 23 78 90',
      services: ['Imagerie médicale', 'Analyses spécialisées', 'Dépistage'],
      hours: '8h-17h'
    },
    {
      id: 3,
      name: 'Centre d\'Imagerie Médicale',
      address: 'Hamdallaye ACI 2000',
      distance: '3.5 km',
      rating: 4.7,
      phone: '+223 20 29 45 23',
      services: ['Échographie', 'Scanner', 'IRM'],
      hours: '7h30-19h'
    }
  ];

  return (
    <div className="px-4 py-2 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <FileText className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          Analyses Médicales
        </h2>
        <p className="text-slate-600">
          Résultats, rendez-vous et laboratoires
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('results')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'results'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-slate-600'
          }`}
        >
          Résultats
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'appointments'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-slate-600'
          }`}
        >
          RDV
        </button>
        <button
          onClick={() => setActiveTab('labs')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'labs'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-slate-600'
          }`}
        >
          Laboratoires
        </button>
      </div>

      {activeTab === 'results' && (
        <div className="space-y-4">
          {labResults.map((result) => (
            <Card key={result.id} className="shadow-md border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{result.type}</CardTitle>
                    <p className="text-sm text-slate-600">{result.lab}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {result.status === 'completed' ? 'Terminé' : 'En attente'}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-500 mt-2">
                  <span>Dr. {result.doctor}</span>
                  <span>•</span>
                  <span>{result.date}</span>
                </div>
              </CardHeader>

              {result.results && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {result.results.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{item.name}</p>
                          <p className="text-sm text-slate-600">Normal: {item.normal}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800">{item.value}</p>
                          <div className="flex items-center mt-1">
                            {item.status === 'normal' ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
                            )}
                            <span className={`text-xs ${
                              item.status === 'normal' ? 'text-green-600' : 'text-orange-600'
                            }`}>
                              {item.status === 'normal' ? 'Normal' : 'Élevé'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full">
                      <Eye className="h-4 w-4 mr-1" />
                      Voir détails
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-full border-emerald-200 text-emerald-600">
                      <Download className="h-4 w-4 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-12">
            <Calendar className="h-5 w-5 mr-2" />
            Prendre un rendez-vous
          </Button>

          <h3 className="text-lg font-semibold text-slate-800">Prochains rendez-vous</h3>
          
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} className="shadow-md border-0">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-800">{appointment.type}</h4>
                    <p className="text-sm text-slate-600">{appointment.lab}</p>
                    <p className="text-sm text-slate-500">{appointment.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">{appointment.date}</p>
                    <p className="text-sm text-slate-600">{appointment.time}</p>
                    <p className="text-sm font-medium text-slate-800 mt-1">{appointment.price}</p>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-lg p-3 mb-4">
                  <h5 className="font-medium text-emerald-800 mb-2">Instructions importantes:</h5>
                  <ul className="space-y-1">
                    {appointment.instructions.map((instruction, index) => (
                      <li key={index} className="text-sm text-emerald-700 flex items-start">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full">
                    <MapPin className="h-4 w-4 mr-1" />
                    Itinéraire
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full border-emerald-200 text-emerald-600">
                    <Phone className="h-4 w-4 mr-1" />
                    Appeler
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full border-slate-200 text-slate-600">
                    Modifier
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'labs' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Laboratoires à proximité</h3>
          
          {nearbyLabs.map((lab) => (
            <Card key={lab.id} className="shadow-md hover:shadow-lg transition-all duration-300 border-0 active-scale-98">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-emerald-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-800">{lab.name}</h4>
                        <p className="text-sm text-slate-600">{lab.address}</p>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-slate-600">{lab.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{lab.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{lab.hours}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {lab.services.map((service, idx) => (
                        <span key={idx} className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full">
                        <Calendar className="h-4 w-4 mr-1" />
                        Prendre RDV
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full border-emerald-200 text-emerald-600">
                        <Phone className="h-4 w-4 mr-1" />
                        Appeler
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DockitaLabs;
