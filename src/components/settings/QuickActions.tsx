
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Heart, Lock, Download } from 'lucide-react';

const QuickActions: React.FC = () => {
  const quickActions = [
    { icon: User, label: 'Modifier le profil', action: () => console.log('Modifier profil'), color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Heart, label: 'Données de santé', action: () => console.log('Données santé'), color: 'text-red-600', bg: 'bg-red-50' },
    { icon: Lock, label: 'Changer mot de passe', action: () => console.log('Changer mot de passe'), color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: Download, label: 'Exporter données', action: () => console.log('Exporter données'), color: 'text-blue-600', bg: 'bg-blue-50' }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {quickActions.map((action, index) => (
        <Card key={index} className="hover:shadow-md transition-all duration-300 border-0 cursor-pointer hover:scale-105 active:scale-95">
          <CardContent className="p-4 text-center" onClick={action.action}>
            <div className={`w-12 h-12 ${action.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <action.icon className={`h-6 w-6 ${action.color}`} />
            </div>
            <p className="text-sm font-medium text-slate-700">{action.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickActions;
