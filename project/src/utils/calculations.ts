// Calcul de la charge d'une session selon la formule de Foster
export const calculateSessionLoad = (duration: number, rpe: number): number => {
  return duration * rpe;
};

// Calcul de la charge quotidienne totale
export const calculateDailyLoad = (sessions: TrainingSession[]): number => {
  return sessions.reduce((total, session) => {
    return total + calculateSessionLoad(session.duration, session.rpe);
  }, 0);
};

// Calcul du score de récupération pondéré
export const calculateRecoveryScore = (
  qualiteSommeil: number,
  fatigue: number,
  hrv: number | undefined,
  douleurMusculaire: number,
  weights: RecoveryWeights
): number => {
  // Normalisation du HRV sur une échelle de 0-10
  const normalizedHRV = hrv ? hrv / 100 * 10 : 5;
  
  const weightSum = weights.qualiteSommeil + weights.fatigue + weights.hrv + weights.douleurMusculaire;
  
  return (
    (weights.qualiteSommeil * qualiteSommeil +
    weights.fatigue * (10 - fatigue) +
    weights.hrv * normalizedHRV +
    weights.douleurMusculaire * (10 - douleurMusculaire)) / weightSum
  );
};

// Calcul du ratio charge/récupération
export const calculateLoadRecoveryRatio = (
  dailyLoad: number,
  recoveryScore: number
): number => {
  return dailyLoad / (recoveryScore * 10);
};

// Calcul de l'indice REDI (décroissance exponentielle robuste)
export const calculateREDI = (
  dailyLoads: number[],
  decayFactor: number = 0.5
): number => {
  return dailyLoads.reduce((total, load, index) => {
    return total + load * Math.exp(-decayFactor * index);
  }, 0);
};