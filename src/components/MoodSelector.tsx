
import React from 'react';

interface MoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
}

const moods = [
  { emoji: '😊', label: 'Happy', value: '😊' },
  { emoji: '😌', label: 'Peaceful', value: '😌' },
  { emoji: '😄', label: 'Excited', value: '😄' },
  { emoji: '🤔', label: 'Thoughtful', value: '🤔' },
  { emoji: '😅', label: 'Mixed', value: '😅' },
  { emoji: '😔', label: 'Down', value: '😔' },
  { emoji: '😴', label: 'Tired', value: '😴' },
  { emoji: '🙂', label: 'Okay', value: '🙂' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {moods.map((mood) => (
        <button
          key={mood.value}
          onClick={() => onMoodSelect(mood.value)}
          className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
            selectedMood === mood.value
              ? 'bg-gradient-to-br from-green-100 to-pink-100 ring-2 ring-green-300 scale-110 shadow-md'
              : 'bg-gradient-to-br from-blue-50 to-green-50 hover:from-pink-50 hover:to-blue-50 hover:shadow-md'
          }`}
        >
          <div className="text-3xl mb-2">{mood.emoji}</div>
          <div className="text-sm text-slate-600 font-medium">{mood.label}</div>
        </button>
      ))}
    </div>
  );
};
