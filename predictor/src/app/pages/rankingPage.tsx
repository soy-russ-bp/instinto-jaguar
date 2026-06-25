import { usePredictions } from '../../hooks/usePredictions';
import TabRanking from '../../components/TabRanking';

const CURRENT_USER = 'p1';

export default function RankingPage() {
  const { predictions } = usePredictions(CURRENT_USER);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      <h3>Ranking</h3>
      <TabRanking predictions={predictions} currentUserId={CURRENT_USER} />
    </div>
  );
}