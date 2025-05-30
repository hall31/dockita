import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Stethoscope, Mail, Lock, User, Phone, GraduationCap } from 'lucide-react';
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
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${isSeniorMode ? 'senior-mode' : ''}`}>
      <div className="w-full max-w-md animate-fade-in">
        {/* Mode Senior Toggle */}
        <div className="flex justify-end mb-4">
          <SeniorModeToggle 
            isSeniorMode={isSeniorMode}
            onToggle={() => setIsSeniorMode(!isSeniorMode)}
          />
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className={`${isSeniorMode ? 'bg-blue-500 p-6 rounded-2xl' : 'bg-emerald-500 p-4 rounded-xl'}`}>
              <Stethoscope className={`${isSeniorMode ? 'h-10 w-10' : 'h-8 w-8'} text-white`} />
            </div>
          </div>
          <h1 className={`${isSeniorMode ? 'text-4xl font-semibold' : 'text-3xl font-light'} text-gray-900 mb-2`}>
            TeleMed Afrique
          </h1>
          <p className={`${isSeniorMode ? 'text-xl' : 'text-base'} text-gray-500 font-light`}>
            Rejoignez notre communauté
          </p>
        </div>

        <Card className="card-minimal border-0 shadow-sm">
          <CardHeader className={`${isSeniorMode ? 'senior-padding pb-4' : 'pb-6'}`}>
            <CardTitle className={`text-center ${isSeniorMode ? 'text-title' : 'text-xl'} font-medium text-gray-900`}>
              Inscription
            </CardTitle>
          </CardHeader>
          <CardContent className={`${isSeniorMode ? 'senior-spacing senior-padding' : ''}`}>
            <form onSubmit={handleSubmit} className={`${isSeniorMode ? 'senior-spacing' : 'space-y-5'}`}>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Votre nom complet"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10 input-modern h-11"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 input-modern h-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="+XXX XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10 input-modern h-11"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 input-modern h-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Je suis</label>
                <Select onValueChange={handleRoleChange}>
                  <SelectTrigger className="input-modern h-11">
                    <SelectValue placeholder="Sélectionnez votre rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="doctor">Médecin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.role === 'doctor' && (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Spécialisation</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Votre spécialisation"
                      value={formData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                      className="pl-10 input-modern h-11"
                      required
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full button-modern h-11 mt-8"
                disabled={loading}
              >
                {loading ? "Inscription..." : "S'inscrire"}
              </Button>
            </form>

            <div className={`text-center ${isSeniorMode ? 'pt-8' : 'pt-6'} border-t border-gray-100 mt-6`}>
              <p className={`text-gray-600 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>
                Déjà un compte ?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className={`${isSeniorMode ? 'text-blue-600 hover:text-blue-700' : 'text-emerald-600 hover:text-emerald-700'} font-medium transition-colors`}
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
