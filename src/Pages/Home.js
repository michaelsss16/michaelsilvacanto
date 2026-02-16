import React from "react";
import Modulos from "./Modulos.js";
import {WhatsappButton }from "../Components/Contatos.js"

const Home = () => {
  return (
    <div>
        <h1>Bem-vindo ao seu espaço de desenvolvimento vocal!</h1>

      <div>
        <h2>Aprenda a cantar com um método completo e prático</h2>
        <p>Olá! Sou Michael Silva, e criei este espaço para te guiar em sua jornada no canto. Aqui você encontrará um curso de canto completo, dividido em módulos que te levarão do básico ao avançado, além de exercícios práticos e playbacks para você treinar e aprimorar sua voz.</p>
      </div>

      <div>
        <h3>Uma jornada de aprendizado para sua voz</h3>
        <p>O curso é projetado para ser um complemento às nossas aulas, oferecendo um caminho claro e progressivo. Cada módulo aborda aspectos essenciais da técnica vocal, desde a respiração e afinação até a interpretação e saúde da voz. O objetivo é que você desenvolva sua musicalidade e ganhe confiança para se expressar através do canto.</p>
      </div>

      <div>
        <h3>Explore os Módulos</h3>
        <div>
<Modulos />
        </div>
      </div>

      <div>
        <h3>Ferramentas Interativas - Teclado Virtual</h3>
        <p>Complementando o aprendizado teórico dos módulos, disponibilizamos ferramentas interativas de teclado virtual para você treinar na prática. Essas ferramentas ajudam a desenvolver sua percepção auditiva, reconhecimento de notas, compreensão de escalas e formação de acordes. Cada seção oferece uma interface intuitiva para praticar e consolidar seus conhecimentos musicais.</p>
        <p>Acesse as seguintes ferramentas:</p>
        <ul>
          <li><a href="/#/teclado/notas">Teclado Virtual - Treinamento de Notas</a> - Identifique e reconheça as notas musicais no teclado</li>
          <li><a href="/#/teclado/escalas">Teclado Virtual - Treinamento de Escalas</a> - Explore e pratique diferentes escalas musicais</li>
          <li><a href="/#/teclado/acordes">Teclado Virtual - Treinamento de Acordes</a> - Aprenda a formar e identificar acordes</li>
        </ul>
      </div>

      <div>
        <h3>Depoimentos</h3>
        <div>
          <p>"Esse curso mudou minha forma de cantar. Hoje me sinto muito mais confiante!" – Ana M.</p>
          <p>"Os módulos são objetivos e a didática é incrível!" – João L.</p>
        </div>
      </div>

      <div>
        <h3>Vamos começar a sua jornada vocal?</h3>
        <p>Entre em contato para agendarmos sua primeira aula e dar o próximo passo na realização do seu sonho de cantar.</p>
        <WhatsappButton />
      </div>
    </div>
  );
};

export default Home;
