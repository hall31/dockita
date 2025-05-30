
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
      variant="outline"
      size="sm"
      className="flex items-center gap-2 text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50"
    >
      {isSeniorMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      <span className="text-sm font-medium">
        {isSeniorMode ? 'Mode normal' : 'Mode senior'}
      </span>
    </Button>
  );
};

export default SeniorModeToggle;
