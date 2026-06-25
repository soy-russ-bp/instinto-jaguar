import MatchCard from "@/components/MatchCard";
// Estos datos deberían venir de una API, pero por ahora los usaremos de matches.json
import partidos from "@/data/matches.json";
import getFilteredMatches from "@/services/matches.service";
import { validateHeaderName } from "http";

export default function PredictionsPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <header>
        <div>
          <h1>Predicciones</h1>
          <p>Selecciona el resultado que crees que ocurrirá.</p>
        </div>

        {/* Esta sección es para mostrar el puntaje del usuario y un botón 
        para ver el ranking general. estará a la derecha */}

        <div>
          <h2>+10 puntos</h2>
          <button>
            Ranking
          </button>
        </div>

      </header>

      <section
        style={{
          display: "grid",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {/* Aquí se renderizan las tarjetas de los partidos, 
        tendrá filtros partidos del día, futuros, cerrados, ganados, perdidos y todos */ }
        <input list="filtros" placeholder="Filtrar partidos..." />
        <datalist id="filtros">
          <option value="Partidos del día" />
          <option value="Futuros" />
          <option value="Cerrados" />
          <option value="Ganados" />
          <option value="Perdidos" />
          <option value="Todos" />
        </datalist>

        
        {getFilteredMatches(filtros.value).map((partido) => (
          <MatchCard key={partido.id} partido={partido} />
        ))}
      </section>
    </main>
  );
}
  