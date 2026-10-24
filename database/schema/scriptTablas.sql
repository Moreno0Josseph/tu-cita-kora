-- 1. SERVICIOS (Se crea primero, removiendo la FK circular hacia Citas que causaba conflicto)
CREATE TABLE Servicios(
    Id_Servicio INT PRIMARY KEY,
    Nombre VARCHAR(50),
    Descripcion VARCHAR(200)
);

-- 2. HISTORIALES CLÍNICOS (Se crea antes que Pacientes para que Pacientes lo pueda referenciar)
CREATE TABLE Historiales_Clinicos(
    Id_Historial_Clinico INT PRIMARY KEY,
    Cedula_Paciente CHAR(11), -- Nota: Esta FK a Pacientes se creará después vía ALTER TABLE para evitar bloqueo circular
    Fecha_Creacion DATE,
    Antecedentes VARCHAR(200),
    Observaciones VARCHAR(200)
);

-- 3. PACIENTES
CREATE TABLE Pacientes(
    Cedula CHAR(11) PRIMARY KEY,
    Nombre VARCHAR(50),
    Fecha_nacimiento DATE,
    Email VARCHAR(50),
    Peso FLOAT,
    Altura FLOAT,
    Telefono CHAR(15),
    Id_Historial_Clinico INT,
    FOREIGN KEY (Id_Historial_Clinico) REFERENCES Historiales_Clinicos(Id_Historial_Clinico) 
);

-- Ahora que Pacientes existe, agregamos de forma segura la FK en Historiales_Clinicos
ALTER TABLE Historiales_Clinicos 
    ADD CONSTRAINT fk_historial_paciente FOREIGN KEY (Cedula_Paciente) REFERENCES Pacientes(Cedula);

-- 4. NUTRICIONISTAS (Se removieron FKs innecesarias hacia Pacientes y Citas, ya que esa relación se maneja en la tabla Citas)
CREATE TABLE Nutricionistas(
    Cedula CHAR(11) PRIMARY KEY,
    Nombre VARCHAR(50),
    Email VARCHAR(50)
);

-- 5. CITAS (Une a Pacientes, Nutricionistas y Servicios)
CREATE TABLE Citas(
    Id_Cita INT PRIMARY KEY,
    Cedula_Paciente CHAR(11),
    Cedula_Nutricionista CHAR(11),
    Id_Servicio INT,
    Fecha DATE,
    Estado VARCHAR(50),
    FOREIGN KEY (Cedula_Paciente) REFERENCES Pacientes(Cedula),
    FOREIGN KEY (Cedula_Nutricionista) REFERENCES Nutricionistas(Cedula),
    FOREIGN KEY (Id_Servicio) REFERENCES Servicios(Id_Servicio)
);

-- 6. MEDICIONES PACIENTES (Se eliminó la coma huérfana al final)
CREATE TABLE Mediciones_Pacientes(
    Id_Mediciones INT PRIMARY KEY,
    Cedula_Paciente CHAR(11), -- Se declaró la columna antes de la FK
    Fecha_Medicion DATE,
    FOREIGN KEY (Cedula_Paciente) REFERENCES Pacientes(Cedula)
);

-- 7. PLAN ALIMENTICIO PACIENTE (Se cambió el guion '-' por guion bajo '_', se agregó la columna Cedula y se quitó la FK circular a Asignacion)
CREATE TABLE Plan_Alimenticio_Paciente(
    Id_Plan_Alimenticio INT PRIMARY KEY,
    Cedula_Paciente CHAR(11), -- Se agregó la columna que faltaba
    Nombre VARCHAR(50),
    Estado VARCHAR(50),
    Descripcion VARCHAR(200),
    FOREIGN KEY (Cedula_Paciente) REFERENCES Pacientes(Cedula)
);

-- 8. ASIGNACIÓN PLAN
CREATE TABLE Asignacion_Plan(
    Id_Asignacion_Plan INT PRIMARY KEY,
    Id_Plan_Alimenticio INT, -- Corregido el nombre para apuntar correctamente
    Cedula_Paciente CHAR(11), -- Se declaró la columna antes de la FK
    Fecha_Inicio DATE,
    Fecha_Fin DATE,
    FOREIGN KEY (Id_Plan_Alimenticio) REFERENCES Plan_Alimenticio_Paciente(Id_Plan_Alimenticio),
    FOREIGN KEY (Cedula_Paciente) REFERENCES Pacientes(Cedula)
);
