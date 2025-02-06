import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from './Calendar';
import { DailyMetricsForm } from './DailyMetricsForm';
import { TrainingSessionForm } from './TrainingSessionForm';
import { MetricsExplanation } from './MetricsExplanation';
import { DailyMetrics, TrainingSession } from '../types';
import { calculateDailyLoad } from '../utils/calculations';

interface HistoryViewProps {
  dailyMetrics: DailyMetrics[];
  onUpdateMetrics: (date: string, metrics: Partial<DailyMetrics>) => void;
  onAddSession: (date: string, session: TrainingSession) => void;
  onDeleteSession: (date: string, index: number) => void;
}

export function HistoryView({ 
  dailyMetrics, 
  onUpdateMetrics, 
  onAddSession,
  onDeleteSession 
}: HistoryViewProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTrainingForm, setShowTrainingForm] = useState(false);

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const selectedMetrics = dailyMetrics.find(m => m.date === selectedDateStr);

  const handleUpdateMetrics = (metrics: Omit<DailyMetrics, 'date' | 'sessions'>) => {
    if (selectedMetrics) {
      onUpdateMetrics(selectedDateStr, metrics);
    } else {
      // Créer une nouvelle entrée si elle n'existe pas
      onUpdateMetrics(selectedDateStr, {
        ...metrics,
        sessions: [],
      });
    }
  };

  const handleAddSession = (session: TrainingSession) => {
    if (selectedMetrics) {
      onAddSession(selectedDateStr, session);
    } else {
      // Créer une nouvelle entrée avec des valeurs par défaut si elle n'existe pas
      onUpdateMetrics(selectedDateStr, {
        fatigueMatin: 5,
        qualiteSommeil: 5,
        douleurMusculaire: 5,
        sessions: [session],
      });
    }
    setShowTrainingForm(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <Calendar
          dailyMetrics={dailyMetrics}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        
        <MetricsExplanation />
      </div>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}
          </h2>
          
          <DailyMetricsForm
            initialMetrics={selectedMetrics}
            onSubmit={handleUpdateMetrics}
          />

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Sessions d'entraînement</h3>
            {selectedMetrics?.sessions.map((session, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{session.type}</p>
                    <p className="text-sm text-gray-600">
                      Durée: {session.duration} min | EPE: {session.rpe}
                    </p>
                    <p className="text-sm text-gray-600">
                      Charge: {calculateDailyLoad([session])} UA
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteSession(selectedDateStr, index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}

            {!showTrainingForm ? (
              <button
                onClick={() => setShowTrainingForm(true)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors mt-4"
              >
                Ajouter une Session
              </button>
            ) : (
              <TrainingSessionForm
                onSubmit={handleAddSession}
                onCancel={() => setShowTrainingForm(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}