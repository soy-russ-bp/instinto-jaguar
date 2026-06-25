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
      { id: 'cc', nombre: 'Lic. en Ciencias de la Computación' },
      { id: 'mat', nombre: 'Lic. en Matemáticas' },
      { id: 'act', nombre: 'Lic. en Actuaria' }
    ]
  },
  {
    id: 'feca',
    nombre: 'Contaduría y Administración',
    carreras: [
      { id: 'la', nombre: 'Lic. en Administración' },
      { id: 'cp', nombre: 'Lic. en Contador Público' }
    ]
  }
];