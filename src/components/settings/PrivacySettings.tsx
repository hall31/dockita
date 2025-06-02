
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Shield } from 'lucide-react';

const PrivacySettings: React.FC = () => {
  const [privacy, setPrivacy] = useState({
    shareData: false,
    analytics: true,
    location: true
  });

  const handlePrivacyChange = (key: keyof typeof privacy, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    console.log(`Confidentialité ${key} changée:`, value);
  };

  const privacyItems = [
    {
      label: 'Partage des données',
      description: 'Partager les données pour la recherche',
      value: privacy.shareData,
      onChange: (value: boolean) => handlePrivacyChange('shareData', value)
    },
    {
      label: 'Analyses d\'usage',
      description: 'Améliorer l\'application via les analytics',
      value: privacy.analytics,
      onChange: (value: boolean) => handlePrivacyChange('analytics', value)
    },
    {
      label: 'Localisation',
      description: 'Utiliser votre position pour les services',
      value: privacy.location,
      onChange: (value: boolean) => handlePrivacyChange('location', value)
    }
  ];

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Shield className="h-5 w-5 mr-2 text-emerald-600" />
          Confidentialité
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {privacyItems.map((item, itemIndex) => (
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
  );
};

export default PrivacySettings;
