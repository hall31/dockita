
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  MessageSquare, 
  FileText, 
  Share2,
  Settings,
  Users
} from 'lucide-react';

interface DockitaTeleconsultationProps {
  onEndCall?: () => void;
}

const DockitaTeleconsultation: React.FC<DockitaTeleconsultationProps> = ({ onEndCall }) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);

  const chatMessages = [
    { sender: 'Dr. Aminata', message: 'Bonjour, comment vous sentez-vous aujourd\'hui ?', time: '14:32' },
    { sender: 'Vous', message: 'Bonjour docteur, j\'ai des maux de tête depuis 2 jours', time: '14:33' },
    { sender: 'Dr. Aminata', message: 'Avez-vous de la fièvre ?', time: '14:34' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 relative">
      {/* Fenêtre vidéo principale */}
      <div className="relative h-screen">
        {/* Vidéo du médecin (principale) */}
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold text-white">DA</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Dr. Aminata Kone</h3>
            <p className="text-emerald-400">Médecine générale</p>
            <div className="mt-4 flex items-center justify-center">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-white text-sm">En ligne</span>
            </div>
          </div>
        </div>

        {/* Vidéo du patient (petite fenêtre) */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-slate-700 rounded-xl overflow-hidden border-2 border-emerald-500">
          <div className="w-full h-full flex items-center justify-center">
            {isVideoOn ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-white">Vous</span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <VideoOff className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Caméra désactivée</p>
              </div>
            )}
          </div>
        </div>

        {/* Informations de la consultation */}
        <div className="absolute top-4 left-4">
          <Card className="bg-black/50 backdrop-blur-lg border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Consultation en cours</span>
              </div>
              <p className="text-slate-300 text-sm mt-1">Durée: 12:34</p>
            </CardContent>
          </Card>
        </div>

        {/* Contrôles flottants */}
        <div className="floating-controls">
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`control-button ${isMicOn ? 'bg-slate-600 text-white' : 'bg-red-500 text-white'}`}
          >
            {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`control-button ${isVideoOn ? 'bg-slate-600 text-white' : 'bg-red-500 text-white'}`}
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setShowChat(!showChat)}
            className="control-button bg-emerald-500 text-white"
          >
            <MessageSquare className="h-5 w-5" />
          </button>

          <button
            onClick={() => setShowDocuments(!showDocuments)}
            className="control-button bg-orange-500 text-white"
          >
            <FileText className="h-5 w-5" />
          </button>

          <button className="control-button bg-slate-600 text-white">
            <Share2 className="h-5 w-5" />
          </button>

          <button
            onClick={onEndCall}
            className="control-button bg-red-500 text-white"
          >
            <Phone className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Panneau de chat */}
      {showChat && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl slide-up">
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Chat</h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 space-y-4 max-h-96 overflow-y-auto">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`${msg.sender === 'Vous' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded-lg max-w-xs ${
                  msg.sender === 'Vous' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-100 text-slate-800'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Tapez votre message..."
                className="flex-1 dockita-input"
              />
              <Button className="dockita-button-primary">
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Panneau de documents */}
      {showDocuments && (
        <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl slide-up">
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Documents</h3>
              <button
                onClick={() => setShowDocuments(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <Button className="dockita-button-outline w-full">
              <FileText className="h-4 w-4 mr-2" />
              Partager un document
            </Button>
            
            <div className="space-y-2">
              <h4 className="font-medium text-slate-700">Documents partagés</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium">Ordonnance précédente</p>
                  <p className="text-xs text-slate-500">PDF • 2 MB</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium">Résultats d'analyse</p>
                  <p className="text-xs text-slate-500">PDF • 1.5 MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DockitaTeleconsultation;
