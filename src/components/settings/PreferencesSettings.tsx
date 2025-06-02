
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';

const PreferencesSettings: React.FC = () => {
  const [preferences, setPreferences] = useState({
    darkMode: false,
    soundEnabled: true,
    autoBackup: true
  });

  const handlePreferenceChange = (key: keyof typeof preferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    console.log(`Préférence ${key} changée:`, value);
  };

  const preferenceItems = [
    {
      label: 'Mode sombre',
      description: 'Interface en mode sombre',
      value: preferences.darkMode,
      onChange: (value: boolean) => handlePreferenceChange('darkMode', value)
    },
    {
      label: 'Son activé',
      description: 'Sons de notification et interface',
      value: preferences.soundEnabled,
      onChange: (value: boolean) => handlePreferenceChange('soundEnabled', value)
    },
    {
      label: 'Sauvegarde auto',
      description: 'Sauvegarde automatique des données',
      value: preferences.autoBackup,
      onChange: (value: boolean) => handlePreferenceChange('autoBackup', value)
    }
  ];

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Settings className="h-5 w-5 mr-2 text-emerald-600" />
          Préférences
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {preferenceItems.map((item, itemIndex) => (
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

export default PreferencesSettings;
