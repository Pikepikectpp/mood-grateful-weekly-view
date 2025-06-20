
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
        className="min-h-32 text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
        maxLength={500}
      />
      <div className="text-right text-sm text-gray-400">
        {value.length}/500 characters
      </div>
    </div>
  );
};
