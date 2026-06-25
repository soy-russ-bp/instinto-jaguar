import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './app/layout/MainLayout';

import MatchesPage from './app/pages/matchesPage';
import RankingPage from './app/pages/rankingPage';
import ProfilePage from './app/pages/profilePage';

import { RegisterForm } from './app/pages/auth/register/registerForm';

export default function App() {
  return (
    <Routes>
      {/* Redirección inicial */}
      <Route path="/" element={<Navigate to="/partidos" replace />} />

      {/* Todas estas páginas usan el mismo layout */}
      <Route element={<MainLayout />}>
        <Route path="/partidos" element={<MatchesPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Route>

      {/* Register NO usa el layout principal */}
      <Route path="/register" element={<RegisterForm />} />

      {/* Página no encontrada */}
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}



// import React, { useState, useEffect } from 'react';
// import { calcPoints } from './data';
// import { usePredictions } from './hooks/usePredictions';
// import TabPartidos from './components/TabPartidos';
// import TabRanking from './components/TabRanking';
// import TabPerfil from './components/TabPerfil';

// type Tab = 'partidos' | 'ranking' | 'perfil';
// const CURRENT_USER = 'p1';

// interface Toast { msg: string; ok: boolean; id: number }

// export default function App() {
//   const [tab, setTab] = useState<Tab>('partidos');
//   const [toast, setToast] = useState<Toast | null>(null);
//   const { predictions, getPick, togglePick } = usePredictions(CURRENT_USER);

//   useEffect(() => {
//     if (!toast) return;
//     const t = setTimeout(() => setToast(null), 2200);
//     return () => clearTimeout(t);
//   }, [toast]);

//   function showToast(msg: string, ok: boolean) {
//     setToast({ msg, ok, id: Date.now() });
//   }

//   const myPts = calcPoints(CURRENT_USER, predictions);

//   const navItems: { key: Tab; label: string; icon: string }[] = [
//     { key: 'partidos', label: 'Partidos', icon: '⚽' },
//     { key: 'ranking',  label: 'Ranking',  icon: '🏆' },
//     { key: 'perfil',   label: 'Mi perfil', icon: '👤' },
//   ];

// styles:
//   return (
//     <div style={{ minHeight: '100vh', background: '#F8F8F8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
//       <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 80px' }}>

//         {/* Header */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 0 16px' }}>
//           <div style={{ fontSize: 28 }}>⚽</div>
//           <div style={{ flex: 1 }}>
//             <p style={{ fontSize: 17, fontWeight: 700, color: '#212121', margin: 0 }}>Predictor Mundial 2026</p>
//             <p style={{ fontSize: 12, color: '#9E9E9E', margin: 0 }}>Carlos Mendoza</p>
//           </div>
//           <div style={{ textAlign: 'right' }}>
//             <p style={{ fontSize: 20, fontWeight: 700, color: myPts >= 0 ? '#2E7D32' : '#C62828', margin: 0 }}>
//               {myPts > 0 ? '+' : ''}{myPts}
//             </p>
//             <p style={{ fontSize: 11, color: '#9E9E9E', margin: 0 }}>pts</p>
//           </div>
//         </div>

//         {/* Content */}
//         {tab === 'partidos' && (
//           <TabPartidos
//             currentUserId={CURRENT_USER}
//             predictions={predictions}
//             getPick={getPick}
//             togglePick={togglePick}
//             onToast={showToast}
//           />
//         )}
//         {tab === 'ranking' && (
//           <TabRanking predictions={predictions} currentUserId={CURRENT_USER} />
//         )}
//         {tab === 'perfil' && (
//           <TabPerfil predictions={predictions} currentUserId={CURRENT_USER} />
//         )}
//       </div>

//       {/* Bottom nav */}
//       <div style={{
//         position: 'fixed', 
//         bottom: 0, 
//         left: '50%', // 1. Lo mueve al 50% de la pantalla
//         transform: 'translateX(-50%)', // 2. Lo retrocede la mitad de su propio ancho
//         background: '#fff',
//         borderTop: '1px solid #EEEEEE',
//         display: 'flex',
//         width: '100%', // Asegura que responda bien si es menor a 480px
//         maxWidth: 480,
//       }}>
//         {navItems.map(item => (
//           <button
//             key={item.key}
//             onClick={() => setTab(item.key)}
//             style={{
//               flex: 1,
//               padding: '12px 0',
//               background: 'transparent',
//               border: 'none',
//               cursor: 'pointer',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: 3,
//               borderTop: tab === item.key ? '2px solid #1565C0' : '2px solid transparent',
//             }}
//           >
//             <span style={{ fontSize: 20 }}>{item.icon}</span>
//             <span style={{ fontSize: 11, fontWeight: 600, color: tab === item.key ? '#1565C0' : '#9E9E9E' }}>
//               {item.label}
//             </span>
//           </button>
//         ))}
//       </div>

//       {/* Toast */}
//       {toast && (
//         <div style={{
//           position: 'fixed',
//           bottom: 72,
//           left: '50%',
//           transform: 'translateX(-50%)',
//           background: '#fff',
//           border: `1px solid ${toast.ok ? '#A5D6A7' : '#EF9A9A'}`,
//           color: toast.ok ? '#2E7D32' : '#C62828',
//           borderRadius: 24,
//           padding: '10px 22px',
//           fontSize: 13,
//           fontWeight: 600,
//           boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
//           whiteSpace: 'nowrap',
//           zIndex: 1000,
//           animation: 'fadeIn 0.2s ease',
//         }}>
//           {toast.msg}
//         </div>
//       )}

//       <style>{`
//         @keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
//         * { box-sizing: border-box; }
//         button { font-family: inherit; }
//       `}</style>
//     </div>
//   );
// }
