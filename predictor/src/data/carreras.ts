export * from './carreras';
// types.ts o arriba de tu archivo
export interface Carrera {
  id: string;
  nombre: string;
}

export interface Facultad {
  id: string;
  nombre: string;
  carreras: Carrera[];
}

export const FACULTADES_DATA: Facultad[] = [
  {
    id: 'fmat',
    nombre: 'Matemáticas',
    carreras: [
      { id: 'lis', nombre: 'Lic. en Ingeniería de Software' },
      { id: 'lcc', nombre: 'Lic. en Ciencias de la Computación' },
      { id: 'lic', nombre: 'Lic. en Ingeniería en Computación' },
      { id: 'la', nombre: 'Lic. en Actuaria' },
      { id: 'lem', nombre: 'Lic. en Enseñanza de la Matemática' },
      { id: 'lm', nombre: 'Lic. en Matemáticas' }
    ]
  },
  {
    id: 'fi',
    nombre: 'Facultad de Ingeniería',
    carreras: [
      { id: 'lic', nombre: 'Lic. en Ingeniería Civil' },
      { id: 'lie', nombre: 'Lic. en Ingeniería en Energías Renovables' },
      { id: 'lif', nombre: 'Lic. en Ingeniería Física' },
      { id: 'lim', nombre: 'Lic. en Ingeniería Mecatrónica' },
    ]
  }
];