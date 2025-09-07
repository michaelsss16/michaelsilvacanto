import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as Tone from 'tone';
import { Piano } from '../Components/Piano';

// --- DEFINIÇÕES GLOBAIS ---
const notasBase = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
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
  const [ultimaNotaTocada, setUltimaNotaTocada] = useState(null);
  const [notaRevelada, setNotaRevelada] = useState(false);
  const [duracaoNota, setDuracaoNota] = useState(0.5); // Duração em segundos
  const synth = useToneSynth('FMSynth');

  const tocarNota = useCallback((nota) => {
    synth.tocarNota(nota, duracaoNota);
  }, [synth, duracaoNota]);

  useEffect(() => {
    if (oitavaFinal < oitavaInicial) {
      setOitavaFinal(oitavaInicial);
    }
  }, [oitavaInicial, oitavaFinal]);

  const notasDisponiveis = useMemo(() => {
    const notas = [];
    for (let oitava = oitavaInicial; oitava <= oitavaFinal; oitava++) {
      notasBase.forEach(n => notas.push(`${n}${oitava}`));
    }
    return notas;
  }, [oitavaInicial, oitavaFinal]);

  const handleTocarNotaAleatoria = () => {
    if (notasDisponiveis.length === 0) return;
    const indiceAleatorio = Math.floor(Math.random() * notasDisponiveis.length);
    const notaSorteada = notasDisponiveis[indiceAleatorio];
    
    setUltimaNotaTocada(notaSorteada);
    setNotaRevelada(false);
    tocarNota(notaSorteada);
  };

  const handleRepetirNota = () => {
    if (ultimaNotaTocada) {
      tocarNota(ultimaNotaTocada);
    }
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

          <div className="button-group">
            <button onClick={handleTocarNotaAleatoria} aria-label="Tocar uma nova nota aleatória">
              Tocar Nota Aleatória
            </button>
            <button onClick={handleRepetirNota} disabled={!ultimaNotaTocada} aria-label="Repetir a última nota tocada">
              Repetir Nota
            </button>
            <button onClick={handleRevelarNota} disabled={!ultimaNotaTocada} aria-label="Revelar qual foi a última nota tocada">
              Revelar Nota
            </button>
          </div>

          {notaRevelada && ultimaNotaTocada && (
            <p className="revelacao-nota" aria-live="polite">
              A nota tocada foi: <strong>{ultimaNotaTocada}</strong>
            </p>
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