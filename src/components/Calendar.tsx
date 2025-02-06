import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DailyMetrics } from '../types';

interface CalendarProps {
  dailyMetrics: DailyMetrics[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function Calendar({ dailyMetrics, selectedDate, onSelectDate }: CalendarProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getDayMetrics = (date: Date) => {
    return dailyMetrics.find(m => isSameDay(new Date(m.date), date));
  };

  const getDayColor = (date: Date) => {
    const metrics = getDayMetrics(date);
    if (!metrics) return 'bg-gray-50';
    
    const hasTraining = metrics.sessions.length > 0;
    const goodSleep = metrics.qualiteSommeil >= 7;
    const lowFatigue = metrics.fatigueMatin <= 3;

    if (hasTraining && goodSleep && lowFatigue) return 'bg-green-100';
    if (hasTraining && (!goodSleep || !lowFatigue)) return 'bg-yellow-100';
    return 'bg-blue-50';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">
          {format(selectedDate, 'MMMM yyyy', { locale: fr })}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        {days.map(day => {
          const isSelected = isSameDay(day, selectedDate);
          const dayColor = getDayColor(day);
          const metrics = getDayMetrics(day);
          
          return (
            <button
              key={day.toString()}
              onClick={() => onSelectDate(day)}
              className={`
                p-2 text-sm rounded-lg transition-colors
                ${dayColor}
                ${isSelected ? 'ring-2 ring-indigo-600' : ''}
                hover:bg-indigo-50
              `}
            >
              <div className="font-medium">{format(day, 'd')}</div>
              {metrics?.sessions.length ? (
                <div className="text-xs text-gray-600">{metrics.sessions.length} séance(s)</div>
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100"></div>
          <span>Bonne récupération + Entraînement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-100"></div>
          <span>Récupération moyenne + Entraînement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-50"></div>
          <span>Jour de repos</span>
        </div>
      </div>
    </div>
  );
}