
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Save, Camera } from 'lucide-react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

const ProfileInterface: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialization: user?.specialization || '',
    bio: '',
    address: '',
    experience: '',
    languages: '',
    consultationFee: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await updateProfile(formData);
    
    if (success) {
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées avec succès",
      });
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-africa-900 via-africa-800 to-emerald-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mon Profil</h1>
          <p className="text-africa-200">Gérez vos informations personnelles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture Card */}
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-accent text-primary text-2xl font-bold">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-accent hover:bg-accent/90"
                  >
                    <Camera className="h-4 w-4 text-primary" />
                  </Button>
                </div>
                <h3 className="text-white font-semibold text-lg">{user?.name}</h3>
                <p className="text-africa-200 text-sm capitalize">{user?.role}</p>
                {user?.role === 'doctor' && user?.specialization && (
                  <p className="text-accent text-sm">{user.specialization}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-africa-300" />
                      <Input
                        type="tel"
                        placeholder="Téléphone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                      />
                    </div>
                    
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-africa-300" />
                      <Input
                        type="text"
                        placeholder="Adresse"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                      />
                    </div>
                  </div>

                  {/* Doctor-specific fields */}
                  {user?.role === 'doctor' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-africa-300" />
                          <Input
                            type="text"
                            placeholder="Spécialisation"
                            value={formData.specialization}
                            onChange={(e) => handleInputChange('specialization', e.target.value)}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                          />
                        </div>
                        
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-africa-300" />
                          <Input
                            type="text"
                            placeholder="Années d'expérience"
                            value={formData.experience}
                            onChange={(e) => handleInputChange('experience', e.target.value)}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="text"
                          placeholder="Langues parlées"
                          value={formData.languages}
                          onChange={(e) => handleInputChange('languages', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                        />
                        
                        <Input
                          type="text"
                          placeholder="Tarif consultation (€)"
                          value={formData.consultationFee}
                          onChange={(e) => handleInputChange('consultationFee', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-africa-300"
                        />
                      </div>

                      <div>
                        <Textarea
                          placeholder="Biographie professionnelle..."
                          value={formData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-africa-300 min-h-[100px]"
                        />
                      </div>
                    </>
                  )}

                  {/* Save Button */}
                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                      disabled={loading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Sauvegarde..." : "Sauvegarder"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Settings Card */}
        <Card className="glass-effect border-white/20 mt-6">
          <CardHeader>
            <CardTitle className="text-white">Préférences de notification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Notifications email</p>
                  <p className="text-africa-200 text-sm">Recevoir les notifications par email</p>
                </div>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  Activé
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Notifications SMS</p>
                  <p className="text-africa-200 text-sm">Recevoir les rappels par SMS</p>
                </div>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  Désactivé
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Rappels de rendez-vous</p>
                  <p className="text-africa-200 text-sm">Rappel automatique 24h avant</p>
                </div>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  Activé
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileInterface;
