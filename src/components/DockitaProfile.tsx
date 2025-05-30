
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
  Save
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
    },
    {
      id: 3,
      date: '2024-01-05',
      doctor: 'Dr. Fatou Diallo',
      specialty: 'Gynécologie',
      type: 'Téléconsultation',
      status: 'Terminée',
      prescription: 'Non applicable'
    }
  ];

  const paymentMethods = [
    { type: 'Mobile Money', number: '**** 4567', provider: 'Orange Money' },
    { type: 'M-Pesa', number: '**** 8901', provider: 'M-Pesa' },
    { type: 'Carte bancaire', number: '**** 2345', provider: 'Visa' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 african-pattern">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header du profil */}
        <div className="mb-8">
          <Card className="dockita-card">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                      <Edit3 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-800">{userData.name}</h1>
                    <p className="text-emerald-600 font-medium">Patient Dockita</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center text-slate-600">
                        <Phone className="h-4 w-4 mr-1" />
                        <span className="text-sm">{userData.phone}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Mail className="h-4 w-4 mr-1" />
                        <span className="text-sm">{userData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={isEditing ? "dockita-button-secondary" : "dockita-button-outline"}
                >
                  {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
                  {isEditing ? 'Sauvegarder' : 'Modifier le profil'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Informations personnelles */}
          <div className="lg:col-span-1 space-y-6">
            {/* Carte de santé numérique */}
            <Card className="health-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-emerald-700">
                  <Heart className="h-5 w-5 mr-2" />
                  Carte de Santé Numérique
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Groupe sanguin</label>
                    {isEditing ? (
                      <Input 
                        value={userData.bloodType}
                        onChange={(e) => setUserData({...userData, bloodType: e.target.value})}
                        className="dockita-input mt-1"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-emerald-700">{userData.bloodType}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Date de naissance</label>
                    {isEditing ? (
                      <Input 
                        type="date"
                        value={userData.birthDate}
                        onChange={(e) => setUserData({...userData, birthDate: e.target.value})}
                        className="dockita-input mt-1"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-slate-700">
                        {new Date(userData.birthDate).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1 text-orange-500" />
                    Allergies
                  </label>
                  {isEditing ? (
                    <Input 
                      value={userData.allergies}
                      onChange={(e) => setUserData({...userData, allergies: e.target.value})}
                      className="dockita-input mt-1"
                      placeholder="Aucune allergie connue"
                    />
                  ) : (
                    <p className="text-slate-700 mt-1">{userData.allergies || 'Aucune allergie connue'}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600">Maladies chroniques</label>
                  {isEditing ? (
                    <Input 
                      value={userData.chronicConditions}
                      onChange={(e) => setUserData({...userData, chronicConditions: e.target.value})}
                      className="dockita-input mt-1"
                      placeholder="Aucune maladie chronique"
                    />
                  ) : (
                    <p className="text-slate-700 mt-1">{userData.chronicConditions || 'Aucune maladie chronique'}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Méthodes de paiement */}
            <Card className="dockita-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-slate-700">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Méthodes de Paiement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-700">{method.type}</p>
                      <p className="text-sm text-slate-500">{method.number} • {method.provider}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button className="dockita-button-outline w-full mt-4">
                  Ajouter une méthode
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Colonne droite - Historique et actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Historique des consultations */}
            <Card className="dockita-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-slate-700">
                  <History className="h-5 w-5 mr-2" />
                  Historique des Consultations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultationHistory.map((consultation) => (
                    <div key={consultation.id} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="font-medium text-slate-800">{consultation.doctor}</p>
                            <p className="text-sm text-emerald-600">{consultation.specialty}</p>
                          </div>
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
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm" className="text-emerald-600">
                            Voir détails
                          </Button>
                          {consultation.prescription === 'Disponible' && (
                            <Button variant="ghost" size="sm" className="text-orange-600">
                              Ordonnance
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="dockita-card">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-slate-800 mb-2">Sécurité</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Gérer mot de passe et authentification
                  </p>
                  <Button className="dockita-button-outline w-full">
                    Paramètres de sécurité
                  </Button>
                </CardContent>
              </Card>

              <Card className="dockita-card">
                <CardContent className="p-6 text-center">
                  <Phone className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-slate-800 mb-2">Contact d'urgence</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {userData.emergencyContact}
                  </p>
                  <Button className="dockita-button-outline w-full">
                    Modifier
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DockitaProfile;
