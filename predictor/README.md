# Predictor Mundial 2026 — MVP

React + TypeScript + Vite. Sin dependencias extras.

## Correr en local

```bash
npm install
npm run dev
```

## Estructura

```
src/
  data/index.ts          # Tipos, datos fake, lógica de puntos
  hooks/usePredictions.ts # Estado de predicciones
  components/
    MatchCard.tsx         # Tarjeta de partido con botones de predicción
    TabPartidos.tsx       # Vista de partidos (OPEN / CLOSED / FINISHED)
    TabRanking.tsx        # Ranking por puntos
    TabPerfil.tsx         # Perfil y mis predicciones
  App.tsx                 # Shell: nav, header, toast
  main.tsx                # Entry point
```

## Lógica de puntos

| Resultado       | Puntos |
|-----------------|--------|
| Predicción correcta | +100 |
| Predicción incorrecta | -50 |
| Sin predicción  | 0      |

## Próximos pasos (con DB real)

1. Reemplaza `src/data/index.ts` con llamadas a tu API (`/api/matches`, `/api/predictions`).
2. Reemplaza `usePredictions` con fetch + optimistic updates.
3. `CURRENT_USER` pasa a venir del contexto de autenticación.

## Schema SQL sugerido

Ver respuesta del asistente o crear tablas: `profiles`, `teams`, `matches`, `predictions`.
