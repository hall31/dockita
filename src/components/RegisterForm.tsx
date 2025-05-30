
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Lock, User, Phone, GraduationCap } from 'lucide-react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';
import SeniorModeToggle from './SeniorModeToggle';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: null as 'patient' | 'doctor' | null,
    specialization: ''
  });
  const [loading, setLoading] = useState(false);
  const [isSeniorMode, setIsSeniorMode] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner votre rôle",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const success = await register({
      ...formData,
      role: formData.role
    });
    
    if (success) {
      toast({
        title: "Inscription réussie",
        description: "Bienvenue dans TeleMed Afrique !",
      });
    } else {
      toast({
        title: "Erreur d'inscription",
        description: "Veuillez vérifier vos informations",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (value: 'patient' | 'doctor') => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  return (
    <div className={`min-h-screen bg-white flex items-center justify-center p-6 ${isSeniorMode ? 'senior-mode' : ''}`}>
      <div className="w-full max-w-md">
        {/* Mode Senior Toggle */}
        <div className="flex justify-end mb-6">
          <SeniorModeToggle 
            isSeniorMode={isSeniorMode}
            onToggle={() => setIsSeniorMode(!isSeniorMode)}
          />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`${isSeniorMode ? 'text-title' : 'text-4xl'} font-light text-slate-900 mb-3`}>
            TeleMed
          </h1>
          <p className={`${isSeniorMode ? 'text-subtitle' : 'text-lg'} text-slate-500 font-light`}>
            Rejoignez-nous
          </p>
        </div>

        <Card className="card-modern border-0">
          <CardHeader className={`${isSeniorMode ? 'senior-padding pb-6' : 'p-8 pb-6'}`}>
            <CardTitle className={`text-center ${isSeniorMode ? 'text-title' : 'text-2xl'} font-light text-slate-900`}>
              Inscription
            </CardTitle>
          </CardHeader>
          <CardContent className={`${isSeniorMode ? 'senior-spacing senior-padding pt-0' : 'p-8 pt-0'}`}>
            <form onSubmit={handleSubmit} className={`${isSeniorMode ? 'senior-spacing' : 'space-y-5'}`}>
              <div className={`${isSeniorMode ? 'space-y-3' : 'space-y-2'}`}>
                <label className={`${isSeniorMode ? 'text-large' : 'text-sm'} font-medium text-slate-700 block`}>
                  Nom complet
                </label>
                <div className="relative">
                  <User className={`absolute ${isSeniorMode ? 'left-6 top-5 h-6 w-6' : 'left-4 top-3.5 h-5 w-5'} text-slate-400`} />
                  <Input
                    type="text"
                    placeholder="Votre nom complet"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`${isSeniorMode ? 'pl-16 input-modern text-lg' : 'pl-12 input-modern'}`}
                    required
                  />
                </div>
              </div>
              
              <div className={`${isSeniorMode ? 'space-y-3' : 'space-y-2'}`}>
                <label className={`${isSeniorMode ? 'text-large' : 'text-sm'} font-medium text-slate-700 block`}>
                  Email
                </label>
                <div className="relative">
                  <Mail className={`absolute ${isSeniorMode ? 'left-6 top-5 h-6 w-6' : 'left-4 top-3.5 h-5 w-5'} text-slate-400`} />
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`${isSeniorMode ? 'pl-16 input-modern text-lg' : 'pl-12 input-modern'}`}
                    required
                  />
                </div>
              </div>

              <div className={`${isSeniorMode ? 'space-y-3' : 'space-y-2'}`}>
                <label className={`${isSeniorMode ? 'text-large' : 'text-sm'} font-medium text-slate-700 block`}>
                  Téléphone
                </label>
                <div className="relative">
                  <Phone className={`absolute ${isSeniorMode ? 'left-6 top-5 h-6 w-6' : 'left-4 top-3.5 h-5 w-5'} text-slate-400`} />
                  <Input
                    type="tel"
                    placeholder="+XXX XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`${isSeniorMode ? 'pl-16 input-modern text-lg' : 'pl-12 input-modern'}`}
                    required
                  />
                </div>
              </div>
              
              <div className={`${isSeniorMode ? 'space-y-3' : 'space-y-2'}`}>
                <label className={`${isSeniorMode ? 'text-large' : 'text-sm'} font-medium text-slate-700 block`}>
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className={`absolute ${isSeniorMode ? 'left-6 top-5 h-6 w-6' : 'left-4 top-3.5 h-5 w-5'} text-slate-400`} />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`${isSeniorMode ? 'pl-16 input-modern text-lg' : 'pl-12 input-modern'}`}
                    required
                  />
                </div>
              </div>

              <div className={`${isSeniorMode ? 'space-y-3' : 'space-y-2'}`}>
                <label className={`${isSeniorMode ? 'text-large' : 'text-sm'} font-medium text-slate-700 block`}>
                  Je suis
                </label>
                <Select onValueChange={handleRoleChange}>
                  <SelectTrigger className={`${isSeniorMode ? 'input-modern text-lg' : 'input-modern'}`}>
                    <SelectValue placeholder="Sélectionnez votre rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="doctor">Médecin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.role === 'doctor' && (
                <div className={`${isSeniorMode ? 'space-y-3' : 'space-y-2'}`}>
                  <label className={`${isSeniorMode ? 'text-large' : 'text-sm'} font-medium text-slate-700 block`}>
                    Spécialisation
                  </label>
                  <div className="relative">
                    <GraduationCap className={`absolute ${isSeniorMode ? 'left-6 top-5 h-6 w-6' : 'left-4 top-3.5 h-5 w-5'} text-slate-400`} />
                    <Input
                      type="text"
                      placeholder="Votre spécialisation"
                      value={formData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                      className={`${isSeniorMode ? 'pl-16 input-modern text-lg' : 'pl-12 input-modern'}`}
                      required
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className={`w-full button-modern ${isSeniorMode ? 'mt-10' : 'mt-8'}`}
                disabled={loading}
              >
                {loading ? "Inscription..." : "S'inscrire"}
              </Button>
            </form>

            <div className={`text-center ${isSeniorMode ? 'pt-10 mt-10' : 'pt-8 mt-8'} border-t border-slate-100`}>
              <p className={`text-slate-600 ${isSeniorMode ? 'text-large' : 'text-sm'}`}>
                Déjà un compte ?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className={`${isSeniorMode ? 'text-blue-600 hover:text-blue-700' : 'text-slate-700 hover:text-slate-900'} font-medium transition-colors underline`}
                >
                  Se connecter
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
