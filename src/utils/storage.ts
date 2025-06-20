
import { Entry } from '@/types/entry';

const STORAGE_KEY = 'gratitude-entries';

export const saveEntry = (entry: Entry): void => {
  const entries = getEntries();
  const existingIndex = entries.findIndex(e => e.date === entry.date);
  
  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.push(entry);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const getEntries = (): Entry[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getTodaysEntry = (): Entry | null => {
  const today = new Date().toISOString().split('T')[0];
  const entries = getEntries();
  return entries.find(entry => entry.date === today) || null;
};

export const getWeekEntries = (): Entry[] => {
  const entries = getEntries();
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 6);
  
  return entries
    .filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekStart && entryDate <= today;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
