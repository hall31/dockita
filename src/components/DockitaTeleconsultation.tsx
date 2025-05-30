
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
  Users,
  X
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
    <div className="h-screen bg-slate-900 relative flex flex-col">
      {/* Header consultation mobile */}
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-lg text-white safe-area-top">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="font-medium">En consultation</span>
        </div>
        <div className="text-sm">12:34</div>
      </div>

      {/* Zone vidéo principale */}
      <div className="flex-1 relative">
        {/* Vidéo du médecin (plein écran) */}
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <span className="text-4xl font-bold text-white">DA</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Dr. Aminata Kone</h3>
            <p className="text-emerald-400 text-lg">Médecine générale</p>
            <div className="mt-4 flex items-center justify-center">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-white">En ligne</span>
            </div>
          </div>
        </div>

        {/* Vidéo du patient (petite fenêtre) */}
        <div className="absolute top-4 right-4 w-32 h-24 bg-slate-700 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-lg">
          <div className="w-full h-full flex items-center justify-center">
            {isVideoOn ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-sm font-bold text-white">Vous</span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <VideoOff className="h-6 w-6 text-slate-400 mx-auto mb-1" />
                <p className="text-xs text-slate-400">Caméra off</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contrôles flottants mobiles */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 safe-area-bottom">
        <button
          onClick={() => setIsMicOn(!isMicOn)}
          className={`control-button touch-optimized ${isMicOn ? 'bg-slate-600/90 text-white' : 'bg-red-500 text-white'}`}
        >
          {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </button>

        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`control-button touch-optimized ${isVideoOn ? 'bg-slate-600/90 text-white' : 'bg-red-500 text-white'}`}
        >
          {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
        </button>

        <button
          onClick={() => setShowChat(!showChat)}
          className="control-button touch-optimized bg-emerald-500 text-white"
        >
          <MessageSquare className="h-6 w-6" />
        </button>

        <button
          onClick={onEndCall}
          className="control-button touch-optimized bg-red-500 text-white"
        >
          <Phone className="h-6 w-6" />
        </button>
      </div>

      {/* Panneau de chat mobile (slide up) */}
      {showChat && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowChat(false)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-96 slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 text-lg">Chat</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="p-2 hover:bg-slate-100 rounded-full"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto smooth-scroll">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`${msg.sender === 'Vous' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-2xl max-w-xs ${
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

            <div className="p-4 border-t border-slate-200 safe-area-bottom">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Tapez votre message..."
                  className="flex-1 bg-slate-100 border-0 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-200"
                />
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 active-scale-95">
                  Envoyer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DockitaTeleconsultation;
