
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Stethoscope, Heart, Mail, Lock, User, Phone, GraduationCap } from 'lucide-react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

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
          <p className="text-africa-200">Rejoignez notre communauté</p>
        </div>

        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-center text-white">Inscription</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-africa-300" />
                <Input
                  type="text"
                  placeholder="Nom complet"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                  required
                />
              </div>
              
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-africa-300" />
                <Input
                  type="email"
                  placeholder="Adresse email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-africa-300" />
                <Input
                  type="tel"
                  placeholder="Numéro de téléphone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                  required
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-africa-300" />
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                  required
                />
              </div>

              <Select onValueChange={handleRoleChange}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Je suis..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Médecin</SelectItem>
                </SelectContent>
              </Select>

              {formData.role === 'doctor' && (
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-africa-300" />
                  <Input
                    type="text"
                    placeholder="Spécialisation"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                    required
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold"
                disabled={loading}
              >
                {loading ? "Inscription..." : "S'inscrire"}
              </Button>

              <div className="text-center pt-4">
                <p className="text-africa-200 text-sm">
                  Déjà un compte ?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-accent hover:underline font-semibold"
                  >
                    Se connecter
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
