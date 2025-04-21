import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

import Footer from "./Components/Footer.js";
import Home from './Pages/Home.js';
import NotFound from './Pages/NotFound.js';
import Sobre from './Pages/Sobre.js';
import Modulo1 from './Pages/Modulo1.js'; 
import Header from "./Components/Header.js";

export default function App() {
  return (
    <HashRouter>
    <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/modulos/1" element={<Modulo1 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
