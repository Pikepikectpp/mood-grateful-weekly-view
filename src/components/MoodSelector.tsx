
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
              ? 'bg-gradient-to-br from-blue-100 to-green-100 ring-2 ring-blue-400 scale-110'
              : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="text-3xl mb-2">{mood.emoji}</div>
          <div className="text-sm text-gray-600 font-medium">{mood.label}</div>
        </button>
      ))}
    </div>
  );
};
