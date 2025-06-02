
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

const LanguageSettings: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('fr');

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
    { code: 'bm', name: 'Bamanankan', flag: '🇲🇱' }
  ];

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    console.log('Langue changée:', langCode);
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Globe className="h-5 w-5 mr-2 text-emerald-600" />
          Langue
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors hover:scale-105 active:scale-95 ${
                selectedLanguage === lang.code
                  ? 'bg-emerald-50 border-2 border-emerald-200'
                  : 'bg-slate-50 hover:bg-slate-100'
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium text-slate-800">{lang.name}</span>
              </div>
              {selectedLanguage === lang.code && (
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageSettings;
