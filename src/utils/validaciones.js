export function convertirFechaHora(fecha, hora) {
  return new Date(`${fecha}T${hora}:00`);
}

export function validarReserva(
  nuevaCita,
  citasExistentes,
  servicios
) {
  const {
    pacienteId,
    nutricionistaId,
    servicioId,
    fecha,
    hora,
  } = nuevaCita;

  if (
    !pacienteId ||
    !nutricionistaId ||
    !servicioId ||
    !fecha ||
    !hora
  ) {
    return {
      valido: false,
      mensaje: "Todos los campos son obligatorios.",
    };
  }

  const servicio = servicios.find(
    (item) => item.id === Number(servicioId)
  );

  if (!servicio) {
    return {
      valido: false,
      mensaje: "El servicio seleccionado no existe.",
    };
  }

  const inicio = convertirFechaHora(fecha, hora);

  if (Number.isNaN(inicio.getTime())) {
    return {
      valido: false,
      mensaje: "La fecha u hora no es válida.",
    };
  }

  if (inicio <= new Date()) {
    return {
      valido: false,
      mensaje: "La cita debe programarse en el futuro.",
    };
  }

  const fin = new Date(
    inicio.getTime() + servicio.duracion * 60000 // 60000 ms = 1 minuto
  );

  const existeConflicto = citasExistentes.some((cita) => {
    if (
      cita.estado === "cancelada" ||
      cita.nutricionistaId !== Number(nutricionistaId)
    ) {
      return false;
    }

    const servicioExistente = servicios.find(
      (item) => item.id === cita.servicioId
    );

    if (!servicioExistente) return false;

    const inicioExistente = convertirFechaHora(
      cita.fecha,
      cita.hora
    );

    const finExistente = new Date(
      inicioExistente.getTime() +
      servicioExistente.duracion * 60000 // 60000 ms = 1 minuto
    );

    return inicio < finExistente &&
           fin > inicioExistente;
  });

  if (existeConflicto) {
    return {
      valido: false,
      mensaje:
        "La nutricionista ya tiene una cita en ese horario.",
    };
  }

  return {
    valido: true,
    mensaje: "Reserva válida.",
  };
}
