
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  Phone,
  Navigation,
  Pill,
  ShoppingCart,
  Bell,
  FileText
} from 'lucide-react';

const DockitaPharmacy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'pharmacies' | 'medications'>('pharmacies');

  const nearbyPharmacies = [
    {
      id: 1,
      name: 'Pharmacie Centrale',
      address: 'Avenue Modibo Keita, Bamako',
      distance: '0.8 km',
      time: '3 min',
      rating: 4.7,
      phone: '+223 20 22 45 67',
      hours: '24h/24',
      services: ['Ordonnances', 'Médicaments génériques', 'Matériel médical'],
      status: 'open'
    },
    {
      id: 2,
      name: 'Pharmacie du Mali',
      address: 'Quartier du Fleuve, Bamako',
      distance: '1.2 km',
      time: '5 min',
      rating: 4.5,
      phone: '+223 20 23 78 90',
      hours: '7h-22h',
      services: ['Conseils pharmaceutiques', 'Homéopathie', 'Produits cosmétiques'],
      status: 'open'
    },
    {
      id: 3,
      name: 'Pharmacie Moderne',
      address: 'Hamdallaye ACI 2000',
      distance: '2.1 km',
      time: '8 min',
      rating: 4.8,
      phone: '+223 20 29 45 23',
      hours: '8h-20h',
      services: ['Livraison', 'Téléconseil', 'Produits bio'],
      status: 'closed'
    }
  ];

  const commonMedications = [
    {
      name: 'Paracétamol 500mg',
      category: 'Antalgique',
      price: '1 500 FCFA',
      description: 'Traitement de la douleur et de la fièvre',
      prescription: false,
      inStock: true
    },
    {
      name: 'Amoxicilline 250mg',
      category: 'Antibiotique',
      price: '3 200 FCFA',
      description: 'Traitement des infections bactériennes',
      prescription: true,
      inStock: true
    },
    {
      name: 'Aspirine 100mg',
      category: 'Antiagrégant',
      price: '2 100 FCFA',
      description: 'Prévention cardiovasculaire',
      prescription: false,
      inStock: false
    },
    {
      name: 'Oméprazole 20mg',
      category: 'Gastro-entérologie',
      price: '4 500 FCFA',
      description: 'Traitement des ulcères gastriques',
      prescription: true,
      inStock: true
    }
  ];

  const prescriptions = [
    {
      id: 1,
      doctor: 'Dr. Aminata Kone',
      date: '2024-01-15',
      medications: ['Amoxicilline 250mg', 'Paracétamol 500mg'],
      status: 'ready',
      pharmacy: 'Pharmacie Centrale'
    },
    {
      id: 2,
      doctor: 'Dr. Kwame Asante',
      date: '2024-01-10',
      medications: ['Oméprazole 20mg'],
      status: 'delivered',
      pharmacy: 'Pharmacie du Mali'
    }
  ];

  const filteredPharmacies = nearbyPharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMedications = commonMedications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-2 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <Pill className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          Pharmacies
        </h2>
        <p className="text-slate-600">
          Trouvez vos médicaments et pharmacies de garde
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('pharmacies')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'pharmacies'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-slate-600'
          }`}
        >
          Pharmacies
        </button>
        <button
          onClick={() => setActiveTab('medications')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'medications'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-slate-600'
          }`}
        >
          Médicaments
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder={activeTab === 'pharmacies' ? 'Rechercher une pharmacie...' : 'Rechercher un médicament...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      {activeTab === 'pharmacies' && (
        <div className="space-y-4">
          {/* Actions rapides */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-12">
              <FileText className="h-5 w-5 mr-2" />
              Mes ordonnances
            </Button>
            <Button variant="outline" className="border-emerald-200 text-emerald-600 rounded-xl h-12">
              <Bell className="h-5 w-5 mr-2" />
              Rappels médicaments
            </Button>
          </div>

          {/* Liste des pharmacies */}
          <div className="space-y-3">
            {filteredPharmacies.map((pharmacy) => (
              <Card key={pharmacy.id} className="shadow-md hover:shadow-lg transition-all duration-300 border-0 active-scale-98">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Pill className="h-6 w-6 text-emerald-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-800">{pharmacy.name}</h3>
                          <p className="text-sm text-slate-600">{pharmacy.address}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pharmacy.status === 'open' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {pharmacy.status === 'open' ? 'Ouvert' : 'Fermé'}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{pharmacy.distance}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{pharmacy.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span>{pharmacy.rating}</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-sm text-slate-600 mb-2">Horaires: {pharmacy.hours}</p>
                        <div className="flex flex-wrap gap-1">
                          {pharmacy.services.map((service, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
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
      )}

      {activeTab === 'medications' && (
        <div className="space-y-4">
          {/* Mes ordonnances */}
          <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <FileText className="h-5 w-5 text-emerald-600" />
                <span>Mes ordonnances</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {prescriptions.map((prescription) => (
                  <div key={prescription.id} className="bg-white rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-slate-800">{prescription.doctor}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        prescription.status === 'ready' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {prescription.status === 'ready' ? 'Prête' : 'Livrée'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{prescription.medications.join(', ')}</p>
                    <p className="text-xs text-slate-500 mt-1">{prescription.pharmacy} • {prescription.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Médicaments courants */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">Médicaments courants</h3>
            {filteredMedications.map((medication, index) => (
              <Card key={index} className="shadow-md border-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800">{medication.name}</h4>
                          <p className="text-sm text-emerald-600">{medication.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800">{medication.price}</p>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                            medication.inStock 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {medication.inStock ? 'En stock' : 'Rupture'}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-3">{medication.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {medication.prescription && (
                            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                              Sur ordonnance
                            </span>
                          )}
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full"
                          disabled={!medication.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Ajouter
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DockitaPharmacy;
