import React from 'react';
import { MATCHES, TeamId } from '../data';
import { usePredictions } from '../hooks/usePredictions';
import MatchCard from './MatchCard';

interface TabPartidosProps {
  currentUserId: string;
  predictions: ReturnType<typeof usePredictions>['predictions'];
  getPick: (matchId: string) => TeamId | null;
  togglePick: (matchId: string, team: TeamId) => void;
  onToast: (msg: string, ok: boolean) => void;
}

const SECTIONS = [
  { status: 'OPEN',     label: '🟢 Abiertos para predecir' },
  { status: 'CLOSED',   label: '🟡 Cerrados (en espera)' },
  { status: 'FINISHED', label: '✅ Finalizados' },
] as const;

export default function TabPartidos({ getPick, togglePick, onToast }: TabPartidosProps) {
  function handlePick(matchId: string, team: TeamId) {
    const current = getPick(matchId);
    togglePick(matchId, team);
    if (current === team) onToast('Predicción eliminada', true);
    else onToast('¡Predicción guardada! 🎯', true);
  }

  return (
    <div>
      {SECTIONS.map(({ status, label }) => {
        const filtered = MATCHES.filter(m => m.status === status);
        if (!filtered.length) return null;
        return (
          <div key={status}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9E9E9E', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '16px 0 8px' }}>
              {label}
            </p>
            {filtered.map(m => (
              <MatchCard
                key={m.id}
                match={m}
                myPick={getPick(m.id)}
                onPick={(team) => handlePick(m.id, team)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
