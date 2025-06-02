
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Edit, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Heart,
  Shield,
  Bell,
  Settings,
  LogOut,
  Camera,
  Save,
  ChevronRight,
  Activity
} from 'lucide-react';

interface DockitaProfileProps {
  onNavigateToSettings?: () => void;
  onNavigateToHistory?: () => void;
}

const DockitaProfile: React.FC<DockitaProfileProps> = ({ onNavigateToSettings, onNavigateToHistory }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Amadou Diallo',
    email: 'amadou.diallo@email.com',
    phone: '+223 70 12 34 56',
    birthDate: '15/03/1985',
    address: 'Bamako, Mali',
    emergencyContact: '+223 76 54 32 10',
    bloodType: 'O+',
    allergies: 'Pénicilline',
    conditions: 'Hypertension'
  });

  const profileStats = {
    consultations: 12,
    lastConsultation: '15 Jan 2024',
    nextAppointment: '20 Jan 2024',
    activePrescriptions: 2
  };

  const quickActions = [
    { icon: Heart, label: 'Urgence médicale', color: 'text-red-600', bg: 'bg-red-50', action: () => {} },
    { icon: Bell, label: 'Notifications', color: 'text-orange-600', bg: 'bg-orange-50', action: () => {} },
    { icon: Settings, label: 'Paramètres', color: 'text-slate-600', bg: 'bg-slate-50', action: onNavigateToSettings },
    { icon: Shield, label: 'Confidentialité', color: 'text-emerald-600', bg: 'bg-emerald-50', action: () => {} }
  ];

  const menuItems = [
    { icon: User, label: 'Informations personnelles', action: () => setIsEditing(true) },
    { icon: Activity, label: 'Historique médical', action: onNavigateToHistory },
    { icon: Heart, label: 'Données de santé', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Shield, label: 'Confidentialité', action: () => {} },
    { icon: Settings, label: 'Paramètres', action: onNavigateToSettings },
    { icon: LogOut, label: 'Se déconnecter', action: () => {}, color: 'text-red-600' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profil sauvegardé:', profileData);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="px-4 py-2 space-y-6">
      {/* Header avec photo de profil */}
      <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 border-0 text-white">
        <CardContent className="p-6 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <User className="h-12 w-12 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center border-2 border-white active-scale-95">
              <Camera className="h-4 w-4 text-white" />
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-1">{profileData.name}</h2>
          <p className="text-emerald-100">{profileData.email}</p>
          <div className="flex justify-center space-x-4 mt-4 text-sm">
            <div>
              <p className="font-bold">{profileStats.consultations}</p>
              <p className="text-emerald-100">Consultations</p>
            </div>
            <div className="w-px bg-emerald-400"></div>
            <div>
              <p className="font-bold">{profileStats.activePrescriptions}</p>
              <p className="text-emerald-100">Ordonnances</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-all duration-300 border-0 cursor-pointer active-scale-95">
            <CardContent className="p-4 text-center" onClick={action.action}>
              <div className={`w-12 h-12 ${action.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <p className="text-sm font-medium text-slate-700">{action.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistiques de santé */}
      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-orange-800">Aperçu santé</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-orange-600 font-medium">Dernière consultation</p>
              <p className="text-orange-800">{profileStats.lastConsultation}</p>
            </div>
            <div>
              <p className="text-orange-600 font-medium">Prochain RDV</p>
              <p className="text-orange-800">{profileStats.nextAppointment}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations personnelles */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Informations personnelles</CardTitle>
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full active-scale-95"
            >
              {isEditing ? <Save className="h-4 w-4 mr-1" /> : <Edit className="h-4 w-4 mr-1" />}
              {isEditing ? 'Sauvegarder' : 'Modifier'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Nom complet */}
            <div>
              <label className="text-sm font-medium text-slate-600">Nom complet</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-100 border-0 rounded-lg focus:ring-2 focus:ring-emerald-200"
                />
              ) : (
                <p className="text-slate-800 mt-1">{profileData.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-600">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-100 border-0 rounded-lg focus:ring-2 focus:ring-emerald-200"
                />
              ) : (
                <p className="text-slate-800 mt-1">{profileData.email}</p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <label className="text-sm font-medium text-slate-600">Téléphone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-100 border-0 rounded-lg focus:ring-2 focus:ring-emerald-200"
                />
              ) : (
                <p className="text-slate-800 mt-1">{profileData.phone}</p>
              )}
            </div>

            {/* Date de naissance */}
            <div>
              <label className="text-sm font-medium text-slate-600">Date de naissance</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-100 border-0 rounded-lg focus:ring-2 focus:ring-emerald-200"
                />
              ) : (
                <p className="text-slate-800 mt-1">{profileData.birthDate}</p>
              )}
            </div>

            {/* Adresse */}
            <div>
              <label className="text-sm font-medium text-slate-600">Adresse</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-100 border-0 rounded-lg focus:ring-2 focus:ring-emerald-200"
                />
              ) : (
                <p className="text-slate-800 mt-1">{profileData.address}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations médicales */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Informations médicales</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Groupe sanguin</label>
              <p className="text-slate-800 font-medium">{profileData.bloodType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Contact d'urgence</label>
              <p className="text-slate-800">{profileData.emergencyContact}</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-600">Allergies</label>
            <p className="text-slate-800">{profileData.allergies}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-600">Conditions médicales</label>
            <p className="text-slate-800">{profileData.conditions}</p>
          </div>
        </CardContent>
      </Card>

      {/* Menu de navigation */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors active-scale-95 ${
                index !== menuItems.length - 1 ? 'border-b border-slate-100' : ''
              } ${item.color || 'text-slate-700'}`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DockitaProfile;
