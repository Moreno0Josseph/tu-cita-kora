
const menuItems = [
  { id: "inicio", label: "Inicio" },
  { id: "citas", label: "Citas" },
  { id: "pacientes", label: "Pacientes" },
  { id: "dashboard", label: "Dashboard" },
  { id: "informes", label: "Informe CORE" },
  { id: "historial", label: "Historial clínico" },
];

export default function Navbar({ currentPage, onNavigate }) {
  return (
    <header className="navbar">
      
        <img id="logo" src="../src/img/logo.png" alt="Logo de KORA" />
    
      <nav aria-label="Navegación principal">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={currentPage === item.id ? "active" : ""}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
