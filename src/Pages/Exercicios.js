import { useState } from "react";

export const Exercicios = () => {
  const exercicios = [
    {
      titulo: "Notas musicais - Ascendente - Com acompanhamento",
      src: "/michaelsilvacanto/Exercicios/Notas com voz ascendente.mp3",
    },
    {
      titulo: "Notas musicais - Ascendente - Sem acompanhamento",
      src: "/michaelsilvacanto/Exercicios/Notas sem voz ascendente.mp3",
    },
    {
      titulo: "Notas musicais - Ascendente e descendente - Com acompanhamento",
      src: "/michaelsilvacanto/Exercicios/Notas com voz ascendente e descendente.mp3",
    },
    {
      titulo: "Notas musicais - Ascendente e descendente - Sem acompanhamento",
      src: "/michaelsilvacanto/Exercicios/Notas sem voz ascendente e descendente.mp3",
    },
  ];

  return (
    <div>
      <h1>Exercícios</h1>
      <p>
        Utilize os áudios abaixo para praticar as técnicas vocais apresentadas no curso.
        Lembre-se de realizar o aquecimento vocal antes de começar os estudos.
      </p>

      <h2>Notas musicais</h2>
      <p>
        Ouça atentamente cada áudio com as notas musicais. Repita-os até que consiga
        reproduzir corretamente a melodia e identificar cada nota pelo nome.
      </p>

      {exercicios.map(({ titulo, src }, index) => (
        <AudioPlayer key={index} titulo={titulo} src={src} />
      ))}
    </div>
  );
};

const AudioPlayer = ({ titulo, src }) => {
  const [loop, setLoop] = useState(false);
  const toggleLoop = (e) => {
    const audio = e.target.previousSibling;
    if (audio) {
      audio.loop = !audio.loop;
      setLoop(audio.loop);
    }
  };

  return (
    <div style={{ marginBottom: "1.5em" }}>
      <h3>{titulo}</h3>
      <audio controls src={src} style={{ display: "block", marginBottom: "0.5em" }} />
      <button onClick={toggleLoop} style={buttonStyle}>
        {loop ? "Desativar Loop" : "Ativar Loop"}
      </button>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "0.5em 1em",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.9em",
  textDecoration: "none",
};
