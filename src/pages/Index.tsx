
import React, { useState, useEffect } from 'react';
import { MoodSelector } from '@/components/MoodSelector';
import { GratitudeInput } from '@/components/GratitudeInput';
import { WeeklySummary } from '@/components/WeeklySummary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Calendar } from 'lucide-react';
import { saveEntry, getTodaysEntry, getWeekEntries } from '@/utils/storage';
import { Entry } from '@/types/entry';

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [gratitude, setGratitude] = useState<string>('');
  const [todaysEntry, setTodaysEntry] = useState<Entry | null>(null);
  const [showWeekly, setShowWeekly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const entry = getTodaysEntry();
    if (entry) {
      setTodaysEntry(entry);
      setSelectedMood(entry.mood);
      setGratitude(entry.gratitude);
    }
  }, []);

  const handleSubmit = async () => {
    if (!selectedMood || !gratitude.trim()) return;

    setIsSubmitting(true);
    
    const entry: Entry = {
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      gratitude: gratitude.trim(),
      timestamp: new Date().toISOString()
    };

    saveEntry(entry);
    setTodaysEntry(entry);
    
    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (showWeekly) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Heart className="text-pink-500" />
              Weekly Gratitude
            </h1>
            <Button 
              onClick={() => setShowWeekly(false)}
              variant="outline"
              className="text-gray-600 hover:text-gray-800"
            >
              Back to Today
            </Button>
          </div>
          <WeeklySummary entries={getWeekEntries()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Heart className="text-pink-500" />
            Daily Check-in
          </h1>
          <p className="text-gray-600 text-lg">{getCurrentDate()}</p>
        </div>

        {todaysEntry ? (
          <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-green-600 flex items-center justify-center gap-2">
                <Heart className="text-pink-500" />
                Today's Entry Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <p className="text-gray-600 mb-2">Your mood today:</p>
                <div className="text-4xl">{todaysEntry.mood}</div>
              </div>
              <div>
                <p className="text-gray-600 mb-2">You're grateful for:</p>
                <p className="text-lg text-gray-800 italic">"{todaysEntry.gratitude}"</p>
              </div>
              <div className="pt-4">
                <Button 
                  onClick={() => setShowWeekly(true)}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  View This Week's Gratitude
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-gray-700">How are you feeling today?</CardTitle>
              </CardHeader>
              <CardContent>
                <MoodSelector selectedMood={selectedMood} onMoodSelect={setSelectedMood} />
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-gray-700 flex items-center justify-center gap-2">
                  <Heart className="text-pink-500 h-5 w-5" />
                  What's one thing you're grateful for today?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GratitudeInput value={gratitude} onChange={setGratitude} />
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                onClick={handleSubmit}
                disabled={!selectedMood || !gratitude.trim() || isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 disabled:from-gray-300 disabled:to-gray-400 text-white px-12 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 disabled:scale-100"
              >
                {isSubmitting ? "Saving..." : "Save Today's Entry"}
              </Button>
            </div>
          </div>
        )}

        {!todaysEntry && (
          <div className="text-center mt-8">
            <Button 
              onClick={() => setShowWeekly(true)}
              variant="outline"
              className="text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400"
            >
              <Calendar className="mr-2 h-4 w-4" />
              View This Week's Gratitude
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
