
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, UserCheck, Calendar, Video, TrendingUp, Activity, Shield, Settings } from 'lucide-react';
import { useAuth } from './AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const statsData = [
    { name: 'Jan', patients: 120, doctors: 15, consultations: 340 },
    { name: 'Fév', patients: 150, doctors: 18, consultations: 420 },
    { name: 'Mar', patients: 180, doctors: 22, consultations: 510 },
    { name: 'Avr', patients: 220, doctors: 25, consultations: 680 },
    { name: 'Mai', patients: 260, doctors: 28, consultations: 780 },
    { name: 'Juin', patients: 300, doctors: 32, consultations: 920 },
  ];

  const pieData = [
    { name: 'Médecine générale', value: 35, color: '#22c55e' },
    { name: 'Cardiologie', value: 20, color: '#3b82f6' },
    { name: 'Pédiatrie', value: 15, color: '#f59e0b' },
    { name: 'Gynécologie', value: 20, color: '#ec4899' },
    { name: 'Autres', value: 10, color: '#8b5cf6' },
  ];

  const recentUsers = [
    { id: '1', name: 'Dr. Kofi Asante', type: 'doctor', status: 'active', joinDate: '2024-01-10' },
    { id: '2', name: 'Aminata Diallo', type: 'patient', status: 'active', joinDate: '2024-01-09' },
    { id: '3', name: 'Dr. Fatou Sow', type: 'doctor', status: 'pending', joinDate: '2024-01-08' },
    { id: '4', name: 'Omar Traoré', type: 'patient', status: 'active', joinDate: '2024-01-07' },
  ];

  const systemMetrics = [
    { label: 'Temps de réponse moyen', value: '1.2s', status: 'good' },
    { label: 'Disponibilité système', value: '99.8%', status: 'excellent' },
    { label: 'Consultations en cours', value: '24', status: 'normal' },
    { label: 'Serveurs actifs', value: '4/4', status: 'excellent' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-africa-900 via-africa-800 to-emerald-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Dashboard Administrateur 🛡️
          </h1>
          <p className="text-africa-200">Gestion de la plateforme TeleMed Afrique</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-africa-200 text-sm">Total Patients</p>
                  <p className="text-white text-xl font-bold">1,247</p>
                  <p className="text-green-400 text-xs">+12% ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <UserCheck className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-africa-200 text-sm">Médecins actifs</p>
                  <p className="text-white text-xl font-bold">89</p>
                  <p className="text-green-400 text-xs">+8% ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Video className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-africa-200 text-sm">Consultations</p>
                  <p className="text-white text-xl font-bold">5,432</p>
                  <p className="text-green-400 text-xs">+23% ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-africa-200 text-sm">Revenus</p>
                  <p className="text-white text-xl font-bold">€24,580</p>
                  <p className="text-green-400 text-xs">+18% ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white/10 p-1 rounded-lg backdrop-blur-lg overflow-x-auto">
          <Button
            onClick={() => setActiveTab('overview')}
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            className={`whitespace-nowrap ${activeTab === 'overview' 
              ? 'bg-accent text-primary' 
              : 'text-white hover:bg-white/20'}`}
          >
            <Activity className="h-4 w-4 mr-2" />
            Vue d'ensemble
          </Button>
          <Button
            onClick={() => setActiveTab('users')}
            variant={activeTab === 'users' ? 'default' : 'ghost'}
            className={`whitespace-nowrap ${activeTab === 'users' 
              ? 'bg-accent text-primary' 
              : 'text-white hover:bg-white/20'}`}
          >
            <Users className="h-4 w-4 mr-2" />
            Utilisateurs
          </Button>
          <Button
            onClick={() => setActiveTab('system')}
            variant={activeTab === 'system' ? 'default' : 'ghost'}
            className={`whitespace-nowrap ${activeTab === 'system' 
              ? 'bg-accent text-primary' 
              : 'text-white hover:bg-white/20'}`}
          >
            <Shield className="h-4 w-4 mr-2" />
            Système
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Growth Chart */}
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Croissance mensuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={statsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="#ffffff" />
                      <YAxis stroke="#ffffff" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="patients" fill="#22c55e" />
                      <Bar dataKey="doctors" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Specializations Pie Chart */}
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Répartition des spécialisations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Nouveaux utilisateurs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-semibold">{user.name}</h3>
                        <p className="text-africa-200 text-sm capitalize">{user.type}</p>
                        <p className="text-africa-300 text-xs">
                          Inscrit le {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={`${user.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'} text-white border-0`}
                        >
                          {user.status === 'active' ? 'Actif' : 'En attente'}
                        </Badge>
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          Gérer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  État du système
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {systemMetrics.map((metric, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-africa-200 text-sm">{metric.label}</p>
                          <p className="text-white text-lg font-semibold">{metric.value}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          metric.status === 'excellent' ? 'bg-green-400' :
                          metric.status === 'good' ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
