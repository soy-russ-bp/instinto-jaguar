import { usePredictions } from '../../hooks/usePredictions';
import TabPerfil from '../../components/TabPerfil';
import Header from '../../components/Header';
import { calcPoints } from '../../data';

const CURRENT_USER = 'p1';

export default function profilePage() {
  const { predictions } = usePredictions(CURRENT_USER);
  const myPts = calcPoints(CURRENT_USER, predictions);

  return (

    
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      <Header title="Perfil" subtitle="Predictor Mundial 2026" points={myPts} />
      <TabPerfil predictions={predictions} currentUserId={CURRENT_USER} />
    </div>
  );
}