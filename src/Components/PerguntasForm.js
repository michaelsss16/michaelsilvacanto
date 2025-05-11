import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'respostas_perguntas';

const PerguntasForm = ({ perguntas }) => {
  const [respostas, setRespostas] = useState({});
  const [mostrarRespostasCorretas, setMostrarRespostasCorretas] = useState(false);

  useEffect(() => {
    if (perguntas && perguntas.length > 0) {
      const salvas = localStorage.getItem(STORAGE_KEY);
      if (salvas) {
        try {
          setRespostas(JSON.parse(salvas));
        } catch {
          setRespostas({});
        }
      }
    }
  }, [perguntas]);

  useEffect(() => {
    if (Object.keys(respostas).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(respostas));
    }
  }, [respostas]);

  const handleChange = (id, valor) => {
    setRespostas(prev => ({
      ...prev,
      [id]: valor,
    }));
  };

  const gerarMarkdown = () => {
    const markdown = [`## Questionário de aprendizado`, ''];
    perguntas.forEach(p => {
      const resposta = respostas[p.id] || '';
      markdown.push(`### ${p.texto}\n\n${resposta}\n`);
    });
    return markdown.join('\n');
  };

  const copiarMarkdown = () => {
    const markdown = gerarMarkdown();
    navigator.clipboard.writeText(markdown).then(() => {
      alert('Respostas copiadas para a área de transferência!');
    });
  };

  const enviarWhatsApp = () => {
    const markdown = gerarMarkdown();
    navigator.clipboard.writeText(markdown).then(() => {
      const numero = '5531994662740';
      const mensagemPadrao = encodeURIComponent('Cole aqui as suas respostas');
      const link = `https://api.whatsapp.com/send?phone=${numero}&text=${mensagemPadrao}`;
      window.open(link, '_blank');
    });
  };

  const verificarRespostas = () => {
    setMostrarRespostasCorretas(true);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Questionário de aprendizado</h2>

      {perguntas.map(pergunta => (
        <div key={pergunta.id} className="space-y-2">
          <h3 className="font-semibold text-lg">{pergunta.texto}</h3>
          {pergunta.tipo === 'aberta' ? (
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              value={respostas[pergunta.id] || ''}
              onChange={e => handleChange(pergunta.id, e.target.value)}
            />
          ) : (
            <select
              className="w-full p-2 border rounded"
              value={respostas[pergunta.id] || ''}
              onChange={e => handleChange(pergunta.id, e.target.value)}
            >
              <option value="">Selecione uma opção</option>
              {pergunta.opcoes.map((opcao, idx) => (
                <option key={idx} value={opcao}>{opcao}</option>
              ))}
            </select>
          )}

          {mostrarRespostasCorretas && pergunta.respostaCorreta && (
            <div className="text-sm text-green-700 mt-1">
              <strong>Resposta:</strong> {pergunta.respostaCorreta}
            </div>
          )}
        </div>
      ))}

      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-6">
        <button
          onClick={copiarMarkdown}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Copiar respostas
        </button>
        <button
          onClick={enviarWhatsApp}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Enviar respostas para professor
        </button>
        <button
          onClick={verificarRespostas}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Verificar respostas
        </button>
      </div>
    </div>
  );
};

export default PerguntasForm;
