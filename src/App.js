import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

import Footer from "./Components/Footer.js";
import Home from './Pages/Home.js';
import NotFound from './Pages/NotFound.js';
import Sobre from './Pages/Sobre.js';
import Header from "./Components/Header.js";
import Modulos from './Pages/Modulos.js'; 
import {Playbacks }from './Pages/Playbacks.js'; 

import {M1A1, M1A2, M1A3, M1A4, M1A5, M1A6, M1A7} from './Pages/Modulo1.js'; 

export default function App() {
  return (
    <HashRouter>
    <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/playbacks" element={<Playbacks />} />
          <Route path="/modulos" element={<Modulos />} />

          <Route path="/modulo-1/aula-1" element={<M1A1/>} />
          <Route path="/modulo-1/aula-2" element={<M1A2/>} />
          <Route path="/modulo-1/aula-3" element={<M1A3/>} />
          <Route path="/modulo-1/aula-4" element={<M1A4/>} />
          <Route path="/modulo-1/aula-5" element={<M1A5/>} />
          <Route path="/modulo-1/aula-6" element={<M1A6/>} />
          <Route path="/modulo-1/aula-7" element={<M1A7/>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
