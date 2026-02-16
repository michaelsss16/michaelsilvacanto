import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as Tone from 'tone';
import { Piano } from '../Components/Piano';

// --- DEFINIÇÕES GLOBAIS ---
const notasBase = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const escalas = {
  cromatica: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  maiorC: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  maiorCSharp: ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
  maiorD: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  maiorDSharp: ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D'],
  maiorE: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  maiorF: ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
  maiorFSharp: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'],
  maiorG: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  maiorGSharp: ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G'],
  maiorA: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  maiorASharp: ['A#', 'C', 'D', 'D#', 'F', 'G', 'A'],
  maiorB: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
};
const sintetizadores = {
  AMSynth: Tone.AMSynth,
  FMSynth: Tone.FMSynth,
  MembraneSynth: Tone.MembraneSynth,
  DuoSynth: Tone.DuoSynth,
  MonoSynth: Tone.MonoSynth,
};

// --- HOOK PERSONALIZADO ---
const useToneSynth = (synthType = 'FMSynth') => {
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    const SynthClass = sintetizadores[synthType] || Tone.FMSynth;
    const polySynth = new Tone.PolySynth(SynthClass).toDestination();
    setSynth(polySynth);

    return () => {
      if (polySynth) {
        polySynth.dispose();
      }
    };
  }, [synthType]);

  const tocarNota = useCallback(async (nota, duracao = '8n') => {
    if (synth) {
      await Tone.start();
      synth.triggerAttackRelease(nota, duracao);
    }
  }, [synth]);

  return { tocarNota };
};

