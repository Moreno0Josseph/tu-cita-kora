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
            <h3>Nutrición</h3>
            <p>Asesoría nutricional personalizada.</p>
          </article>

          <article className="service-card">
            <h3>Estética</h3>
            <p>Servicios de cuidado y bienestar.</p>
          </article>

          <article className="service-card">
            <h3>Seguimiento</h3>
            <p>Consulta tus citas y planes alimenticios.</p>
          </article>
        </div>
      </section>
    </section>
  );
}
