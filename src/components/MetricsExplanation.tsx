import React from 'react';
import { Info } from 'lucide-react';

export function MetricsExplanation() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Info className="w-6 h-6" />
        Guide des Mesures
      </h2>

      <div className="space-y-4">
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Métriques du Matin</h3>
          <dl className="space-y-3">
            <div>
              <dt className="font-medium">Fatigue Matinale (0-10)</dt>
              <dd className="text-gray-600 ml-4">
                0 = Parfaitement reposé
                <br />
                5 = Fatigue modérée
                <br />
                10 = Épuisement total
              </dd>
            </div>
            <div>
              <dt className="font-medium">Qualité du Sommeil (0-10)</dt>
              <dd className="text-gray-600 ml-4">
                0 = Très mauvaise nuit
                <br />
                5 = Sommeil moyen
                <br />
                10 = Sommeil parfait
              </dd>
            </div>
            <div>
              <dt className="font-medium">VFC (Variabilité de la Fréquence Cardiaque)</dt>
              <dd className="text-gray-600 ml-4">
                Mesure optionnelle, en millisecondes (ms)
                <br />
                Une VFC élevée indique une bonne récupération
              </dd>
            </div>
            <div>
              <dt className="font-medium">Douleur Musculaire (0-10)</dt>
              <dd className="text-gray-600 ml-4">
                0 = Aucune douleur
                <br />
                5 = Douleurs modérées
                <br />
                10 = Douleurs intenses
              </dd>
            </div>
          </dl>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Indicateurs de Performance</h3>
          <dl className="space-y-3">
            <div>
              <dt className="font-medium">Charge Quotidienne (UA)</dt>
              <dd className="text-gray-600 ml-4">
                Somme des charges de chaque séance
                <br />
                Calculée selon : Durée × EPE
              </dd>
            </div>
            <div>
              <dt className="font-medium">Score de Récupération (/100)</dt>
              <dd className="text-gray-600 ml-4">
                Intègre toutes les métriques du matin
                <br />
                &gt; 70 = Bonne récupération
                <br />
                &lt; 50 = Récupération insuffisante
              </dd>
            </div>
            <div>
              <dt className="font-medium">Ratio Charge/Récupération</dt>
              <dd className="text-gray-600 ml-4">
                0.8 - 1.3 = Zone optimale
                <br />
                &gt; 1.3 = Risque de surcharge
                <br />
                &lt; 0.8 = Sous-stimulation
              </dd>
            </div>
            <div>
              <dt className="font-medium">Score REDI</dt>
              <dd className="text-gray-600 ml-4">
                Mesure l'impact cumulé des charges sur 7 jours
                <br />
                Prend en compte la décroissance de l'impact des charges anciennes
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}