import React from "react";
import Modulos from "./Modulos.js";
import {WhatsappButton }from "../Components/Contatos.js"

const Home = () => {
  return (
    <div>
        <h1>Michael Silva - Music Space</h1>

      <div>
        <h2>Curso Completo de Canto Online</h2>
        <p>Aprenda a dominar sua voz com técnica, confiança e emoção.</p>
      </div>

      <div>
        <h3>Sobre o Curso</h3>
        <p>Este curso foi desenvolvido para cantores iniciantes e intermediários que desejam melhorar sua técnica vocal e compreensão musical. Utilizamos uma abordagem prática e progressiva para garantir seu crescimento vocal em cada etapa.</p>
        <p>Deve ser utilizado como apoio para as aulas com o professor.</p>
      </div>

      <div>
        <h3>Módulos do Curso</h3>
        <div>
<Modulos />
        </div>
      </div>

      <div>
        <h3>Depoimentos</h3>
        <div>
          <p>"Esse curso mudou minha forma de cantar. Hoje me sinto muito mais confiante!" – Ana M.</p>
          <p>"Os módulos são objetivos e a didática é incrível!" – João L.</p>
        </div>
      </div>

      <div>
        <h3>Pronto para começar?</h3>
        <p>Me chama no whatsapp!</p>
        <WhatsappButton />
      </div>
    </div>
  );
};

export default Home;
