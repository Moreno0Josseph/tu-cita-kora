import { useState } from "react";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Citas from "./pages/Citas";
import Pacientes from "./pages/Pacientes";
import Dashboard from "./pages/Dashboard";
import InformeCore from "./pages/InformeCore";
import HistorialClinico from "./pages/HistorialClinico";
import instagramIcon from "./img/ig.png";
import whatsappIcon from "./img/wssp.png";
import mapsIcon from "./img/maps.png";
import facebookIcon from "./img/fb.png";
import tiktokIcon from "./img/tiktok.png";
import "./styles/global.css";

function App() {
  const [currentPage, setCurrentPage] = useState("inicio");

  const pages = {
    inicio: <Home onNavigate={setCurrentPage} />,
    citas: <Citas />,
    pacientes: <Pacientes />,
    dashboard: <Dashboard />,
    informes: <InformeCore />,
    historial: <HistorialClinico />,
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
        <span>© 2026 KORA - Centro de Nutrición y Estética</span>
        <ul className="footer-socials" aria-label="Redes sociales">
          <li><a href="https://www.instagram.com/kora.nutricion.estetica/" target="_blank" rel="noopener noreferrer"><img src={instagramIcon} alt="Instagram" /></a></li>
          <li><a href="https://wa.me/593980111992" target="_blank" rel="noopener noreferrer"><img src={whatsappIcon} alt="WhatsApp" /></a></li>
          <li><a href="https://www.google.com/maps/place/Kora+Nutrici%C3%B3n+y+Est%C3%A9tica/@-2.1373398,-79.8954293,17z/data=!3m1!4b1!4m6!3m5!1s0x902d6d0018c7827f:0x7ba12a83691fcf92!8m2!3d-2.1373398!4d-79.8954293!16s%2Fg%2F11n4y064xd?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer"><img src={mapsIcon} alt="Maps" /></a></li>
          <li><a href="https://www.facebook.com/people/Kora-Nutrici%C3%B3n-y-Est%C3%A9tica/61588018591264/?ref=PROFILE_EDIT_xav_ig_profile_page_web" target="_blank" rel="noopener noreferrer"><img src={facebookIcon} alt="Facebook" /></a></li>
          <li><a href="https://www.tiktok.com/@kora.nutricion.estetica?_r=1&_t=ZS-9AOW5u1rlRQ" target="_blank" rel="noopener noreferrer"><img src={tiktokIcon} alt="TikTok" /></a></li>
        </ul>
      </footer>
    </>
  );
}

export default App;
