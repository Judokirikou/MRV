import React, { useState } from 'react';
import { Timer, Activity } from 'lucide-react';

interface TrainingSessionFormProps {
  onSubmit: (session: TrainingSession) => void;
}

export function TrainingSessionForm({ onSubmit }: TrainingSessionFormProps) {
  const [session, setSession] = useState<TrainingSession>({
    duration: 60,
    type: 'technique',
    rpe: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(session);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Activity className="w-6 h-6" />
        Session d'Entraînement
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Durée (minutes)
          </label>
          <input
            type="number"
            value={session.duration}
            onChange={(e) => setSession(s => ({ ...s, duration: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type d'Entraînement
          </label>
          <select
            value={session.type}
            onChange={(e) => setSession(s => ({ ...s, type: e.target.value as TrainingSession['type'] }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="technique">Technique</option>
            <option value="force">Force</option>
            <option value="endurance">Endurance</option>
            <option value="randori">Randori</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            EPE (0-10)
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={session.rpe}
            onChange={(e) => setSession(s => ({ ...s, rpe: Number(e.target.value) }))}
            className="w-full"
          />
          <div className="text-center">{session.rpe}</div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Enregistrer la Session
      </button>
    </form>
  );
}