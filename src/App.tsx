import React, { useState } from 'react';
import { DailyMetricsForm } from './components/DailyMetricsForm';
import { TrainingSessionForm } from './components/TrainingSessionForm';
import { Dashboard } from './components/Dashboard';
import { HistoryView } from './components/HistoryView';
import { Activity, Calendar as CalendarIcon } from 'lucide-react';
import { Tab } from '@headlessui/react';

const DEFAULT_WEIGHTS: RecoveryWeights = {
  qualiteSommeil: 0.3,
  fatigue: 0.3,
  hrv: 0.2,
  douleurMusculaire: 0.2,
};

function App() {
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetrics[]>([]);
  const [showTrainingForm, setShowTrainingForm] = useState(false);

  const handleMorningMetrics = (metrics: Omit<DailyMetrics, 'date' | 'sessions'>) => {
    const today = new Date().toISOString().split('T')[0];
    setDailyMetrics(prev => {
      const existing = prev.find(m => m.date === today);
      if (existing) {
        return prev.map(m => m.date === today ? { ...m, ...metrics } : m);
      }
      return [...prev, { ...metrics, date: today, sessions: [] }];
    });
  };

  const handleTrainingSession = (session: TrainingSession) => {
    const today = new Date().toISOString().split('T')[0];
    setDailyMetrics(prev => {
      const existing = prev.find(m => m.date === today);
      if (existing) {
        return prev.map(m => 
          m.date === today 
            ? { ...m, sessions: [...m.sessions, session] }
            : m
        );
      }
      return [...prev, {
        date: today,
        fatigueMatin: 5,
        qualiteSommeil: 5,
        douleurMusculaire: 5,
        sessions: [session],
      }];
    });
    setShowTrainingForm(false);
  };

  const handleUpdateMetrics = (date: string, metrics: Partial<DailyMetrics>) => {
    setDailyMetrics(prev => 
      prev.map(m => m.date === date ? { ...m, ...metrics } : m)
    );
  };

  const handleAddSession = (date: string, session: TrainingSession) => {
    setDailyMetrics(prev => 
      prev.map(m => 
        m.date === date 
          ? { ...m, sessions: [...m.sessions, session] }
          : m
      )
    );
  };

  const handleDeleteSession = (date: string, index: number) => {
    setDailyMetrics(prev => 
      prev.map(m => 
        m.date === date 
          ? { ...m, sessions: m.sessions.filter((_, i) => i !== index) }
          : m
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Activity className="w-8 h-8" />
            Suivi de Charge d'Entraînement Judo
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1 mb-8">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected
                  ? 'bg-white text-indigo-700 shadow'
                  : 'text-indigo-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              <div className="flex items-center justify-center gap-2">
                <Activity className="w-5 h-5" />
                Aujourd'hui
              </div>
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected
                  ? 'bg-white text-indigo-700 shadow'
                  : 'text-indigo-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              <div className="flex items-center justify-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Historique
              </div>
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <DailyMetricsForm onSubmit={handleMorningMetrics} />
                  
                  {!showTrainingForm ? (
                    <button
                      onClick={() => setShowTrainingForm(true)}
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Ajouter une Session d'Entraînement
                    </button>
                  ) : (
                    <TrainingSessionForm onSubmit={handleTrainingSession} />
                  )}
                </div>

                <div className="space-y-8">
                  <Dashboard
                    dailyMetrics={dailyMetrics}
                    weights={DEFAULT_WEIGHTS}
                  />
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <HistoryView
                dailyMetrics={dailyMetrics}
                onUpdateMetrics={handleUpdateMetrics}
                onAddSession={handleAddSession}
                onDeleteSession={handleDeleteSession}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </div>
  );
}

export default App;