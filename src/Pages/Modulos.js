import { useState } from "react";
import { Link } from "react-router-dom";

const Modulo = ({ titulo, aulas, basePath }) => {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="border rounded-2xl shadow-md p-4 mb-4">
      <button
        onClick={() => setAberto(!aberto)}
        className="w-full text-left text-xl font-semibold flex justify-between items-center"
      >
        {titulo}
        <span>{aberto ? "−" : "+"}</span>
      </button>
      {aberto && (
        <ul className="mt-2 pl-4 list-disc">
          {aulas.map((aula, index) => (
            <li key={index} className="my-1">
              <Link to={`${basePath}/aula-${index + 1}`} className="text-blue-600 hover:underline">
                {aula}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function Modulos () {
  const modulos = [
    {
      titulo: "Módulo 1: Fundamentos do canto",
      aulas: [
        "Introdução ao canto",
        "O aparelho fonador",
        "Aquecimento e desaquecimento vocal",
        "Respiração"
      ],
      basePath: "/modulo-1"
    },
    {
      titulo: "Módulo 2: Teoria musical",
      aulas: [
        "Características do som",
        "Melodia",
        "Ritmo",
        "Harmonia",
        "Tonalidade"
      ],
      basePath: "/modulo-2"
    },
    {
      titulo: "Módulo 3: Registros vocais",
      aulas: [
        "Registro de peito",
        "Registro de cabeça",
        "Registro de falsete",
        "Fry e registro de apito",
        "Ajustes vocais: voz de sussurro, cor da voz e nazalidade"
      ],
      basePath: "/modulo-3"
    },
    {
      titulo: "Módulo 4: Ornamentos vocais",
      aulas: [
        "Vibrato",
        "Fry e wisper voice",
        "Mordente",
        "Apogiatura",
        "Grupeto",
        "Melismas"
      ],
      basePath: "/modulo-4"
    },
    {
      titulo: "Módulo 5: Canto coral",
      aulas: [
        "Timbragem e canto uníssono",
        "Backing vocal",
        "Formação de acordes e divisão vocal"
      ],
      basePath: "/modulo-5"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Conteúdo do curso</h1>
      {modulos.map((modulo, index) => (
        <Modulo key={index} {...modulo} />
      ))}
    </div>
  );
}
