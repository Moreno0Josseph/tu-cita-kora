import { useState } from "react";
import { useData } from "../context/DataContext";
import { calcularIMC } from "../utils/calculosClinicos";

const fichaVacia = {
  antecedentes: "",
  alergias: "",
  objetivo: "",
};

const evolucionVacia = {
  fecha: "",
  peso: "",
  talla: "",
  observaciones: "",
};

export default function HistorialClinico() {
  const {
    pacientes,
    historiales,
    evoluciones,
    guardarHistorial,
    registrarEvolucion,
  } = useData();

  const [pacienteId, setPacienteId] = useState("");
  const [ficha, setFicha] = useState(fichaVacia);
  const [evolucion, setEvolucion] = useState(
    evolucionVacia
  );
  const [mensaje, setMensaje] = useState(null);

  const historial = historiales.find(
    (item) => String(item.pacienteId) === pacienteId
  );

  const registros = evoluciones
    .filter((item) => item.historialId === historial?.id)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  function seleccionarPaciente(evento) {
    const id = evento.target.value;

    const existente = historiales.find(
      (item) => String(item.pacienteId) === id
    );

    setPacienteId(id);
    setFicha(
      existente
        ? {
            antecedentes: existente.antecedentes,
            alergias: existente.alergias,
            objetivo: existente.objetivo,
          }
        : { ...fichaVacia }
    );

    setEvolucion({ ...evolucionVacia });
    setMensaje(null);
  }

  function guardarFicha(evento) {
    evento.preventDefault();

    const paciente = pacientes.find(
      (item) => String(item.id) === pacienteId
    );

    const resultado = guardarHistorial({
      ...ficha,
      pacienteId: paciente?.id,
    });

    setMensaje(resultado);
  }

  function guardarEvolucion(evento) {
    evento.preventDefault();

    const paciente = pacientes.find(
      (item) => String(item.id) === pacienteId
    );

    const resultado = registrarEvolucion({
      ...evolucion,
      pacienteId: paciente?.id,
    });

    setMensaje(resultado);

    if (resultado.valido) {
      setEvolucion({ ...evolucionVacia });
    }
  }

  return (
    <section className="page">
      <h1>Historial clínico y evolución</h1>
      <p>
        Gestiona fichas clínicas y registros
        de seguimiento nutricional.
      </p>

      <div className="clinical-selector">
        <label htmlFor="pacienteClinico">
          Seleccionar paciente
        </label>

        <select
          id="pacienteClinico"
          value={pacienteId}
          onChange={seleccionarPaciente}
        >
          <option value="">Seleccionar paciente</option>
          {pacientes.map((paciente) => (
            <option
              key={paciente.id}
              value={paciente.id}
            >
              {paciente.nombre}
            </option>
          ))}
        </select>
      </div>

      {pacienteId && (
        <>
          <div className="clinical-grid">
            <form
              className="booking-form"
              onSubmit={guardarFicha}
            >
              <h2>Ficha clínica</h2>

              <label htmlFor="antecedentes">
                Antecedentes
              </label>
              <textarea
                id="antecedentes"
                value={ficha.antecedentes}
                onChange={(e) =>
                  setFicha({
                    ...ficha,
                    antecedentes: e.target.value,
                  })
                }
                rows={3}
              />

              <label htmlFor="alergias">
                Alergias
              </label>
              <textarea
                id="alergias"
                value={ficha.alergias}
                onChange={(e) =>
                  setFicha({
                    ...ficha,
                    alergias: e.target.value,
                  })
                }
                rows={3}
              />

              <label htmlFor="objetivo">
                Objetivo nutricional
              </label>
              <textarea
                id="objetivo"
                value={ficha.objetivo}
                onChange={(e) =>
                  setFicha({
                    ...ficha,
                    objetivo: e.target.value,
                  })
                }
                rows={3}
              />

              <button
                type="submit"
                className="primary-button"
              >
                Guardar ficha clínica
              </button>
            </form>

            <form
              className="booking-form"
              onSubmit={guardarEvolucion}
            >
              <h2>Nueva evolución</h2>

              {!historial && (
                <p>
                  Primero guarda la ficha clínica
                  para registrar mediciones.
                </p>
              )}

              <label htmlFor="fechaEvolucion">
                Fecha
              </label>
              <input
                id="fechaEvolucion"
                type="date"
                required
                value={evolucion.fecha}
                onChange={(e) =>
                  setEvolucion({
                    ...evolucion,
                    fecha: e.target.value,
                  })
                }
              />

              <label htmlFor="peso">
                Peso (kg)
              </label>
              <input
                id="peso"
                type="number"
                min="0.1"
                step="0.1"
                required
                value={evolucion.peso}
                onChange={(e) =>
                  setEvolucion({
                    ...evolucion,
                    peso: e.target.value,
                  })
                }
              />

              <label htmlFor="talla">
                Talla (cm)
              </label>
              <input
                id="talla"
                type="number"
                min="0.1"
                step="0.1"
                required
                value={evolucion.talla}
                onChange={(e) =>
                  setEvolucion({
                    ...evolucion,
                    talla: e.target.value,
                  })
                }
              />

              <label htmlFor="observaciones">
                Observaciones
              </label>
              <textarea
                id="observaciones"
                rows={3}
                value={evolucion.observaciones}
                onChange={(e) =>
                  setEvolucion({
                    ...evolucion,
                    observaciones: e.target.value,
                  })
                }
              />

              <button
                type="submit"
                className="primary-button"
                disabled={!historial}
              >
                Registrar evolución
              </button>
            </form>
          </div>

          {mensaje && (
            <p
              role="status"
              className={`message ${
                mensaje.valido ? "exito" : "error"
              }`}
            >
              {mensaje.mensaje}
            </p>
          )}

          <section className="booking-list clinical-history">
            <h2>Historial de evolución</h2>

            {registros.length === 0 ? (
              <p>No existen evoluciones registradas.</p>
            ) : (
              <div className="table-wrapper">
                <table className="appointments-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Peso (kg)</th>
                      <th>Talla (cm)</th>
                      <th>IMC</th>
                      <th>Observaciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {registros.map((registro) => (
                      <tr key={registro.id}>
                        <td>{registro.fecha}</td>
                        <td>{registro.peso}</td>
                        <td>{registro.talla}</td>
                        <td>
                          {calcularIMC(
                            registro.peso,
                            registro.talla
                          )}
                        </td>
                        <td>{registro.observaciones}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </section>
  );
}
