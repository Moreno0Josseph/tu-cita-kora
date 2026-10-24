import { useState } from "react";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Citas from "./pages/Citas";
import Pacientes from "./pages/Pacientes";
import Dashboard from "./pages/Dashboard";
import InformeCore from "./pages/InformeCore";

import "./styles/global.css";

function App() {
  const [currentPage, setCurrentPage] = useState("inicio");

  const pages = {
    inicio: <Home onNavigate={setCurrentPage} />,
    citas: <Citas />,
    pacientes: <Pacientes />,
    dashboard: <Dashboard />,
    informes: <InformeCore />,
  };

  return (
    <>
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <main>
        {pages[currentPage] ?? pages.inicio}
      </main>

      <footer className="footer">
        © 2026 KORA - Centro de Nutrición y Estética
      </footer>
    </>
  );
}

export default App;
