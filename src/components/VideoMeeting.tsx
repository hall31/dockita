
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneCall, Users, Clock, Settings } from 'lucide-react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

interface VideoMeetingProps {
  appointmentId?: string;
  isHost?: boolean;
  onLeave?: () => void;
}

const VideoMeeting: React.FC<VideoMeetingProps> = ({ 
  appointmentId = '1', 
  isHost = false, 
  onLeave 
}) => {
  const { user } = useAuth();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const [duration, setDuration] = useState(0);
  const [canJoinMeeting, setCanJoinMeeting] = useState(false);

  // Simulation du contrôle d'accès basé sur l'heure
  useEffect(() => {
    const now = new Date();
    const appointmentTime = new Date();
    appointmentTime.setHours(14, 30, 0); // Exemple : RDV à 14h30
    
    const timeDiff = Math.abs(now.getTime() - appointmentTime.getTime());
    const diffMinutes = timeDiff / (1000 * 60);
    
    // Permettre l'accès 30 minutes avant et après l'heure du RDV
    setCanJoinMeeting(diffMinutes <= 30);
  }, []);

  // Timer pour la durée de la consultation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (meetingStarted) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [meetingStarted]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleJoinMeeting = () => {
    if (!canJoinMeeting) {
      toast({
        title: "Accès non autorisé",
        description: "Vous ne pouvez rejoindre que 30 minutes avant/après l'heure du RDV",
        variant: "destructive",
      });
      return;
    }

    setMeetingStarted(true);
    setParticipants([user?.name || 'Utilisateur']);
    
    // Simulation de l'autre participant qui rejoint
    setTimeout(() => {
      setParticipants(prev => [...prev, isHost ? 'Patient' : 'Dr. Médecin']);
    }, 2000);

    toast({
      title: "Consultation démarrée",
      description: "Vous êtes maintenant en ligne",
    });
  };

  const handleLeaveMeeting = () => {
    setMeetingStarted(false);
    setDuration(0);
    setParticipants([]);
    
    toast({
      title: "Consultation terminée",
      description: "Vous avez quitté la consultation",
    });
    
    onLeave?.();
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "Caméra désactivée" : "Caméra activée",
      description: `Votre vidéo est maintenant ${isVideoOn ? 'désactivée' : 'activée'}`,
    });
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    toast({
      title: isAudioOn ? "Micro coupé" : "Micro activé",
      description: `Votre micro est maintenant ${isAudioOn ? 'coupé' : 'activé'}`,
    });
  };

  if (!meetingStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-africa-900 via-africa-800 to-emerald-900 p-4 flex items-center justify-center">
        <Card className="glass-effect border-white/20 w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-white flex items-center justify-center gap-2">
              <Video className="h-6 w-6" />
              Consultation Vidéo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Video className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-white font-semibold mb-2">
                {isHost ? 'Démarrer la consultation' : 'Rejoindre la consultation'}
              </h3>
              <p className="text-africa-200 text-sm mb-4">
                Rendez-vous prévu à 14h30
              </p>
              
              <Badge 
                className={`mb-4 ${canJoinMeeting ? 'bg-green-500' : 'bg-red-500'} text-white border-0`}
              >
                {canJoinMeeting ? 'Accès autorisé' : 'Hors créneaux autorisés'}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                <span className="text-white text-sm">Vidéo</span>
                <Button
                  size="sm"
                  variant={isVideoOn ? "default" : "outline"}
                  onClick={toggleVideo}
                  className={isVideoOn ? "bg-accent text-primary" : "border-white/20 text-white hover:bg-white/10"}
                >
                  {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                <span className="text-white text-sm">Audio</span>
                <Button
                  size="sm"
                  variant={isAudioOn ? "default" : "outline"}
                  onClick={toggleAudio}
                  className={isAudioOn ? "bg-accent text-primary" : "border-white/20 text-white hover:bg-white/10"}
                >
                  {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              onClick={handleJoinMeeting}
              disabled={!canJoinMeeting}
              className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold"
            >
              <PhoneCall className="h-4 w-4 mr-2" />
              {isHost ? 'Démarrer' : 'Rejoindre'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-africa-900 via-africa-800 to-emerald-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Consultation en cours</h1>
            <Badge className="bg-red-500 text-white border-0 animate-pulse">
              🔴 LIVE
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatDuration(duration)}</span>
            </div>
            
            <div className="flex items-center gap-2 text-white">
              <Users className="h-4 w-4" />
              <span>{participants.length}</span>
            </div>
          </div>
        </div>

        {/* Main Video Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Main Video */}
          <div className="lg:col-span-3">
            <Card className="glass-effect border-white/20 h-96">
              <CardContent className="p-0 h-full relative">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-full rounded-lg flex items-center justify-center relative overflow-hidden">
                  {isVideoOn ? (
                    <div className="text-white text-center">
                      <Video className="h-16 w-16 mb-4 mx-auto text-accent" />
                      <p>Vidéo active</p>
                      <p className="text-sm text-gray-300 mt-2">Interface Jitsi intégrée ici</p>
                    </div>
                  ) : (
                    <div className="text-white text-center">
                      <VideoOff className="h-16 w-16 mb-4 mx-auto text-gray-400" />
                      <p>Caméra désactivée</p>
                    </div>
                  )}
                  
                  {/* Participant info overlay */}
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-black/50 text-white border-0">
                      {participants[0] || 'Vous'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with participant + controls */}
          <div className="space-y-4">
            {/* Participants */}
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Participants ({participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {participants.map((participant, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-white/10 rounded">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-primary text-sm font-bold">
                        {participant.charAt(0)}
                      </span>
                    </div>
                    <span className="text-white text-sm">{participant}</span>
                    {index === 0 && (
                      <Badge className="bg-green-500 text-white border-0 text-xs ml-auto">
                        Vous
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-sm">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Partager écran
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Control Bar */}
        <Card className="glass-effect border-white/20">
          <CardContent className="p-4">
            <div className="flex justify-center items-center gap-4">
              <Button
                onClick={toggleAudio}
                variant={isAudioOn ? "default" : "destructive"}
                size="lg"
                className={isAudioOn ? "bg-gray-700 hover:bg-gray-600" : ""}
              >
                {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              
              <Button
                onClick={toggleVideo}
                variant={isVideoOn ? "default" : "destructive"}
                size="lg"
                className={isVideoOn ? "bg-gray-700 hover:bg-gray-600" : ""}
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              
              <Button
                onClick={handleLeaveMeeting}
                variant="destructive"
                size="lg"
                className="bg-red-600 hover:bg-red-700"
              >
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoMeeting;
