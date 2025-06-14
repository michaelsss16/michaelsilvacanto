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
    <div className="p-4 sm:p-6 lg:p-8 font-inter"> {/* Adicionado padding responsivo e fonte */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">Exercícios</h1>
      <p className="mb-6 text-gray-600 leading-relaxed">
        Utilize os áudios abaixo para praticar as técnicas vocais apresentadas no curso.
        Lembre-se de realizar o aquecimento vocal antes de começar os estudos.
      </p>

      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-700">Notas musicais</h2>
      <p className="mb-8 text-gray-600 leading-relaxed">
        Ouça atentamente cada áudio com as notas musicais. Repita-os até que consiga
        reproduzir corretamente a melodia e identificar cada nota pelo nome.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Layout responsivo para os players */}
        {exercicios.map(({ titulo, src }, index) => (
          <AudioPlayer key={index} titulo={titulo} src={src} />
        ))}
      </div>
    </div>
  );
};

// Componente AudioPlayer com tratamento de erro
const AudioPlayer = ({ titulo, src }) => {
  const [loop, setLoop] = useState(false);
  const [error, setError] = useState(false); // Novo estado para controlar erros de carregamento

  // Função para alternar o loop do áudio
  const toggleLoop = (e) => {
    // Certifica-se de que o áudio foi carregado e não há erro antes de tentar alternar o loop
    if (!error) {
      const audio = e.target.previousSibling;
      if (audio) {
        audio.loop = !audio.loop;
        setLoop(audio.loop);
      }
    }
  };

  // Função para lidar com erros de carregamento do áudio
  const handleAudioError = () => {
    setError(true); // Define o estado de erro como verdadeiro
    console.error(`Erro ao carregar o áudio: ${src}. Verifique o caminho do arquivo.`);
  };

  return (
    <div className="mb-6 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center"> {/* Estilo aprimorado com Tailwind CSS */}
      <h3 className="text-xl font-medium mb-3 text-gray-800 text-center">{titulo}</h3>
      {error ? (
        <p className="text-red-600 text-center mb-4">
          Não foi possível carregar este áudio. Por favor, tente novamente mais tarde ou
          verifique a conexão.
        </p>
      ) : (
        <audio
          controls
          src={src}
          onError={handleAudioError} // Adicionado o handler de erro
          className="w-full max-w-sm rounded-md" // Estilo para o player de áudio
          style={{ display: "block", marginBottom: "0.5em" }} // Mantido estilo inline para sobrepor Tailwind se necessário
        />
      )}
      <button
        onClick={toggleLoop}
        disabled={error} // Desabilita o botão se houver erro no áudio
        className={`mt-4 py-2 px-4 rounded-md font-medium transition-colors duration-200 ease-in-out
          ${loop ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
          ${error ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          text-white shadow-md`} // Estilo aprimorado para o botão
      >
        {loop ? "Desativar Loop" : "Ativar Loop"}
      </button>
    </div>
  );
};

// Estilo original do botão, agora integrado nas classes Tailwind do componente
// const buttonStyle = {
//   backgroundColor: "#333",
//   color: "#fff",
//   padding: "0.5em 1em",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
//   fontSize: "0.9em",
//   textDecoration: "none",
// };
