
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Eye, EyeOff, Stethoscope, User as UserIcon } from 'lucide-react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';
import SeniorModeToggle from './SeniorModeToggle';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  const [isSeniorMode, setIsSeniorMode] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans TeleMed Afrique !",
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Vérifiez vos identifiants",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0A3D2F] via-[#1C5E47] to-[#0F4A37] flex items-center justify-center p-6 african-pattern ${isSeniorMode ? 'senior-mode' : ''}`}>
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Mode Senior Toggle */}
        <div className="flex justify-end mb-6">
          <SeniorModeToggle 
            isSeniorMode={isSeniorMode}
            onToggle={() => setIsSeniorMode(!isSeniorMode)}
          />
        </div>

        {/* Header avec identité africaine */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className={`${isSeniorMode ? 'h-12 w-12' : 'h-8 w-8'} text-[#D4AF37] mr-3`} />
            <h1 className={`${isSeniorMode ? 'text-title' : 'text-5xl'} font-bold text-white`}>
              TeleMed
            </h1>
          </div>
          <p className={`${isSeniorMode ? 'text-subtitle' : 'text-xl'} text-[#A3D9C2] font-light`}>
            Santé connectée pour l'Afrique
          </p>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full"></div>
        </div>

        {/* User Type Toggle */}
        <div className="flex mb-8 bg-white/10 p-1 rounded-xl backdrop-blur-lg">
          <Button
            type="button"
            onClick={() => setUserType('patient')}
            className={`flex-1 ${userType === 'patient' 
              ? 'bg-[#D4AF37] text-[#0A3D2F] shadow-lg' 
              : 'bg-transparent text-white hover:bg-white/10'} 
              ${isSeniorMode ? 'h-16 text-lg' : 'h-12'} rounded-lg transition-all duration-300`}
          >
            <UserIcon className={`${isSeniorMode ? 'h-6 w-6' : 'h-5 w-5'} mr-2`} />
            Patient
          </Button>
          <Button
            type="button"
            onClick={() => setUserType('doctor')}
            className={`flex-1 ${userType === 'doctor' 
              ? 'bg-[#D4AF37] text-[#0A3D2F] shadow-lg' 
              : 'bg-transparent text-white hover:bg-white/10'} 
              ${isSeniorMode ? 'h-16 text-lg' : 'h-12'} rounded-lg transition-all duration-300`}
          >
            <Stethoscope className={`${isSeniorMode ? 'h-6 w-6' : 'h-5 w-5'} mr-2`} />
            Médecin
          </Button>
        </div>

        {/* Login Card */}
        <Card className="card-african border-0">
          <CardHeader className={`${isSeniorMode ? 'senior-padding pb-6' : 'p-8 pb-6'}`}>
            <CardTitle className={`text-center ${isSeniorMode ? 'text-title' : 'text-2xl'} font-semibold text-white`}>
              Connexion
            </CardTitle>
            <p className="text-center text-[#A3D9C2] text-sm">
              Accédez à votre espace {userType === 'doctor' ? 'médecin' : 'patient'}
            </p>
          </CardHeader>
          <CardContent className={`${isSeniorMode ? 'senior-spacing senior-padding pt-0' : 'p-8 pt-0'}`}>
            <form onSubmit={handleSubmit} className={`${isSeniorMode ? 'senior-spacing' : 'space-y-6'}`}>
              <div className={`${isSeniorMode ? 'space-y-3' : 'space-y-2'}`}>
                <label className={`${isSeniorMode ? 'text-large' : 'text-sm'} font-medium text-white block`}>
                  Email
                </label>
                <div className="relative">
                  <Mail className={`absolute ${isSeniorMode ? 'left-6 top-5 h-6 w-6' : 'left-4 top-3.5 h-5 w-5'} text-[#A3D9C2]`} />
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${isSeniorMode ? 'pl-16 input-african text-lg' : 'pl-12 input-african'}`}
                    required
                  />
                </div>
              </div>
              
              <div className={`${isSeniorMode ? 'space-y-3' : 'space-y-2'}`}>
                <label className={`${isSeniorMode ? 'text-large' : 'text-sm'} font-medium text-white block`}>
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className={`absolute ${isSeniorMode ? 'left-6 top-5 h-6 w-6' : 'left-4 top-3.5 h-5 w-5'} text-[#A3D9C2]`} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${isSeniorMode ? 'pl-16 pr-16 input-african text-lg' : 'pl-12 pr-12 input-african'}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isSeniorMode ? 'right-6 top-5' : 'right-4 top-3.5'} text-[#A3D9C2] hover:text-[#D4AF37] transition-colors`}
                  >
                    {showPassword ? 
                      <EyeOff className={`${isSeniorMode ? 'h-6 w-6' : 'h-5 w-5'}`} /> : 
                      <Eye className={`${isSeniorMode ? 'h-6 w-6' : 'h-5 w-5'}`} />
                    }
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full button-african ${isSeniorMode ? 'mt-10' : 'mt-8'} animate-pulse-gold`}
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <div className={`text-center ${isSeniorMode ? 'pt-10 mt-10' : 'pt-8 mt-8'} border-t border-white/20`}>
              <p className={`text-[#A3D9C2] ${isSeniorMode ? 'text-large' : 'text-sm'}`}>
                Pas encore de compte ?{" "}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className={`${isSeniorMode ? 'text-[#D4AF37] hover:text-[#B8941F]' : 'text-[#D4AF37] hover:text-[#B8941F]'} font-semibold transition-colors underline`}
                >
                  S'inscrire
                </button>
              </p>
            </div>
            
            <div className={`text-center ${isSeniorMode ? 'pt-6' : 'pt-4'}`}>
              <p className={`text-[#A3D9C2]/70 ${isSeniorMode ? 'text-base' : 'text-xs'}`}>
                Test: patient@test.com / doc@test.com / admin@test.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
