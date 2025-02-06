// Types pour la gestion des données d'entraînement
export interface TrainingSession {
  duration: number; // durée en minutes
  type: 'technique' | 'force' | 'endurance' | 'randori';
  rpe: number; // Échelle de Perception de l'Effort (0-10)
}

// Métriques quotidiennes pour le suivi de la récupération
export interface DailyMetrics {
  date: string;
  fatigueMatin: number; // 0-10
  qualiteSommeil: number; // 0-10
  hrv?: number; // Variabilité de la Fréquence Cardiaque
  douleurMusculaire: number; // 0-10
  sessions: TrainingSession[];
}

// Coefficients de pondération pour le calcul du score de récupération
export interface RecoveryWeights {
  qualiteSommeil: number;
  fatigue: number;
  hrv: number;
  douleurMusculaire: number;
}