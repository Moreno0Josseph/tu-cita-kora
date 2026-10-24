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
import { historialesIniciales } from "../data/historiales";
import { evolucionesIniciales } from "../data/evoluciones";



const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [historiales, setHistoriales] = useState(
 historialesIniciales
);

const [evoluciones, setEvoluciones] = useState(
  evolucionesIniciales
);

 const [pacientes, setPacientes] = useState(
  pacientesIniciales
);
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

function registrarPaciente(datos) {
  const cedula = datos.cedula.trim();
  const email = datos.email.trim().toLowerCase();

  if (!/^\d{10}$/.test(cedula)) {
    return {
      valido: false,
      mensaje: "La cédula debe contener 10 dígitos.",
    };
  }

  if (!datos.nombre.trim() || !email) {
    return {
      valido: false,
      mensaje: "El nombre y correo son obligatorios.",
    };
  }

  const existeCedula = pacientes.some(
    (paciente) => paciente.cedula === cedula
  );

  if (existeCedula) {
    return {
      valido: false,
      mensaje: "Ya existe un paciente con esa cédula.",
    };
  }

  const existeEmail = pacientes.some(
    (paciente) => paciente.email.toLowerCase() === email
  );

  if (existeEmail) {
    return {
      valido: false,
      mensaje: "Ya existe un paciente con ese correo.",
    };
  }

  const nuevoPaciente = {
    id: crypto.randomUUID(),
    cedula,
    nombre: datos.nombre.trim(),
    email,
    telefono: datos.telefono.trim(),
  };

  setPacientes((anteriores) => [
    ...anteriores,
    nuevoPaciente,
  ]);

  return {
    valido: true,
    mensaje: "Paciente registrado correctamente.",
  };
}

function editarPaciente(id, datos) {
  const cedula = datos.cedula.trim();
  const email = datos.email.trim().toLowerCase();

  if (
    !/^\d{10}$/.test(cedula) ||
    !datos.nombre.trim() ||
    !email
  ) {
    return {
      valido: false,
      mensaje: "Verifica los datos obligatorios.",
    };
  }

  const duplicado = pacientes.some(
    (paciente) =>
      paciente.id !== id &&
      (paciente.cedula === cedula ||
        paciente.email.toLowerCase() === email)
  );

  if (duplicado) {
    return {
      valido: false,
      mensaje: "La cédula o el correo ya están registrados.",
    };
  }

  setPacientes((anteriores) =>
    anteriores.map((paciente) =>
      paciente.id === id
        ? {
            ...paciente,
            cedula,
            nombre: datos.nombre.trim(),
            email,
            telefono: datos.telefono.trim(),
          }
        : paciente
    )
  );

  return {
    valido: true,
    mensaje: "Paciente actualizado correctamente.",
  };
}


function guardarHistorial(datos) {
  const pacienteExiste = pacientes.some(
    (paciente) => paciente.id === datos.pacienteId
  );

  if (!pacienteExiste) {
    return {
      valido: false,
      mensaje: "Selecciona un paciente válido.",
    };
  }

  const historialExistente = historiales.find(
    (item) => item.pacienteId === datos.pacienteId
  );

  if (historialExistente) {
    setHistoriales((anteriores) =>
      anteriores.map((item) =>
        item.pacienteId === datos.pacienteId
          ? {
              ...item,
              antecedentes: datos.antecedentes.trim(),
              alergias: datos.alergias.trim(),
              objetivo: datos.objetivo.trim(),
            }
          : item
      )
    );
  } else {
    setHistoriales((anteriores) => [
      ...anteriores,
      {
        id: crypto.randomUUID(),
        pacienteId: datos.pacienteId,
        antecedentes: datos.antecedentes.trim(),
        alergias: datos.alergias.trim(),
        objetivo: datos.objetivo.trim(),
      },
    ]);
  }

  return {
    valido: true,
    mensaje: "Ficha clínica guardada correctamente.",
  };
}

function registrarEvolucion(datos) {
  const historial = historiales.find(
    (item) => item.pacienteId === datos.pacienteId
  );

  if (!historial) {
    return {
      valido: false,
      mensaje: "Primero debes crear la ficha clínica.",
    };
  }

  const peso = Number(datos.peso);
  const talla = Number(datos.talla);

  if (
    !datos.fecha ||
    !/^\d{4}-\d{2}-\d{2}$/.test(datos.fecha) ||
    !Number.isFinite(peso) ||
    !Number.isFinite(talla) ||
    peso <= 0 ||
    talla <= 0
  ) {
    return {
      valido: false,
      mensaje: "Verifica la fecha, el peso y la talla.",
    };
  }

  const hoy = new Date();
  const fechaActual = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0"),
  ].join("-");

  if (datos.fecha > fechaActual) {
    return {
      valido: false,
      mensaje: "No puedes registrar una evolución futura.",
    };
  }

  setEvoluciones((anteriores) => [
    ...anteriores,
    {
      id: crypto.randomUUID(),
      historialId: historial.id,
      fecha: datos.fecha,
      peso,
      talla,
      observaciones: datos.observaciones.trim(),
    },
  ]);

  return {
    valido: true,
    mensaje: "Evolución registrada correctamente.",
  };
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
        registrarPaciente,
        editarPaciente,
        historiales,
        evoluciones,
        guardarHistorial,
        registrarEvolucion,

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
