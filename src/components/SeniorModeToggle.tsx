
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface SeniorModeToggleProps {
  isSeniorMode: boolean;
  onToggle: () => void;
}

const SeniorModeToggle: React.FC<SeniorModeToggleProps> = ({ isSeniorMode, onToggle }) => {
  return (
    <Button
      onClick={onToggle}
      className={`flex items-center gap-2 transition-all duration-300 ${
        isSeniorMode 
          ? 'bg-[#D4AF37] text-[#0A3D2F] hover:bg-[#B8941F]' 
          : 'bg-white/10 text-[#A3D9C2] hover:bg-white/20 border border-[#388E6D]/30'
      } backdrop-blur-lg rounded-lg px-4 py-2`}
    >
      {isSeniorMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      <span className="text-sm font-medium">
        {isSeniorMode ? 'Mode normal' : 'Mode senior'}
      </span>
    </Button>
  );
};

export default SeniorModeToggle;
