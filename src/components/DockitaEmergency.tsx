
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Heart, 
  AlertTriangle,
  Ambulance,
  Shield,
  Navigation
} from 'lucide-react';

const DockitaEmergency: React.FC = () => {
  const emergencyNumbers = [
    { name: 'SAMU', number: '15', description: 'Urgences médicales' },
    { name: 'Pompiers', number: '18', description: 'Incendies et secours' },
    { name: 'Police', number: '17', description: 'Police secours' },
    { name: 'Urgences', number: '112', description: 'Numéro européen' }
  ];

  const nearbyHospitals = [
    {
      name: 'Hôpital Gabriel Touré',
      distance: '2.3 km',
      time: '8 min',
      address: 'Bamako, Mali',
      phone: '+223 20 22 27 12',
      services: ['Urgences 24h/24', 'Cardiologie', 'Traumatologie']
    },
    {
      name: 'Centre Hospitalier Universitaire',
      distance: '4.1 km',
      time: '12 min',
      address: 'Point G, Bamako',
      phone: '+223 20 22 56 89',
      services: ['Réanimation', 'Neurochirurgie', 'Pédiatrie']
    }
  ];

  const firstAidTips = [
    {
      title: 'Arrêt cardiaque',
      icon: Heart,
      steps: [
        'Vérifier la conscience',
        'Appeler les secours (15)',
        'Commencer le massage cardiaque',
        'Alterner 30 compressions/2 insufflations'
      ]
    },
    {
      title: 'Étouffement',
      icon: AlertTriangle,
      steps: [
        'Encourager à tousser',
        '5 claques dans le dos',
        '5 compressions abdominales',
        'Répéter jusqu\'à évacuation'
      ]
    }
  ];

  return (
    <div className="px-4 py-2 space-y-6">
      {/* Header urgence */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <Shield className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          Urgences Médicales
        </h2>
        <p className="text-slate-600">
          Assistance rapide et numéros d'urgence
        </p>
      </div>

      {/* Bouton d'urgence principal */}
      <Card className="bg-gradient-to-r from-red-500 to-red-600 border-0 shadow-xl">
        <CardContent className="p-6 text-center">
          <Ambulance className="h-16 w-16 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">
            Urgence Immédiate
          </h3>
          <p className="text-red-100 mb-6">
            Appelez immédiatement les secours si vous êtes en danger
          </p>
          <Button 
            className="bg-white text-red-600 hover:bg-red-50 font-bold text-lg py-4 px-8 h-auto rounded-xl shadow-lg w-full"
          >
            <Phone className="h-6 w-6 mr-3" />
            Appeler le 15 (SAMU)
          </Button>
        </CardContent>
      </Card>

      {/* Numéros d'urgence */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">
          Numéros d'urgence
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {emergencyNumbers.map((emergency, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-300 border-0 active-scale-98">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="font-bold text-2xl text-red-600 mb-1">{emergency.number}</h4>
                <p className="font-semibold text-slate-800 text-sm">{emergency.name}</p>
                <p className="text-xs text-slate-600">{emergency.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Hôpitaux à proximité */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-800">
            Hôpitaux proches
          </h3>
          <Button variant="ghost" size="sm" className="text-emerald-600">
            <Navigation className="h-4 w-4 mr-1" />
            Localiser
          </Button>
        </div>

        <div className="space-y-3">
          {nearbyHospitals.map((hospital, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-300 border-0">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">{hospital.name}</h4>
                    <p className="text-sm text-slate-600 mb-2">{hospital.address}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{hospital.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{hospital.time}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {hospital.services.map((service, idx) => (
                        <span key={idx} className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full">
                        <Phone className="h-4 w-4 mr-1" />
                        Appeler
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full border-emerald-200 text-emerald-600">
                        <Navigation className="h-4 w-4 mr-1" />
                        Itinéraire
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Gestes de premiers secours */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">
          Premiers secours
        </h3>
        
        <div className="space-y-3">
          {firstAidTips.map((tip, index) => (
            <Card key={index} className="shadow-md border-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-3 text-lg">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <tip.icon className="h-5 w-5 text-orange-600" />
                  </div>
                  <span>{tip.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ol className="space-y-2">
                  {tip.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start space-x-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span className="text-slate-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Avertissement */}
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-orange-800 mb-1">Important</h4>
              <p className="text-sm text-orange-700">
                Ces informations ne remplacent pas un avis médical professionnel. 
                En cas d'urgence vitale, appelez immédiatement les secours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DockitaEmergency;
