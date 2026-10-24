import { useData } from "../context/DataContext";

export default function Dashboard() {
  const {
    pacientes,
    nutricionistas,
    servicios,
    citas,
  } = useData();

  const totalCitas = citas.length;

  const citasReservadas = citas.filter(
    (cita) => cita.estado === "reservada"
  ).length;

  const citasCanceladas = citas.filter(
    (cita) => cita.estado === "cancelada"
  ).length;

  const ingresosPotenciales = citas
    .filter((cita) => cita.estado === "reservada")
    .reduce((total, cita) => {
      const servicio = servicios.find(
        (item) => item.id === cita.servicioId
      );

      return total + (servicio?.precio ?? 0);
    }, 0);

  const indicadores = [
    {
      titulo: "Pacientes registrados",
      valor: pacientes.length,
    },
    {
      titulo: "Nutricionistas",
      valor: nutricionistas.length,
    },
    {
      titulo: "Citas totales",
      valor: totalCitas,
    },
    {
      titulo: "Citas reservadas",
      valor: citasReservadas,
    },
    {
      titulo: "Citas canceladas",
      valor: citasCanceladas,
    },
    {
      titulo: "Ingresos potenciales",
      valor: `$${ingresosPotenciales.toFixed(2)}`, 
    },
  ];

  return (
    <section className="page">
      <h1>Dashboard administrativo</h1>
      <p>
        Indicadores del prototipo de Tu Cita Kora.
      </p>

      <div className="dashboard-grid">
        {indicadores.map((indicador) => (
          <article
            className="dashboard-card"
            key={indicador.titulo}
          >
            <h3>{indicador.titulo}</h3>
            <p>{indicador.valor}</p>
          </article>
        ))}
      </div>

      <section className="dashboard-summary">
        <h2>Resumen de citas</h2>

        <div className="summary-row">
          <span>Reservadas</span>
          <strong>{citasReservadas}</strong>
        </div>

        <div className="summary-row">
          <span>Canceladas</span>
          <strong>{citasCanceladas}</strong>
        </div>

        <div className="summary-row">
          <span>Total</span>
          <strong>{totalCitas}</strong>
        </div>
      </section>
    </section>
  );
}
