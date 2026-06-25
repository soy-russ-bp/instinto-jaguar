interface HeaderProps {
  title: string;
  subtitle: string;
  points: number;
  icon?: string;
}

export default function Header({
  title,
  subtitle,
  points,
  icon = '⚽',
}: HeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '20px 0 16px',
      }}
    >
      <div style={{ fontSize: 28 }}>{icon}</div>

      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: '#212121',
            margin: 0,
          }}
        >
          {title}
        </p>

        <p
          style={{
            fontSize: 12,
            color: '#9E9E9E',
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>

      <div style={{ textAlign: 'right' }}>
        <p
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: points >= 0 ? '#2E7D32' : '#C62828',
            margin: 0,
          }}
        >
          {points > 0 ? '+' : ''}
          {points}
        </p>

        <p
          style={{
            fontSize: 11,
            color: '#9E9E9E',
            margin: 0,
          }}
        >
          pts
        </p>
      </div>
    </div>
  );
}