import { useState } from "react";
import { useData } from "../context/DataContext";

const formularioVacio = {
  cedula: "",
  nombre: "",
  email: "",
  telefono: "",
};

export default function Pacientes() {
  const {
    pacientes,
    citas,
    registrarPaciente,
    editarPaciente,
  } = useData();

  const [formulario, setFormulario] = useState(
    formularioVacio
  );
  const [editandoId, setEditandoId] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const pacientesFiltrados = pacientes.filter(
    (paciente) =>
      paciente.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      paciente.cedula.includes(busqueda)
  );

  function actualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function guardarPaciente(evento) {
    evento.preventDefault();

    const resultado = editandoId !== null
      ? editarPaciente(editandoId, formulario)
      : registrarPaciente(formulario);

    setMensaje(resultado);

    if (resultado.valido) {
      setFormulario({ ...formularioVacio });
      setEditandoId(null);
    }
  }

  function iniciarEdicion(paciente) {
    setEditandoId(paciente.id);
    setFormulario({
      cedula: paciente.cedula,
      nombre: paciente.nombre,
      email: paciente.email,
      telefono: paciente.telefono,
    });
    setMensaje(null);
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setFormulario({ ...formularioVacio });
    setMensaje(null);
  }

  function contarCitas(pacienteId) {
    return citas.filter(
      (cita) => cita.pacienteId === pacienteId
    ).length;
  }

  return (
    <section className="page">
      <h1>Gestión de pacientes</h1>
      <p>
        Administra los registros de pacientes de KORA.
      </p>

      <div className="booking-layout">
        <form
          className="booking-form"
          onSubmit={guardarPaciente}
        >
          <h2>
            {editandoId !== null
              ? "Editar paciente"
              : "Registrar paciente"}
          </h2>

          <label htmlFor="cedula">Cédula</label>
          <input
            id="cedula"
            name="cedula"
            value={formulario.cedula}
            onChange={actualizarCampo}
            maxLength={10}
            required
          />

          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={actualizarCampo}
            required
          />

          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formulario.email}
            onChange={actualizarCampo}
            required
          />

          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            type="tel"
            name="telefono"
            value={formulario.telefono}
            onChange={actualizarCampo}
          />

          <button className="primary-button" type="submit">
            {editandoId !== null
              ? "Guardar cambios"
              : "Registrar paciente"}
          </button>

          {editandoId !== null && (
            <button
              type="button"
              className="secondary-button"
              onClick={cancelarEdicion}
            >
              Cancelar edición
            </button>
          )}

          {mensaje && (
            <p
              role="status"
              className={
                `message ${mensaje.valido ? "exito" : "error"}`
              }
            >
              {mensaje.mensaje}
            </p>
          )}
        </form>

        <div className="booking-list">
          <h2>Pacientes registrados</h2>

          <input
            className="search-input"
            placeholder="Buscar por nombre o cédula..."
            aria-label="Buscar pacientes"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <div className="table-wrapper">
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cédula</th>
                  <th>Correo</th>
                  <th>Citas</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {pacientesFiltrados.map((paciente) => (
                  <tr key={paciente.id}>
                    <td>{paciente.nombre}</td>
                    <td>{paciente.cedula}</td>
                    <td>{paciente.email}</td>
                    <td>{contarCitas(paciente.id)}</td>
                    <td>
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => iniciarEdicion(paciente)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pacientesFiltrados.length === 0 && (
              <p>No se encontraron pacientes.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
