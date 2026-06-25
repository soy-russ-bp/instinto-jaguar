import React from 'react';
import { PROFILES, MATCHES, TEAMS, calcPoints, Prediction } from '../data';

interface TabPerfilProps {
  predictions: Prediction[];
  currentUserId: string;
}

export default function TabPerfil({ predictions, currentUserId }: TabPerfilProps) {
  const me = PROFILES.find(p => p.id === currentUserId)!;
  const pts = calcPoints(currentUserId, predictions);
  const myPreds = predictions.filter(p => p.profileId === currentUserId);

  const finished = MATCHES.filter(m => m.status === 'FINISHED');
  const predicted = finished.filter(m => myPreds.find(p => p.matchId === m.id));
  const correct = predicted.filter(m => myPreds.find(p => p.matchId === m.id)?.pick === m.winner);

  const allRanked = PROFILES
    .map(p => ({ id: p.id, pts: calcPoints(p.id, predictions) }))
    .sort((a, b) => b.pts - a.pts);
  const myRank = allRanked.findIndex(p => p.id === currentUserId) + 1;

  const statStyle: React.CSSProperties = {
    background: '#F5F5F5',
    borderRadius: 10,
    padding: '12px 8px',
    textAlign: 'center',
    flex: 1,
  };

  return (
    <div>
      <div style={{ background: '#fff', border: '1px solid #EEEEEE', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 54, height: 54, borderRadius: '50%',
            background: me.avatarColor + '22', color: me.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 700, flexShrink: 0,
          }}>
            {me.initials}
          </div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#212121' }}>{me.nombres} {me.apellidos}</p>
            <p style={{ fontSize: 13, color: '#757575' }}>{me.carrera} · Semestre {me.semestre}</p>
            <p style={{ fontSize: 12, color: '#BDBDBD' }}>{me.correo}</p>
            {me.instagram && (
              <p style={{ fontSize: 12, color: '#9C27B0' }}>@{me.instagram}</p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <div style={statStyle}>
            <div style={{ fontSize: 22, fontWeight: 700, color: pts >= 0 ? '#2E7D32' : '#C62828' }}>
              {pts > 0 ? '+' : ''}{pts}
            </div>
            <div style={{ fontSize: 11, color: '#9E9E9E', marginTop: 2 }}>puntos</div>
          </div>
          <div style={statStyle}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#212121' }}>
              {correct.length}/{predicted.length}
            </div>
            <div style={{ fontSize: 11, color: '#9E9E9E', marginTop: 2 }}>aciertos</div>
          </div>
          <div style={statStyle}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1565C0' }}>#{myRank}</div>
            <div style={{ fontSize: 11, color: '#9E9E9E', marginTop: 2 }}>posición</div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 11, fontWeight: 700, color: '#9E9E9E', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
        Mis predicciones
      </p>

      {myPreds.length === 0 ? (
        <p style={{ fontSize: 13, color: '#BDBDBD', textAlign: 'center', padding: '24px 0' }}>
          No has hecho predicciones aún.
        </p>
      ) : (
        MATCHES.map(m => {
          const pred = myPreds.find(p => p.matchId === m.id);
          if (!pred) return null;
          const team = TEAMS[pred.pick];
          let resultText = '';
          let resultColor = '#9E9E9E';
          if (m.status === 'FINISHED') {
            if (pred.pick === m.winner) { resultText = '+100 pts ✓'; resultColor = '#2E7D32'; }
            else { resultText = '-50 pts ✗'; resultColor = '#C62828'; }
          } else {
            resultText = 'pendiente';
          }
          return (
            <div key={m.id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#FAFAFA', borderRadius: 10, padding: '10px 14px', marginBottom: 8,
              fontSize: 13,
            }}>
              <span style={{ fontSize: 20 }}>{team.flag}</span>
              <span style={{ flex: 1, color: '#424242' }}>
                {TEAMS[m.teamA].name} vs {TEAMS[m.teamB].name}
              </span>
              <span style={{ color: '#757575' }}>→ {team.name}</span>
              <span style={{ color: resultColor, fontWeight: 600, minWidth: 70, textAlign: 'right' }}>{resultText}</span>
            </div>
          );
        })
      )}
    </div>
  );
}
