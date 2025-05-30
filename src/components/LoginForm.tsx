
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
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
        <div className="text-center mb-12">
          <h1 className={`${isSeniorMode ? 'text-title' : 'text-4xl'} font-light text-slate-900 mb-3`}>
            TeleMed
          </h1>
          <p className={`${isSeniorMode ? 'text-subtitle' : 'text-lg'} text-slate-500 font-light`}>
            Consultation médicale
          </p>
        </div>

        {/* Login Card */}
        <Card className="card-modern border-0">
          <CardHeader className={`${isSeniorMode ? 'senior-padding pb-6' : 'p-8 pb-6'}`}>
            <CardTitle className={`text-center ${isSeniorMode ? 'text-title' : 'text-2xl'} font-light text-slate-900`}>
              Connexion
            </CardTitle>
          </CardHeader>
          <CardContent className={`${isSeniorMode ? 'senior-spacing senior-padding pt-0' : 'p-8 pt-0'}`}>
            <form onSubmit={handleSubmit} className={`${isSeniorMode ? 'senior-spacing' : 'space-y-6'}`}>
              <div className={`${isSeniorMode ? 'space-y-3' : 'space-y-2'}`}>
                <label className={`${isSeniorMode ? 'text-large' : 'text-sm'} font-medium text-slate-700 block`}>
                  Email
                </label>
                <div className="relative">
                  <Mail className={`absolute ${isSeniorMode ? 'left-6 top-5 h-6 w-6' : 'left-4 top-3.5 h-5 w-5'} text-slate-400`} />
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${isSeniorMode ? 'pl-16 pr-16 input-modern text-lg' : 'pl-12 pr-12 input-modern'}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isSeniorMode ? 'right-6 top-5' : 'right-4 top-3.5'} text-slate-400 hover:text-slate-600 transition-colors`}
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
                className={`w-full button-modern ${isSeniorMode ? 'mt-10' : 'mt-8'}`}
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <div className={`text-center ${isSeniorMode ? 'pt-10 mt-10' : 'pt-8 mt-8'} border-t border-slate-100`}>
              <p className={`text-slate-600 ${isSeniorMode ? 'text-large' : 'text-sm'}`}>
                Pas encore de compte ?{" "}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className={`${isSeniorMode ? 'text-blue-600 hover:text-blue-700' : 'text-slate-700 hover:text-slate-900'} font-medium transition-colors underline`}
                >
                  S'inscrire
                </button>
              </p>
            </div>
            
            <div className={`text-center ${isSeniorMode ? 'pt-6' : 'pt-4'}`}>
              <p className={`text-slate-400 ${isSeniorMode ? 'text-base' : 'text-xs'}`}>
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
