import React, { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'respostas_perguntas';

const PerguntasForm = ({ perguntas }) => {
  const [respostas, setRespostas] = useState({});
  const [mostrarRespostasCorretas, setMostrarRespostasCorretas] = useState(false);
  const [mensagemCopiar, setMensagemCopiar] = useState('');
  const timeoutRef = useRef(null);

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

  // Gera texto simples, de leitura natural, para copiar/enviar
  const gerarTextoSimples = () => {
    // tentar obter nome do usuário salvo no localStorage
    let nomeAluno = '';
    try {
      const raw = localStorage.getItem('usuario_logado');
      if (raw) {
        const parsed = JSON.parse(raw);
        nomeAluno = parsed && parsed.nome ? parsed.nome : '';
      }
    } catch (err) {
      nomeAluno = '';
    }

    const linhas = ['Questionário de aprendizado', ''];
    if (nomeAluno) {
      linhas.unshift(`Aluno: ${nomeAluno}`);
      linhas.unshift('');
    }
    perguntas.forEach((p, index) => {
      const resposta = respostas[p.id] || '(sem resposta)';
      linhas.push(`${index + 1}. ${p.texto}`);
      linhas.push(`Resposta: ${resposta}`);
      linhas.push('');
    });
    return linhas.join('\n');
  };

  const copiarRespostas = () => {
    const texto = gerarTextoSimples();
    navigator.clipboard.writeText(texto).then(() => {
  // feedback não bloqueante
  setMensagemCopiar('Respostas copiadas! Cole no campo de mensagem (Ctrl+V no PC ou toque e "Colar" no celular).');
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(() => setMensagemCopiar(''), 3500);
    });
  };

  const enviarWhatsApp = () => {
    const texto = gerarTextoSimples();
    navigator.clipboard.writeText(texto).then(() => {
      // mostrar feedback não bloqueante e abrir WhatsApp
  setMensagemCopiar('Respostas copiadas! Ao abrir o WhatsApp cole no campo de mensagem (Ctrl+V ou toque e "Colar") e envie ao professor.');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setMensagemCopiar(''), 3500);
      const numero = '5531994662740';
  const mensagemPadrao = encodeURIComponent('Cole aqui as respostas copiadas (pressione Ctrl+V no PC ou toque e "Colar" no celular) e envie para o professor.');
      const link = `https://api.whatsapp.com/send?phone=${numero}&text=${mensagemPadrao}`;
      window.open(link, '_blank');
    });
  };

  // limpa timeout ao desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const verificarRespostas = () => {
    setMostrarRespostasCorretas(true);
  };

  return (
    <div className="p-4 space-y-6">
      {mensagemCopiar && (
        <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow">
          {mensagemCopiar}
        </div>
      )}
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
          onClick={copiarRespostas}
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
