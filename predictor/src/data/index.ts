export type TeamId = 'MEX' | 'BRA' | 'ARG' | 'FRA' | 'ESP' | 'GER' | 'USA' | 'POR';
export type MatchStatus = 'OPEN' | 'CLOSED' | 'FINISHED';

export interface Team {
  id: TeamId;
  name: string;
  flag: string;
  country: string;
}

export interface Match {
  id: string;
  teamA: TeamId;
  teamB: TeamId;
  date: string;
  time: string;
  status: MatchStatus;
  winner: TeamId | null;
}

export interface Profile {
  id: string;
  correo: string;
  nombres: string;
  apellidos: string;
  carrera: string;
  semestre: number;
  instagram?: string;
  initials: string;
  avatarColor: string;
}

export interface Prediction {
  profileId: string;
  matchId: string;
  pick: TeamId;
}

export const TEAMS: Record<TeamId, Team> = {
  MEX: { id: 'MEX', name: 'México',    flag: '🇲🇽', country: 'México' },
  BRA: { id: 'BRA', name: 'Brasil',    flag: '🇧🇷', country: 'Brasil' },
  ARG: { id: 'ARG', name: 'Argentina', flag: '🇦🇷', country: 'Argentina' },
  FRA: { id: 'FRA', name: 'Francia',   flag: '🇫🇷', country: 'Francia' },
  ESP: { id: 'ESP', name: 'España',    flag: '🇪🇸', country: 'España' },
  GER: { id: 'GER', name: 'Alemania',  flag: '🇩🇪', country: 'Alemania' },
  USA: { id: 'USA', name: 'EE.UU.',    flag: '🇺🇸', country: 'Estados Unidos' },
  POR: { id: 'POR', name: 'Portugal',  flag: '🇵🇹', country: 'Portugal' },
};

export const MATCHES: Match[] = [
  { id: 'm1', teamA: 'MEX', teamB: 'BRA', date: '15/06/2026', time: '18:00', status: 'FINISHED', winner: 'BRA' },
  { id: 'm2', teamA: 'ARG', teamB: 'FRA', date: '16/06/2026', time: '20:00', status: 'FINISHED', winner: 'ARG' },
  { id: 'm3', teamA: 'ESP', teamB: 'GER', date: '17/06/2026', time: '18:00', status: 'FINISHED', winner: 'ESP' },
  { id: 'm4', teamA: 'USA', teamB: 'POR', date: '18/06/2026', time: '16:00', status: 'CLOSED',   winner: null },
  { id: 'm5', teamA: 'MEX', teamB: 'ARG', date: '22/06/2026', time: '20:00', status: 'OPEN',     winner: null },
  { id: 'm6', teamA: 'BRA', teamB: 'ESP', date: '23/06/2026', time: '18:00', status: 'OPEN',     winner: null },
];

export const PROFILES: Profile[] = [
  { id: 'p1', correo: 'A22216363@alumnos.uady.mx', nombres: 'Carlos',  apellidos: 'Mendoza',  carrera: 'Ing. en Software',    semestre: 6, instagram: 'carlos.mx', initials: 'CM', avatarColor: '#1565C0' },
  { id: 'p2', correo: 'A22109847@alumnos.uady.mx', nombres: 'Valeria', apellidos: 'Rosas',    carrera: 'Lic. en Matemáticas', semestre: 4, initials: 'VR', avatarColor: '#880E4F' },
  { id: 'p3', correo: 'A21304512@alumnos.uady.mx', nombres: 'Diego',   apellidos: 'Herrera',  carrera: 'Ing. Industrial',     semestre: 8, initials: 'DH', avatarColor: '#1B5E20' },
  { id: 'p4', correo: 'A22871234@alumnos.uady.mx', nombres: 'Sofía',   apellidos: 'Pérez',    carrera: 'Lic. en Economía',    semestre: 5, initials: 'SP', avatarColor: '#E65100' },
  { id: 'p5', correo: 'A20556789@alumnos.uady.mx', nombres: 'Luis',    apellidos: 'Castillo', carrera: 'Ing. en Sistemas',    semestre: 7, initials: 'LC', avatarColor: '#4527A0' },
];

export const INITIAL_PREDICTIONS: Prediction[] = [
  { profileId: 'p1', matchId: 'm1', pick: 'BRA' },
  { profileId: 'p1', matchId: 'm2', pick: 'ARG' },
  { profileId: 'p1', matchId: 'm3', pick: 'GER' },
  { profileId: 'p1', matchId: 'm4', pick: 'USA' },
  { profileId: 'p2', matchId: 'm1', pick: 'MEX' },
  { profileId: 'p2', matchId: 'm2', pick: 'FRA' },
  { profileId: 'p2', matchId: 'm3', pick: 'ESP' },
  { profileId: 'p2', matchId: 'm4', pick: 'POR' },
  { profileId: 'p3', matchId: 'm1', pick: 'BRA' },
  { profileId: 'p3', matchId: 'm2', pick: 'ARG' },
  { profileId: 'p3', matchId: 'm3', pick: 'ESP' },
  { profileId: 'p4', matchId: 'm1', pick: 'BRA' },
  { profileId: 'p4', matchId: 'm2', pick: 'FRA' },
  { profileId: 'p4', matchId: 'm3', pick: 'ESP' },
  { profileId: 'p4', matchId: 'm4', pick: 'USA' },
  { profileId: 'p5', matchId: 'm1', pick: 'MEX' },
  { profileId: 'p5', matchId: 'm2', pick: 'ARG' },
  { profileId: 'p5', matchId: 'm3', pick: 'GER' },
];

export const POINTS_CORRECT = 100;
export const POINTS_WRONG = -50;

export function calcPoints(profileId: string, predictions: Prediction[]): number {
  return MATCHES.reduce((total, match) => {
    if (match.status !== 'FINISHED' || !match.winner) return total;
    const pred = predictions.find(p => p.profileId === profileId && p.matchId === match.id);
    if (!pred) return total;
    return total + (pred.pick === match.winner ? POINTS_CORRECT : POINTS_WRONG);
  }, 0);
}
