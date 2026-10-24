import { useState } from "react";
import { useData } from "../context/DataContext";

const formularioInicial = {
  pacienteId: "",
  nutricionistaId: "",
  servicioId: "",
  fecha: "",
  hora: "",
};

export default function Citas() {
  const {
    pacientes,
    nutricionistas,
    servicios,
    citas,
    reservarCita,
    cancelarCita,
  } = useData();

  const [formulario, setFormulario] =
    useState(formularioInicial);

  const [mensaje, setMensaje] = useState(null);

  function actualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function manejarReserva(evento) {
    evento.preventDefault();

    const resultado = reservarCita(formulario);

    setMensaje({
      texto: resultado.mensaje,
      tipo: resultado.valido ? "exito" : "error",
    });

    if (resultado.valido) {
      setFormulario({ ...formularioInicial });
    }
  }

  function manejarCancelacion(id) {
    cancelarCita(id);

    setMensaje({
      texto: "La cita fue cancelada correctamente.",
      tipo: "exito",
    });
  }

  function obtenerNombre(lista, id) {
    return lista.find((item) => item.id === id)?.nombre
      ?? "No encontrado";
  }

  return (
    <section className="page">
      <h1>Gestión de citas</h1>
      <p>
        Reserva y administra citas de manera sencilla.
      </p>

      <div className="booking-layout">
        <form
          className="booking-form"
          onSubmit={manejarReserva}
        >
          <h2>Nueva reserva</h2>

          <label htmlFor="pacienteId">
            Paciente
          </label>
          <select
            id="pacienteId"
            name="pacienteId"
            value={formulario.pacienteId}
            onChange={actualizarCampo}
            required
          >
            <option value="">Seleccionar paciente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nombre}
              </option>
            ))}
          </select>

          <label htmlFor="nutricionistaId">
            Nutricionista
          </label>
          <select
            id="nutricionistaId"
            name="nutricionistaId"
            value={formulario.nutricionistaId}
            onChange={actualizarCampo}
            required
          >
            <option value="">Seleccionar nutricionista</option>
            {nutricionistas.map((nutricionista) => (
              <option
                key={nutricionista.id}
                value={nutricionista.id}
              >
                {nutricionista.nombre}
              </option>
            ))}
          </select>

          <label htmlFor="servicioId">
            Servicio
          </label>
          <select
            id="servicioId"
            name="servicioId"
            value={formulario.servicioId}
            onChange={actualizarCampo}
            required
          >
            <option value="">Seleccionar servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio.id} value={servicio.id}>
                {servicio.nombre} - ${servicio.precio}
              </option>
            ))}
          </select>

          <label htmlFor="fecha">
            Fecha
          </label>
          <input
            id="fecha"
            type="date"
            name="fecha"
            value={formulario.fecha}
            onChange={actualizarCampo}
            required
          />

          <label htmlFor="hora">
            Hora
          </label>
          <input
            id="hora"
            type="time"
            name="hora"
            value={formulario.hora}
            onChange={actualizarCampo}
            required
          />

          <button
            className="primary-button"
            type="submit"
          >
            Confirmar reserva
          </button>
        </form>

        <div className="booking-list">
          <h2>Citas registradas</h2>

          {citas.length === 0 ? (
            <p>No existen citas registradas.</p>
          ) : (
            <div className="table-wrapper">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Nutricionista</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {citas.map((cita) => (
                    <tr key={cita.id}>
                      <td>
                        {obtenerNombre(
                          pacientes,
                          cita.pacienteId
                        )}
                      </td>
                      <td>
                        {obtenerNombre(
                          nutricionistas,
                          cita.nutricionistaId
                        )}
                      </td>
                      <td>
                        {obtenerNombre(
                          servicios,
                          cita.servicioId
                        )}
                      </td>
                      <td>{cita.fecha}</td>
                      <td>{cita.hora}</td>
                      <td>
                        <span className={
                          `status ${cita.estado}`
                        }>
                          {cita.estado}
                        </span>
                      </td>
                      <td>
                        {cita.estado !== "cancelada" && (
                          <button
                            type="button"
                            className="cancel-button"
                            onClick={() =>
                              manejarCancelacion(cita.id)
                            }
                          >
                            Cancelar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {mensaje && (
        <p
          role="status"
          className={`message ${mensaje.tipo}`}
        >
          {mensaje.texto}
        </p>
      )}
    </section>
  );
}
