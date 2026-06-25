import { useState, useCallback } from 'react';
import { Prediction, TeamId, INITIAL_PREDICTIONS } from '../data';

export function usePredictions(currentUserId: string) {
  const [predictions, setPredictions] = useState<Prediction[]>(INITIAL_PREDICTIONS);

  const getPick = useCallback(
    (matchId: string) =>
      predictions.find(p => p.profileId === currentUserId && p.matchId === matchId)?.pick ?? null,
    [predictions, currentUserId]
  );

  const togglePick = useCallback(
    (matchId: string, team: TeamId) => {
      setPredictions(prev => {
        const existing = prev.find(
          p => p.profileId === currentUserId && p.matchId === matchId
        );
        if (existing?.pick === team) {
          return prev.filter(p => !(p.profileId === currentUserId && p.matchId === matchId));
        }
        const filtered = prev.filter(
          p => !(p.profileId === currentUserId && p.matchId === matchId)
        );
        return [...filtered, { profileId: currentUserId, matchId, pick: team }];
      });
    },
    [currentUserId]
  );

  return { predictions, getPick, togglePick };
}
