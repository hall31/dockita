
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell } from 'lucide-react';

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    consultations: true,
    reminders: true,
    health: false,
    promotions: false
  });

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    console.log(`Notification ${key} changée:`, value);
  };

  const notificationItems = [
    {
      label: 'Consultations',
      description: 'Notifications pour vos rendez-vous',
      value: notifications.consultations,
      onChange: (value: boolean) => handleNotificationChange('consultations', value)
    },
    {
      label: 'Rappels médicaments',
      description: 'Rappels pour vos traitements',
      value: notifications.reminders,
      onChange: (value: boolean) => handleNotificationChange('reminders', value)
    },
    {
      label: 'Conseils santé',
      description: 'Conseils et articles santé',
      value: notifications.health,
      onChange: (value: boolean) => handleNotificationChange('health', value)
    },
    {
      label: 'Promotions',
      description: 'Offres spéciales et promotions',
      value: notifications.promotions,
      onChange: (value: boolean) => handleNotificationChange('promotions', value)
    }
  ];

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Bell className="h-5 w-5 mr-2 text-emerald-600" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {notificationItems.map((item, itemIndex) => (
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

export default NotificationSettings;
