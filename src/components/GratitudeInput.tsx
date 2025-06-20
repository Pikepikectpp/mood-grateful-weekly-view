
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface GratitudeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const GratitudeInput: React.FC<GratitudeInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Share something that made you smile, a person you appreciate, a moment of beauty, or anything that fills your heart with gratitude..."
        className="min-h-32 text-lg p-4 border-2 border-green-100 rounded-xl focus:border-pink-300 focus:ring-2 focus:ring-green-100 transition-all duration-300 resize-none bg-gradient-to-br from-white to-green-50/30"
        maxLength={500}
      />
      <div className="text-right text-sm text-slate-400">
        {value.length}/500 characters
      </div>
    </div>
  );
};
