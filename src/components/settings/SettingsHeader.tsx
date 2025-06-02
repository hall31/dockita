
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Settings } from 'lucide-react';

const SettingsHeader: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 border-0 text-white">
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-1">Paramètres</h2>
        <p className="text-emerald-100">Personnalisez votre expérience Dockita</p>
      </CardContent>
    </Card>
  );
};

export default SettingsHeader;
