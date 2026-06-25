import { usePredictions } from '../../hooks/usePredictions';
import TabPerfil from '../../components/TabPerfil';

const CURRENT_USER = 'p1';

export default function profilePage() {
  const { predictions } = usePredictions(CURRENT_USER);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      <h3>Perfil</h3>
      <TabPerfil predictions={predictions} currentUserId={CURRENT_USER} />
    </div>
  );
}