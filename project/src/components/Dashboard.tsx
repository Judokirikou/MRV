import React from 'react';
import { BarChart, Activity, TrendingUp } from 'lucide-react';
import { calculateLoadRecoveryRatio, calculateDailyLoad, calculateRecoveryScore, calculateREDI } from '../utils/calculations';

interface DashboardProps {
  dailyMetrics: DailyMetrics[];
  weights: RecoveryWeights;
}

export function Dashboard({ dailyMetrics, weights }: DashboardProps) {
  const today = dailyMetrics[dailyMetrics.length - 1];
  
  if (!today) {
    return null;
  }

  const dailyLoad = calculateDailyLoad(today.sessions);
  const recoveryScore = calculateRecoveryScore(
    today.qualiteSommeil,
    today.fatigueMatin,
    today.hrv,
    today.douleurMusculaire,
    weights
  );
  const loadRecoveryRatio = calculateLoadRecoveryRatio(dailyLoad, recoveryScore);

  // Calcul du REDI sur les 7 derniers jours
  const recentLoads = dailyMetrics
    .slice(-7)
    .map(day => calculateDailyLoad(day.sessions));
  const redi = calculateREDI(recentLoads);

  const getLoadStatus = (ratio: number) => {
    if (ratio < 0.8) return { text: 'Sous-stimulation', color: 'text-yellow-600' };
    if (ratio > 1.3) return { text: 'Risque de Surcharge', color: 'text-red-600' };
    return { text: 'Charge Optimale', color: 'text-green-600' };
  };

  const status = getLoadStatus(loadRecoveryRatio);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5" />
          Charge Quotidienne
        </h3>
        <div className="text-3xl font-bold">{dailyLoad.toFixed(0)} UA</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <BarChart className="w-5 h-5" />
          Score de Récupération
        </h3>
        <div className="text-3xl font-bold">{(recoveryScore * 10).toFixed(1)}/100</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5" />
          Ratio Charge/Récupération
        </h3>
        <div className="text-3xl font-bold">{loadRecoveryRatio.toFixed(2)}</div>
        <div className={`mt-2 ${status.color}`}>{status.text}</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Score REDI</h3>
        <div className="text-3xl font-bold">{redi.toFixed(0)}</div>
        <p className="text-sm text-gray-600 mt-2">
          Impact cumulé des charges sur les 7 derniers jours
        </p>
      </div>
    </div>
  );
}