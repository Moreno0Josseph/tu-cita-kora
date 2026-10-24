import {
  createContext,
  useContext,
  useState,
} from "react";

import { pacientesIniciales } from "../data/pacientes";
import { nutricionistasIniciales } from "../data/nutricionistas";
import { serviciosIniciales } from "../data/servicios";
import { citasIniciales } from "../data/citas";
import { validarReserva } from "../utils/validaciones";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [pacientes] = useState(pacientesIniciales);
  const [nutricionistas] = useState(
    nutricionistasIniciales
  );
  const [servicios] = useState(serviciosIniciales);
  const [citas, setCitas] = useState(citasIniciales);

  function reservarCita(datos) {
    const resultado = validarReserva(
      datos,
      citas,
      servicios
    );

    if (!resultado.valido) {
      return resultado;
    }

    const nuevaCita = {
      id: crypto.randomUUID(), // Genera un ID único para la cita
      pacienteId: Number(datos.pacienteId),
      nutricionistaId: Number(datos.nutricionistaId),
      servicioId: Number(datos.servicioId),
      fecha: datos.fecha,
      hora: datos.hora,
      estado: "reservada",
    };

    setCitas((anteriores) => [
      ...anteriores,
      nuevaCita,
    ]);

    return {
      valido: true,
      mensaje: "Cita reservada correctamente.",
    };
  }

  function cancelarCita(id) {
    setCitas((anteriores) =>
      anteriores.map((cita) =>
        cita.id === id
          ? { ...cita, estado: "cancelada" }
          : cita
      )
    );
  }

  return (
    <DataContext.Provider
      value={{
        pacientes,
        nutricionistas,
        servicios,
        citas,
        reservarCita,
        cancelarCita,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error(
      "useData debe utilizarse dentro de DataProvider"
    );
  }

  return context;
}
