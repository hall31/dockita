
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Info, Trash2, Mail, LogOut, ChevronRight } from 'lucide-react';

const SupportSettings: React.FC = () => {
  const supportItems = [
    { icon: HelpCircle, label: 'Centre d\'aide', action: () => console.log('Centre aide') },
    { icon: Mail, label: 'Nous contacter', action: () => console.log('Contact') },
    { icon: Info, label: 'À propos', action: () => console.log('À propos') },
    { icon: Trash2, label: 'Supprimer le compte', action: () => console.log('Supprimer compte'), color: 'text-red-600' }
  ];

  return (
    <>
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Support & Aide</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {supportItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors hover:scale-105 active:scale-95 ${
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

      <Card className="border-0 shadow-md border-red-200 bg-red-50">
        <CardContent className="p-0">
          <button
            className="w-full flex items-center justify-center p-4 text-red-600 hover:bg-red-100 transition-colors rounded-lg hover:scale-105 active:scale-95"
            onClick={() => console.log('Déconnexion')}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span className="font-medium">Se déconnecter</span>
          </button>
        </CardContent>
      </Card>

      <div className="text-center py-4">
        <p className="text-sm text-slate-500">Dockita v1.0.0</p>
        <p className="text-xs text-slate-400">© 2024 Dockita. Tous droits réservés.</p>
      </div>
    </>
  );
};

export default SupportSettings;
