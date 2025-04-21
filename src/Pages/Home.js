import React from "react";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div>
      <div>
        <h1>Domine sua Voz</h1>
        <div>
          <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Módulos</a></li>
            <li><a href="#">Depoimentos</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </div>
      </div>

      <div>
        <h2>Curso Completo de Canto Online</h2>
        <p>Aprenda a dominar sua voz com técnica, confiança e emoção.</p>
        <a href="#">Ver Módulos</a>
      </div>

      <div>
        <h3>Sobre o Curso</h3>
        <p>Este curso foi desenvolvido para cantores iniciantes e intermediários que desejam melhorar sua técnica vocal e compreensão musical. Utilizamos uma abordagem prática e progressiva para garantir seu crescimento vocal em cada etapa.</p>
        <ul>
          <li>Para todos os estilos e níveis</li>
          <li>100% online e acessível</li>
          <li>Material de apoio incluso</li>
        </ul>
      </div>

      <div>
        <h3>Módulos do Curso</h3>
        <div>
          {[
            { titulo: "Respiração e Apoio", emoji: "🎶" },
            { titulo: "Vocalises e Aquecimento", emoji: "🗣️" },
            { titulo: "Afinação e Timbre", emoji: "🎼" },
            { titulo: "Projeção Vocal e Potência", emoji: "📢" },
            { titulo: "Teoria Musical Básica", emoji: "📚" },
          ].map((modulo, index) => (
            <div key={index}>
              <h4>{modulo.emoji} {modulo.titulo}</h4>
              <p>Clique abaixo para acessar os conteúdos deste módulo.</p>
              <a href="#">Ver Conteúdo</a>
            </div>
          ))}
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
        <a href="#">Matricule-se Agora</a>
      </div>
</div>
  );
};

export default Home;
