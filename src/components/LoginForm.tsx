
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Mail, Lock, Eye, EyeOff } from 'lucide-react';
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
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className={`${isSeniorMode ? 'bg-blue-500 p-6 rounded-2xl' : 'bg-emerald-500 p-4 rounded-xl'}`}>
              <Stethoscope className={`${isSeniorMode ? 'h-10 w-10' : 'h-8 w-8'} text-white`} />
            </div>
          </div>
          <h1 className={`${isSeniorMode ? 'text-4xl font-semibold' : 'text-3xl font-light'} text-gray-900 mb-2`}>
            TeleMed Afrique
          </h1>
          <p className={`${isSeniorMode ? 'text-xl' : 'text-base'} text-gray-500 font-light`}>
            Soins de santé à distance
          </p>
        </div>

        {/* Login Card */}
        <Card className="card-minimal border-0 shadow-sm">
          <CardHeader className={`${isSeniorMode ? 'senior-padding pb-4' : 'pb-6'}`}>
            <CardTitle className={`text-center ${isSeniorMode ? 'text-title' : 'text-xl'} font-medium text-gray-900`}>
              Connexion
            </CardTitle>
          </CardHeader>
          <CardContent className={`${isSeniorMode ? 'senior-spacing senior-padding' : 'space-y-6'}`}>
            <form onSubmit={handleSubmit} className={`${isSeniorMode ? 'senior-spacing' : 'space-y-5'}`}>
              <div className="space-y-2">
                <label className={`${isSeniorMode ? 'text-lg' : 'text-sm'} font-medium text-gray-700`}>
                  Email
                </label>
                <div className="relative">
                  <Mail className={`absolute ${isSeniorMode ? 'left-4 top-4 h-6 w-6' : 'left-3 top-3 h-4 w-4'} text-gray-400`} />
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${isSeniorMode ? 'pl-14 input-minimal text-lg' : 'pl-10 input-minimal h-11'}`}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className={`${isSeniorMode ? 'text-lg' : 'text-sm'} font-medium text-gray-700`}>
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className={`absolute ${isSeniorMode ? 'left-4 top-4 h-6 w-6' : 'left-3 top-3 h-4 w-4'} text-gray-400`} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${isSeniorMode ? 'pl-14 pr-14 input-minimal text-lg' : 'pl-10 pr-10 input-minimal h-11'}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isSeniorMode ? 'right-4 top-4' : 'right-3 top-3'} text-gray-400 hover:text-gray-600 transition-colors`}
                  >
                    {showPassword ? 
                      <EyeOff className={`${isSeniorMode ? 'h-6 w-6' : 'h-4 w-4'}`} /> : 
                      <Eye className={`${isSeniorMode ? 'h-6 w-6' : 'h-4 w-4'}`} />
                    }
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full button-minimal ${isSeniorMode ? 'mt-8' : 'h-11 mt-8'}`}
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <div className={`text-center ${isSeniorMode ? 'pt-8' : 'pt-6'} border-t border-gray-100`}>
              <p className={`text-gray-600 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>
                Pas encore de compte ?{" "}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className={`${isSeniorMode ? 'text-blue-600 hover:text-blue-700' : 'text-emerald-600 hover:text-emerald-700'} font-medium transition-colors`}
                >
                  S'inscrire
                </button>
              </p>
            </div>
            
            <div className={`text-center ${isSeniorMode ? 'pt-4' : 'pt-2'}`}>
              <p className={`text-gray-400 ${isSeniorMode ? 'text-base' : 'text-xs'}`}>
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
