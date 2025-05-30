
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Heart, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Edit3, 
  Shield, 
  CreditCard,
  History,
  AlertTriangle,
  Save,
  ChevronRight
} from 'lucide-react';

const DockitaProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Aminata Diallo',
    phone: '+221 77 123 45 67',
    email: 'aminata.diallo@email.com',
    address: 'Dakar, Sénégal',
    birthDate: '1985-03-15',
    bloodType: 'O+',
    allergies: 'Pénicilline, Arachides',
    chronicConditions: 'Hypertension légère',
    emergencyContact: '+221 77 987 65 43'
  });

  const consultationHistory = [
    {
      id: 1,
      date: '2024-01-15',
      doctor: 'Dr. Kwame Asante',
      specialty: 'Pédiatrie',
      type: 'Téléconsultation',
      status: 'Terminée',
      prescription: 'Disponible'
    },
    {
      id: 2,
      date: '2024-01-10',
      doctor: 'Dr. Aminata Kone',
      specialty: 'Médecine générale',
      type: 'Téléconsultation',
      status: 'Terminée',
      prescription: 'Disponible'
    }
  ];

  const paymentMethods = [
    { type: 'Orange Money', number: '**** 4567', provider: 'Orange' },
    { type: 'M-Pesa', number: '**** 8901', provider: 'Safaricom' }
  ];

  return (
    <div className="px-4 py-2 space-y-6">
      {/* Header du profil mobile */}
      <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center shadow-lg">
                <Edit3 className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-white truncate">{userData.name}</h1>
              <p className="text-emerald-100 font-medium">Patient Dockita</p>
              <div className="flex items-center mt-2">
                <Phone className="h-4 w-4 mr-2 text-emerald-200" />
                <span className="text-sm text-emerald-100">{userData.phone}</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl active-scale-95"
          >
            {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
            {isEditing ? 'Sauvegarder' : 'Modifier le profil'}
          </Button>
        </CardContent>
      </Card>

      {/* Carte de santé numérique */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-emerald-700 text-lg">
            <Heart className="h-5 w-5 mr-2" />
            Carte de Santé
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-3 rounded-lg">
              <label className="text-sm font-medium text-emerald-700">Groupe sanguin</label>
              <p className="text-2xl font-bold text-emerald-600">{userData.bloodType}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <label className="text-sm font-medium text-orange-700">Âge</label>
              <p className="text-2xl font-bold text-orange-600">
                {new Date().getFullYear() - new Date(userData.birthDate).getFullYear()} ans
              </p>
            </div>
          </div>

          <div className="bg-red-50 p-3 rounded-lg">
            <label className="text-sm font-medium text-red-700 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Allergies
            </label>
            <p className="text-red-600 mt-1">{userData.allergies || 'Aucune allergie connue'}</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg">
            <label className="text-sm font-medium text-slate-700">Maladies chroniques</label>
            <p className="text-slate-600 mt-1">{userData.chronicConditions || 'Aucune maladie chronique'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Historique des consultations */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-slate-700 text-lg">
            <div className="flex items-center">
              <History className="h-5 w-5 mr-2" />
              Consultations
            </div>
            <Button variant="ghost" size="sm" className="text-emerald-600">
              Voir tout
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {consultationHistory.map((consultation) => (
              <div key={consultation.id} className="bg-slate-50 p-4 rounded-lg active-scale-98 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-slate-800">{consultation.doctor}</p>
                    <p className="text-sm text-emerald-600">{consultation.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-700">
                      {new Date(consultation.date).toLocaleDateString('fr-FR')}
                    </p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                      {consultation.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">{consultation.type}</p>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Méthodes de paiement */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-slate-700 text-lg">
            <CreditCard className="h-5 w-5 mr-2" />
            Paiement Mobile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {paymentMethods.map((method, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg active-scale-98 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-700">{method.type}</p>
                  <p className="text-sm text-slate-500">{method.number}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          ))}
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl active-scale-95">
            Ajouter une méthode
          </Button>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg cursor-pointer active-scale-98">
          <CardContent className="p-4 text-center">
            <Shield className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 text-sm mb-1">Sécurité</h3>
            <p className="text-xs text-slate-600">Mot de passe</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg cursor-pointer active-scale-98">
          <CardContent className="p-4 text-center">
            <Phone className="h-10 w-10 text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 text-sm mb-1">Urgence</h3>
            <p className="text-xs text-slate-600">Contact</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DockitaProfile;
