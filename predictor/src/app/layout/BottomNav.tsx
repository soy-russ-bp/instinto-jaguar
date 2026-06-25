import { NavLink } from 'react-router-dom';

const navItems = [
  {
    to: '/partidos',
    label: 'Partidos',
    icon: '⚽',
  },
  {
    to: '/ranking',
    label: 'Ranking',
    icon: '🏆',
  },
  {
    to: '/perfil',
    label: 'Mi perfil',
    icon: '👤',
  },
];

export default function BottomNav() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 480,
        display: 'flex',
        borderTop: '1px solid #eee',
        background: '#fff',
      }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            flex: 1,
            padding: '12px 0',
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            color: isActive ? '#1565C0' : '#9E9E9E',
            borderTop: isActive
              ? '2px solid #1565C0'
              : '2px solid transparent',
          })}
        >
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          <span style={{ fontSize: 11, fontWeight: 600 }}>
            {item.label}
          </span>
        </NavLink>
      ))}
    </div>
  );
}