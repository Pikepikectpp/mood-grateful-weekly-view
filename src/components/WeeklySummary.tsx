
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Calendar } from 'lucide-react';
import { Entry } from '@/types/entry';

interface WeeklySummaryProps {
  entries: Entry[];
}

export const WeeklySummary: React.FC<WeeklySummaryProps> = ({ entries }) => {
  const getWeekInfo = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);
    
    return {
      startDate: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      endDate: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  };

  const weekInfo = getWeekInfo();

  if (entries.length === 0) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-green-100 shadow-lg">
        <CardContent className="text-center py-12">
          <Heart className="mx-auto text-pink-300 h-16 w-16 mb-4" />
          <h3 className="text-xl text-slate-600 mb-2">No entries yet this week, Hossain</h3>
          <p className="text-slate-500">Start your gratitude journey by making your first daily entry! 🌸</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-400 to-pink-400 text-white border-0 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-3">
            <Heart className="h-6 w-6" />
            Hossain's Week of Gratitude
          </CardTitle>
          <p className="text-green-100">
            {weekInfo.startDate} - {weekInfo.endDate}
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {entries.map((entry, index) => (
          <Card key={entry.date} className="bg-white/70 backdrop-blur-sm border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-pink-100 rounded-full flex items-center justify-center text-2xl shadow-sm">
                    {entry.mood}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-500 font-medium">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <p className="text-slate-700 text-lg italic leading-relaxed">
                    "{entry.gratitude}"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {entries.length > 0 && (
        <Card className="bg-gradient-to-r from-pink-100 to-blue-100 border-pink-200 shadow-md">
          <CardContent className="p-6 text-center">
            <Heart className="mx-auto text-pink-400 h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              You've captured {entries.length} moment{entries.length !== 1 ? 's' : ''} of gratitude this week, Hossain! 
            </h3>
            <p className="text-slate-600">
              Each entry is a step toward a more mindful and appreciative life. Keep it up! 🌸✨
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
