import { useState } from 'react';
import { calcPoints } from '../../data';
import { usePredictions } from '../../hooks/usePredictions';
import TabPartidos from '../../components/TabPartidos';

const CURRENT_USER = 'p1';

interface HeaderProps {
  pts: number;
}

interface Toast {
  msg: string;
  ok: boolean;
  id: number;
}

export default function MatchesPage() {
  const { predictions, getPick, togglePick } = usePredictions(CURRENT_USER);
  const myPts = calcPoints(CURRENT_USER, predictions);

  const [toast, setToast] = useState<Toast | null>(null);

  function showToast(msg: string, ok: boolean) {
    setToast({
      msg,
      ok,
      id: Date.now(),
    });

    setTimeout(() => setToast(null), 2200);
  }

  return (
    <>
      <div
        style={{
          maxWidth: 480,
          margin: '0 auto',
          padding: '16px 16px 80px',
        }}
      >
        <Header pts={myPts} />

        <TabPartidos
          currentUserId={CURRENT_USER}
          predictions={predictions}
          getPick={getPick}
          togglePick={togglePick}
          onToast={showToast}
        />
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 72,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#fff',
            border: `1px solid ${toast.ok ? '#A5D6A7' : '#EF9A9A'}`,
            color: toast.ok ? '#2E7D32' : '#C62828',
            borderRadius: 24,
            padding: '10px 22px',
            fontSize: 13,
            fontWeight: 600,
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            whiteSpace: 'nowrap',
            zIndex: 1000,
          }}
        >
          {toast.msg}
        </div>
      )}
    </>
  );
}

function Header({ pts }: HeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}
    >
      <h3 style={{ margin: 0 }}>Partidos</h3>
      <b>{pts} pts</b>
    </div>
  );
}