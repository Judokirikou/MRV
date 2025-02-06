import React, { useState, useEffect } from 'react';
import { Activity, Moon, Heart, Dumbbell } from 'lucide-react';

interface DailyMetricsFormProps {
  initialMetrics?: Partial<DailyMetrics>;
  onSubmit: (metrics: Omit<DailyMetrics, 'date' | 'sessions'>) => void;
}

export function DailyMetricsForm({ initialMetrics, onSubmit }: DailyMetricsFormProps) {
  const [metrics, setMetrics] = useState({
    fatigueMatin: 5,
    qualiteSommeil: 5,
    hrv: undefined as number | undefined,
    douleurMusculaire: 5,
  });

  useEffect(() => {
    if (initialMetrics) {
      setMetrics({
        fatigueMatin: initialMetrics.fatigueMatin ?? 5,
        qualiteSommeil: initialMetrics.qualiteSommeil ?? 5,
        hrv: initialMetrics.hrv,
        douleurMusculaire: initialMetrics.douleurMusculaire ?? 5,
      });
    }
  }, [initialMetrics]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(metrics);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Moon className="w-6 h-6" />
        Métriques du Matin
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fatigue Matinale (0-10)
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={metrics.fatigueMatin}
            onChange={(e) => setMetrics(m => ({ ...m, fatigueMatin: Number(e.target.value) }))}
            className="w-full"
          />
          <div className="text-center">{metrics.fatigueMatin}</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Qualité du Sommeil (0-10)
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={metrics.qualiteSommeil}
            onChange={(e) => setMetrics(m => ({ ...m, qualiteSommeil: Number(e.target.value) }))}
            className="w-full"
          />
          <div className="text-center">{metrics.qualiteSommeil}</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            VFC/HRV (optionnel)
          </label>
          <input
            type="number"
            value={metrics.hrv || ''}
            onChange={(e) => setMetrics(m => ({ ...m, hrv: e.target.value ? Number(e.target.value) : undefined }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Entrez la valeur VFC/HRV"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Douleur Musculaire (0-10)
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={metrics.douleurMusculaire}
            onChange={(e) => setMetrics(m => ({ ...m, douleurMusculaire: Number(e.target.value) }))}
            className="w-full"
          />
          <div className="text-center">{metrics.douleurMusculaire}</div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Enregistrer les Métriques
      </button>
    </form>
  );
}