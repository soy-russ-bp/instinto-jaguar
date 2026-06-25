import React from 'react';
import { PROFILES, MATCHES, TEAMS, calcPoints, Prediction } from '../data';

interface TabRankingProps {
  predictions: Prediction[];
  currentUserId: string;
}

const MEDALS = ['🥇', '🥈', '🥉'];

export default function TabRanking({ predictions, currentUserId }: TabRankingProps) {
  const ranked = PROFILES
    .map(p => ({ ...p, pts: calcPoints(p.id, predictions) }))
    .sort((a, b) => b.pts - a.pts);

  const finishedCount = MATCHES.filter(m => m.status === 'FINISHED').length;

  return (
    <div>
      <p style={{ fontSize: 12, color: '#9E9E9E', marginBottom: 14 }}>
        Basado en {finishedCount} partido{finishedCount !== 1 ? 's' : ''} finalizado{finishedCount !== 1 ? 's' : ''}
      </p>
      {ranked.map((profile, i) => {
        const isMe = profile.id === currentUserId;
        return (
          <div key={profile.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: isMe ? '#E3F2FD' : '#fff',
            border: `1px solid ${isMe ? '#90CAF9' : '#EEEEEE'}`,
            borderRadius: 14,
            padding: '12px 16px',
            marginBottom: 8,
          }}>
            <span style={{ fontSize: i < 3 ? 20 : 15, minWidth: 28, textAlign: 'center', color: i < 3 ? undefined : '#BDBDBD', fontWeight: 600 }}>
              {MEDALS[i] ?? i + 1}
            </span>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: profile.avatarColor + '22',
              color: profile.avatarColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>
              {profile.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#212121' }}>
                {profile.nombres} {profile.apellidos}{isMe ? ' (tú)' : ''}
              </p>
              <p style={{ fontSize: 12, color: '#757575', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {profile.carrera} · Sem. {profile.semestre}
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: profile.pts >= 0 ? '#2E7D32' : '#C62828' }}>
                {profile.pts > 0 ? '+' : ''}{profile.pts}
              </span>
              <span style={{ fontSize: 11, color: '#9E9E9E' }}> pts</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
