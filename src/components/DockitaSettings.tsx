
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Settings,
  Bell,
  Shield,
  Moon,
  Globe,
  Volume2,
  Smartphone,
  Database,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  User,
  Heart,
  Lock,
  Download,
  Trash2,
  Mail
} from 'lucide-react';

const DockitaSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    consultations: true,
    reminders: true,
    health: false,
    promotions: false
  });

  const [privacy, setPrivacy] = useState({
    shareData: false,
    analytics: true,
    location: true
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'fr',
    soundEnabled: true,
    autoBackup: true
  });

  const settingsCategories = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Consultations',
          description: 'Notifications pour vos rendez-vous',
          value: notifications.consultations,
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, consultations: value }))
        },
        {
          label: 'Rappels médicaments',
          description: 'Rappels pour vos traitements',
          value: notifications.reminders,
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, reminders: value }))
        },
        {
          label: 'Conseils santé',
          description: 'Conseils et articles santé',
          value: notifications.health,
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, health: value }))
        },
        {
          label: 'Promotions',
          description: 'Offres spéciales et promotions',
          value: notifications.promotions,
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, promotions: value }))
        }
      ]
    },
    {
      title: 'Confidentialité',
      icon: Shield,
      items: [
        {
          label: 'Partage des données',
          description: 'Partager les données pour la recherche',
          value: privacy.shareData,
          onChange: (value: boolean) => setPrivacy(prev => ({ ...prev, shareData: value }))
        },
        {
          label: 'Analyses d\'usage',
          description: 'Améliorer l\'application via les analytics',
          value: privacy.analytics,
          onChange: (value: boolean) => setPrivacy(prev => ({ ...prev, analytics: value }))
        },
        {
          label: 'Localisation',
          description: 'Utiliser votre position pour les services',
          value: privacy.location,
          onChange: (value: boolean) => setPrivacy(prev => ({ ...prev, location: value }))
        }
      ]
    },
    {
      title: 'Préférences',
      icon: Settings,
      items: [
        {
          label: 'Mode sombre',
          description: 'Interface en mode sombre',
          value: preferences.darkMode,
          onChange: (value: boolean) => setPreferences(prev => ({ ...prev, darkMode: value }))
        },
        {
          label: 'Son activé',
          description: 'Sons de notification et interface',
          value: preferences.soundEnabled,
          onChange: (value: boolean) => setPreferences(prev => ({ ...prev, soundEnabled: value }))
        },
        {
          label: 'Sauvegarde auto',
          description: 'Sauvegarde automatique des données',
          value: preferences.autoBackup,
          onChange: (value: boolean) => setPreferences(prev => ({ ...prev, autoBackup: value }))
        }
      ]
    }
  ];

  const quickActions = [
    { icon: User, label: 'Modifier le profil', action: () => {}, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Heart, label: 'Données de santé', action: () => {}, color: 'text-red-600', bg: 'bg-red-50' },
    { icon: Lock, label: 'Changer mot de passe', action: () => {}, color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: Download, label: 'Exporter données', action: () => {}, color: 'text-blue-600', bg: 'bg-blue-50' }
  ];

  const supportItems = [
    { icon: HelpCircle, label: 'Centre d\'aide', action: () => {} },
    { icon: Mail, label: 'Nous contacter', action: () => {} },
    { icon: Info, label: 'À propos', action: () => {} },
    { icon: Trash2, label: 'Supprimer le compte', action: () => {}, color: 'text-red-600' }
  ];

  return (
    <div className="px-4 py-2 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 border-0 text-white">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-1">Paramètres</h2>
          <p className="text-emerald-100">Personnalisez votre expérience Dockita</p>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-all duration-300 border-0 cursor-pointer active-scale-95">
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${action.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <p className="text-sm font-medium text-slate-700">{action.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paramètres par catégorie */}
      {settingsCategories.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <category.icon className="h-5 w-5 mr-2 text-emerald-600" />
              {category.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
                <Switch
                  checked={item.value}
                  onCheckedChange={item.onChange}
                  className="ml-4"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Sélection de langue */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Globe className="h-5 w-5 mr-2 text-emerald-600" />
            Langue
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {[
              { code: 'fr', name: 'Français', flag: '🇫🇷' },
              { code: 'en', name: 'English', flag: '🇺🇸' },
              { code: 'ar', name: 'العربية', flag: '🇲🇦' },
              { code: 'bm', name: 'Bamanankan', flag: '🇲🇱' }
            ].map((lang) => (
              <button
                key={lang.code}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  preferences.language === lang.code
                    ? 'bg-emerald-50 border-2 border-emerald-200'
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
                onClick={() => setPreferences(prev => ({ ...prev, language: lang.code }))}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium text-slate-800">{lang.name}</span>
                </div>
                {preferences.language === lang.code && (
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support et aide */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Support & Aide</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {supportItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${
                index !== supportItems.length - 1 ? 'border-b border-slate-100' : ''
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

      {/* Déconnexion */}
      <Card className="border-0 shadow-md border-red-200 bg-red-50">
        <CardContent className="p-0">
          <button
            className="w-full flex items-center justify-center p-4 text-red-600 hover:bg-red-100 transition-colors rounded-lg"
            onClick={() => {}}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span className="font-medium">Se déconnecter</span>
          </button>
        </CardContent>
      </Card>

      {/* Version et infos */}
      <div className="text-center py-4">
        <p className="text-sm text-slate-500">Dockita v1.0.0</p>
        <p className="text-xs text-slate-400">© 2024 Dockita. Tous droits réservés.</p>
      </div>
    </div>
  );
};

export default DockitaSettings;
