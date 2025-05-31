
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Download, 
  Filter,
  Video,
  User,
  Pill,
  Activity,
  TrendingUp,
  Search
} from 'lucide-react';

const DockitaHistory: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'consultations' | 'analyses' | 'ordonnances'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const medicalHistory = [
    {
      id: 1,
      type: 'consultation',
      title: 'Consultation générale',
      doctor: 'Dr. Aminata Kone',
      date: '2024-01-15',
      time: '14:30',
      duration: '25 min',
      notes: 'Consultation de suivi. Tension artérielle normale. Prescription de paracétamol pour les maux de tête.',
      documents: ['Compte-rendu', 'Ordonnance'],
      status: 'completed'
    },
    {
      id: 2,
      type: 'analyse',
      title: 'Bilan sanguin complet',
      doctor: 'Dr. Kwame Asante',
      date: '2024-01-12',
      lab: 'Laboratoire Central Bamako',
      notes: 'Résultats normaux. Légère augmentation de la glycémie à surveiller.',
      documents: ['Résultats d\'analyse'],
      status: 'completed'
    },
    {
      id: 3,
      type: 'ordonnance',
      title: 'Prescription antibiotique',
      doctor: 'Dr. Fatou Diallo',
      date: '2024-01-08',
      medications: ['Amoxicilline 250mg', 'Paracétamol 500mg'],
      notes: 'Traitement de 7 jours pour infection respiratoire.',
      status: 'completed'
    },
    {
      id: 4,
      type: 'consultation',
      title: 'Téléconsultation pédiatrique',
      doctor: 'Dr. Kwame Asante',
      date: '2024-01-05',
      time: '16:00',
      duration: '20 min',
      notes: 'Consultation pour enfant. Symptômes grippaux. Repos et hydratation recommandés.',
      documents: ['Compte-rendu'],
      status: 'completed'
    },
    {
      id: 5,
      type: 'analyse',
      title: 'Test COVID-19',
      doctor: 'Dr. Aminata Kone',
      date: '2024-01-03',
      lab: 'Laboratoire National',
      notes: 'Test PCR négatif. Aucune contamination détectée.',
      documents: ['Certificat médical'],
      status: 'completed'
    }
  ];

  const healthStats = {
    totalConsultations: 12,
    lastConsultation: '2024-01-15',
    totalAnalyses: 8,
    activePrescriptions: 2
  };

  const filters = [
    { id: 'all', label: 'Tout', icon: Activity },
    { id: 'consultations', label: 'Consultations', icon: Video },
    { id: 'analyses', label: 'Analyses', icon: FileText },
    { id: 'ordonnances', label: 'Ordonnances', icon: Pill }
  ];

  const filteredHistory = medicalHistory.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return Video;
      case 'analyse':
        return FileText;
      case 'ordonnance':
        return Pill;
      default:
        return Activity;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'bg-emerald-100 text-emerald-700';
      case 'analyse':
        return 'bg-blue-100 text-blue-700';
      case 'ordonnance':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="px-4 py-2 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <FileText className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          Historique Médical
        </h2>
        <p className="text-slate-600">
          Votre dossier médical complet
        </p>
      </div>

      {/* Statistiques de santé */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-4 text-center">
            <Video className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-emerald-700">{healthStats.totalConsultations}</p>
            <p className="text-sm text-emerald-600">Consultations</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-700">{healthStats.totalAnalyses}</p>
            <p className="text-sm text-blue-600">Analyses</p>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher dans l'historique..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      {/* Filtres */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id as any)}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            size="sm"
            className={`whitespace-nowrap rounded-full flex items-center space-x-2 ${
              selectedFilter === filter.id
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            <filter.icon className="h-4 w-4" />
            <span>{filter.label}</span>
          </Button>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-12">
          <Download className="h-5 w-5 mr-2" />
          Exporter dossier
        </Button>
        <Button variant="outline" className="border-emerald-200 text-emerald-600 rounded-xl h-12">
          <TrendingUp className="h-5 w-5 mr-2" />
          Statistiques
        </Button>
      </div>

      {/* Timeline de l'historique */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Historique récent ({filteredHistory.length} éléments)
        </h3>
        
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Aucun résultat trouvé
            </h3>
            <p className="text-slate-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              
              return (
                <Card key={item.id} className="shadow-md border-0 relative">
                  {/* Timeline line */}
                  {index < filteredHistory.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-8 bg-slate-200"></div>
                  )}
                  
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(item.type)}`}>
                        <TypeIcon className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-slate-800">{item.title}</h4>
                            <p className="text-sm text-slate-600">Dr. {item.doctor}</p>
                            {item.lab && (
                              <p className="text-sm text-slate-500">{item.lab}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-slate-800">{item.date}</p>
                            {item.time && (
                              <p className="text-xs text-slate-500">{item.time}</p>
                            )}
                            {item.duration && (
                              <p className="text-xs text-emerald-600">{item.duration}</p>
                            )}
                          </div>
                        </div>

                        {item.medications && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-slate-700 mb-1">Médicaments:</p>
                            <div className="flex flex-wrap gap-1">
                              {item.medications.map((med, idx) => (
                                <span key={idx} className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                                  {med}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <p className="text-sm text-slate-600 mb-3">{item.notes}</p>

                        {item.documents && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.documents.map((doc, idx) => (
                              <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full flex items-center">
                                <FileText className="h-3 w-3 mr-1" />
                                {doc}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full">
                            <FileText className="h-4 w-4 mr-1" />
                            Voir détails
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-full border-emerald-200 text-emerald-600">
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DockitaHistory;
