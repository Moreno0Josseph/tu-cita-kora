export default function Home({ onNavigate }) {
  return (
    <section className="home">
      <div className="hero">
        <span className="eyebrow">
          Centro de Nutrición y Estética KORA
        </span>

        <h1>Tu bienestar comienza en KORA</h1>

        <p>
          Agenda tus citas, conoce nuestros servicios
          y lleva el seguimiento de tu bienestar
          desde un solo lugar.
        </p>

        <button
          className="primary-button"
          onClick={() => onNavigate("citas")}
        >
          Agendar una cita
        </button>
      </div>

      <section className="services">
        <h2>Nuestros servicios</h2>

        <div className="service-grid">
          <article className="service-card">
            <h3>Consulta Nutricional</h3>
            <img id="consulta-img" src="../src/img/consulta.png" alt="Consulta Nutricional" />
            <p>Mi objetivo en consulta es que entiendas el porqué de cada cambio y que construyamos juntos un plan pensado para ti, sin dietas extremas sin alimentos prohibidos.</p>
          </article>

          <article className="service-card">
            <h3>Limpieza Facial</h3>
            <img id="limpieza-img" src="../src/img/limpiezafacial.png" alt="Limpieza Facial" />
            <p>Elimina impurezas, células muertas, grasa acumulada y puntos negros para renovar la piel.</p>
          </article>

          <article className="service-card">
            <h3>Dermaplanning Facial</h3>
            <img id="dermaplanning-img" src="../src/img/dermaplanning.png" alt="Dermaplanning Facial" />
            <p>El dermaplaning no solo mejora la textura de la piel, tambien deja ese efecto luminoso que amamos.</p>
          </article>
        </div>
      </section>
    </section>
  );
}
