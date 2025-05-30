
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Heart, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-africa-900 via-africa-800 to-emerald-900">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-accent p-3 rounded-full">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
            <Heart className="h-6 w-6 text-red-400 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">TeleMed Afrique</h1>
          <p className="text-africa-200">Soins de santé à distance</p>
        </div>

        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-center text-white">Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-africa-300" />
                <Input
                  type="email"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                  required
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-africa-300" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-africa-300 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold"
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>

              <div className="text-center pt-4">
                <p className="text-africa-200 text-sm">
                  Pas encore de compte ?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-accent hover:underline font-semibold"
                  >
                    S'inscrire
                  </button>
                </p>
              </div>
              
              <div className="text-center pt-2">
                <p className="text-africa-300 text-xs">
                  Test: patient@test.com / doc@test.com / admin@test.com
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
