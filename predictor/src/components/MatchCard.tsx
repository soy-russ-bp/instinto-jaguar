import React from 'react';
import { Match, TeamId, TEAMS } from '../data';

interface MatchCardProps {
  match: Match;
  myPick: TeamId | null;
  onPick: (team: TeamId) => void;
}

const STATUS_LABEL: Record<string, string> = {
  OPEN: 'Abierto',
  CLOSED: 'Cerrado',
  FINISHED: 'Finalizado',
};

const STATUS_STYLE: Record<string, React.CSSProperties> = {
  OPEN:     { background: '#E8F5E9', color: '#1B5E20' },
  CLOSED:   { background: '#FFF8E1', color: '#F57F17' },
  FINISHED: { background: '#F5F5F5', color: '#616161' },
};

export default function MatchCard({ match, myPick, onPick }: MatchCardProps) {
  const ta = TEAMS[match.teamA];
  const tb = TEAMS[match.teamB];
  const isOpen = match.status === 'OPEN';

  function btnStyle(team: TeamId): React.CSSProperties {
    const base: React.CSSProperties = {
      flex: 1,
      padding: '10px 8px',
      border: '1px solid #e0e0e0',
      borderRadius: 10,
      background: 'transparent',
      cursor: isOpen ? 'pointer' : 'default',
      fontSize: 13,
      fontWeight: 500,
      transition: 'all 0.15s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    };

    if (match.status === 'FINISHED') {
      const isWinner = match.winner === team;
      const isPicked = myPick === team;
      if (isWinner && isPicked) return { ...base, background: '#E8F5E9', color: '#1B5E20', border: '1px solid #A5D6A7' };
      if (!isWinner && isPicked) return { ...base, background: '#FFEBEE', color: '#B71C1C', border: '1px solid #EF9A9A' };
      if (isWinner) return { ...base, background: '#E8F5E9', color: '#2E7D32', border: '1px solid #A5D6A7' };
      return { ...base, opacity: 0.45 };
    }
    if (myPick === team) return { ...base, background: '#E3F2FD', color: '#1565C0', border: '1px solid #90CAF9' };
    return base;
  }

  function getResultText(): { text: string; color: string } | null {
    if (match.status === 'FINISHED') {
      if (!myPick) return { text: 'No predijiste', color: '#9E9E9E' };
      return myPick === match.winner
        ? { text: '+100 pts ✓', color: '#2E7D32' }
        : { text: '-50 pts ✗',  color: '#C62828' };
    }
    if (match.status === 'OPEN' && myPick) return { text: 'Predicción guardada ✓', color: '#1565C0' };
    return null;
  }

  const result = getResultText();

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #EEEEEE',
      borderRadius: 14,
      padding: '16px 20px',
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: '#9E9E9E' }}>{match.date} · {match.time}</span>
        <span style={{ ...STATUS_STYLE[match.status], fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
          {STATUS_LABEL[match.status]}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        {[ta, tb].map((team, i) => (
          <React.Fragment key={team.id}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 34, lineHeight: 1 }}>{team.flag}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{team.name}</div>
              {match.status === 'FINISHED' && match.winner === team.id && (
                <span style={{ fontSize: 10, background: '#E8F5E9', color: '#1B5E20', padding: '2px 8px', borderRadius: 12, marginTop: 4, display: 'inline-block' }}>
                  ganador
                </span>
              )}
            </div>
            {i === 0 && <span style={{ fontSize: 11, color: '#BDBDBD', fontWeight: 700, flexShrink: 0 }}>VS</span>}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button style={btnStyle(match.teamA)} onClick={() => isOpen && onPick(match.teamA)} disabled={!isOpen}>
          {ta.flag} {ta.name}
        </button>
        <button style={btnStyle(match.teamB)} onClick={() => isOpen && onPick(match.teamB)} disabled={!isOpen}>
          {tb.flag} {tb.name}
        </button>
      </div>

      {result && (
        <p style={{ textAlign: 'center', fontSize: 12, marginTop: 8, color: result.color, fontWeight: 500 }}>
          {result.text}
        </p>
      )}
    </div>
  );
}