// --- COMPONENTE PRINCIPAL ---
export const TecladoNotas = () => {
  const [oitavaInicial, setOitavaInicial] = useState(3);
  const [oitavaFinal, setOitavaFinal] = useState(4);
  const [sequenciaNotas, setSequenciaNotas] = useState([]); // array das notas sorteadas
  const [notaRevelada, setNotaRevelada] = useState(false);
  const [duracaoNota, setDuracaoNota] = useState(0.5); // Duração em segundos
  const [quantidadeNotas, setQuantidadeNotas] = useState(1); // Quantas notas aleatórias gerar
  const [escalaAtual, setEscalaAtual] = useState('cromatica'); // Escala padrão: cromática
  const synth = useToneSynth('FMSynth');

  const tocarNota = useCallback((nota) => {
    synth.tocarNota(nota, duracaoNota);
  }, [synth, duracaoNota]);

  // Reset da revelação quando a escala mudar
  useEffect(() => {
    setNotaRevelada(false);
  }, [escalaAtual]);

  useEffect(() => {
    if (oitavaFinal < oitavaInicial) {
      setOitavaFinal(oitavaInicial);
    }
  }, [oitavaInicial, oitavaFinal]);

  const notasDisponiveis = useMemo(() => {
    const notasDaEscala = escalas[escalaAtual] || escalas.cromatica;
    const notas = [];
    for (let oitava = oitavaInicial; oitava <= oitavaFinal; oitava++) {
      notasDaEscala.forEach(n => notas.push(`${n}${oitava}`));
    }
    return notas;
  }, [oitavaInicial, oitavaFinal, escalaAtual]);

  const handleTocarNotaAleatoria = () => {
    if (notasDisponiveis.length === 0) return;

    const sequencia = [];
    for (let i = 0; i < quantidadeNotas; i++) {
      const indiceAleatorio = Math.floor(Math.random() * notasDisponiveis.length);
      const notaSorteada = notasDisponiveis[indiceAleatorio];
      sequencia.push(notaSorteada);

      // toca cada nota com pequeno atraso para ouvir a sequência
      setTimeout(() => {
        tocarNota(notaSorteada);
      }, i * (duracaoNota * 1000 + 100));
    }

    setSequenciaNotas(sequencia);
    setNotaRevelada(false);
  };

  const handleRepetirNota = () => {
    if (sequenciaNotas.length === 0) return;
    sequenciaNotas.forEach((nota, idx) => {
      setTimeout(() => {
        tocarNota(nota);
      }, idx * (duracaoNota * 1000 + 100));
    });
  };

  const handleRevelarNota = () => {
    setNotaRevelada(true);
  };

  const oitavasDisponiveis = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <style>{`
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f0f2f5; color: #333; margin: 0; padding: 1rem; }
        .main-container { max-width: 900px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h2, h3 { color: #1a237e; border-bottom: 2px solid #3f51b5; padding-bottom: 8px; }
        .controls-fieldset { border: 1px solid #ccc; border-radius: 8px; padding: 16px; margin-bottom: 24px; }
        .controls-fieldset legend { font-weight: bold; color: #3f51b5; padding: 0 8px; }
        .control-group { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
        .control-group label { font-weight: 500; min-width: 100px; }
        .control-group select { padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 16px; }
        .button-group { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
        .button-group button { padding: 10px 15px; font-size: 16px; cursor: pointer; border: none; border-radius: 4px; background-color: #3f51b5; color: white; transition: background-color 0.2s ease; }
        .button-group button:hover:not(:disabled) { background-color: #303f9f; }
        .button-group button:disabled { background-color: #9e9e9e; cursor: not-allowed; }
        .revelacao-nota { margin-top: 20px; padding: 12px; background-color: #e8eaf6; border-left: 4px solid #3f51b5; font-size: 1.1rem; }
      `}</style>

      <div className="main-container">
        <h1>Teclado virtual - treinamento de notas</h1>
        
        <fieldset className="controls-fieldset">
          <legend>Controles do Exercício</legend>
          
          <div className="control-group">
            <label htmlFor="oitava-inicial">Oitava Inicial:</label>
            <select id="oitava-inicial" value={oitavaInicial} onChange={(e) => setOitavaInicial(Number(e.target.value))}>
              {oitavasDisponiveis.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="oitava-final">Oitava Final:</label>
            <select id="oitava-final" value={oitavaFinal} onChange={(e) => setOitavaFinal(Number(e.target.value))}>
              {oitavasDisponiveis.filter(o => o >= oitavaInicial).map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="escala">Escala:</label>
            <select id="escala" value={escalaAtual} onChange={(e) => setEscalaAtual(e.target.value)}>
              <option value="cromatica">Cromática (C, C#, D, D#, E, F, F#, G, G#, A, A#, B)</option>
              <option value="maiorC">Escala Maior em C</option>
              <option value="maiorCSharp">Escala Maior em C#</option>
              <option value="maiorD">Escala Maior em D</option>
              <option value="maiorDSharp">Escala Maior em D#</option>
              <option value="maiorE">Escala Maior em E</option>
              <option value="maiorF">Escala Maior em F</option>
              <option value="maiorFSharp">Escala Maior em F#</option>
              <option value="maiorG">Escala Maior em G</option>
              <option value="maiorGSharp">Escala Maior em G#</option>
              <option value="maiorA">Escala Maior em A</option>
              <option value="maiorASharp">Escala Maior em A#</option>
              <option value="maiorB">Escala Maior em B</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="duracao-nota">Duração ({duracaoNota.toFixed(1)}s):</label>
            <input
              type="range"
              id="duracao-nota"
              min="0.1"
              max="2"
              step="0.1"
              value={duracaoNota}
              onChange={(e) => setDuracaoNota(Number(e.target.value))}
              style={{ flex: 1 }}
            />
          </div>

          <div className="control-group">
            <label htmlFor="quantidade-notas">Quantidade ({quantidadeNotas} {quantidadeNotas === 1 ? 'nota' : 'notas'}):</label>
            <input
              type="range"
              id="quantidade-notas"
              min="1"
              max="10"
              step="1"
              value={quantidadeNotas}
              onChange={(e) => setQuantidadeNotas(Number(e.target.value))}
              style={{ flex: 1 }}
            />
          </div>

          <div className="button-group">
            <button onClick={handleTocarNotaAleatoria} aria-label="Tocar uma nova nota aleatória">
              Tocar Nota Aleatória
            </button>
            <button onClick={handleRepetirNota} disabled={sequenciaNotas.length === 0} aria-label="Repetir as notas sorteadas">
              Repetir {sequenciaNotas.length > 1 ? 'Notas' : 'Nota'}
            </button>
            <button onClick={handleRevelarNota} disabled={sequenciaNotas.length === 0} aria-label="Revelar as notas sorteadas">
              Revelar {sequenciaNotas.length > 1 ? 'Notas' : 'Nota'} {sequenciaNotas.length > 0 && !notaRevelada ? '(escondida)' : ''}
            </button>
          </div>

          {sequenciaNotas.length > 0 && (
            <div className="revelacao-nota" aria-live="polite" style={{marginTop: '16px'}}>
              <p style={{margin: '0 0 8px 0', color: '#3f51b5', fontWeight: 'bold'}}>
                Status: {notaRevelada ? '✓ Revelada' : '● Escondida'}
              </p>
              {notaRevelada && (
                <p style={{margin: '0', fontSize: '1.3rem', color: '#1a237e'}}>
                  As notas tocadas foram: <strong style={{fontSize: '1.5rem'}}>{sequenciaNotas.join(', ')}</strong>
                </p>
              )}
            </div>
          )}
        </fieldset>

        <h3 style={{marginTop: '2rem'}}>Teclado Interativo</h3>
        <Piano
          oitavaInicial={3}
          oitavaFinal={4}
          tocarNota={tocarNota}
        />
      </div>
    </>
  );
};

// Se você estiver usando este arquivo como o principal (ex: App.js),
// descomente a linha abaixo.
// export default TecladoNotas;

// Se você estiver usando este arquivo como o principal (ex: App.js),
// descomente a linha abaixo.
// export default TecladoNotas;