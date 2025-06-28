import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as Tone from 'tone';

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


// --- COMPONENTES DE UI DO PIANO ---

const PianoKey = React.memo(({ nota, type, style, tocarNota }) => {
  return (
    <button
      className={`piano-key ${type}`}
      style={style}
      onClick={() => tocarNota(nota)}
      aria-label={`Tocar a nota ${nota}`}
    >
      <span className="note-name">{nota}</span>
    </button>
  );
});

const Piano = ({ oitavaInicial, oitavaFinal, tocarNota }) => {
  const WHITE_KEY_WIDTH = 50; // Largura em pixels
  const BLACK_KEY_WIDTH = 30; // Largura em pixels

  const { whiteKeys, blackKeys } = useMemo(() => {
    const keys = { whiteKeys: [], blackKeys: [] };
    for (let oitava = oitavaInicial; oitava <= oitavaFinal; oitava++) {
      for (const nota of notasBase) {
        const fullNote = `${nota}${oitava}`;
        if (nota.includes('#')) {
          keys.blackKeys.push(fullNote);
        } else {
          keys.whiteKeys.push(fullNote);
        }
      }
    }
    return keys;
  }, [oitavaInicial, oitavaFinal]);

  const whiteKeyIndexMap = { 'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6 };

  return (
    <div className="piano-container" role="group" aria-label="Teclado de piano virtual">
      {/* Renderiza as teclas brancas para formar a base */}
      {whiteKeys.map((nota) => (
        <PianoKey key={nota} nota={nota} type="white" tocarNota={tocarNota} />
      ))}

      {/* Renderiza as teclas pretas com posicionamento absoluto */}
      {blackKeys.map((nota) => {
        const oitava = parseInt(nota.slice(-1));
        const notaBase = nota.slice(0, 1); // A nota antes do '#' (C, D, F, G, A)
        
        const oitavasAnteriores = oitava - oitavaInicial;
        const indexNaOitava = whiteKeyIndexMap[notaBase];
        
        // Calcula a posição da tecla preta
        const leftPosition = 
            (oitavasAnteriores * 7 * WHITE_KEY_WIDTH) + // Deslocamento pelas oitavas anteriores
            ((indexNaOitava + 1) * WHITE_KEY_WIDTH) -   // Deslocamento pela tecla branca precedente
            (BLACK_KEY_WIDTH / 2);                      // Centraliza a tecla preta na junção

        const style = { left: `${leftPosition}px` };

        return (
          <PianoKey
            key={nota}
            nota={nota}
            type="black"
            style={style}
            tocarNota={tocarNota}
          />
        );
      })}
    </div>
  );
};


// --- COMPONENTE PRINCIPAL ---
export const TecladoNotas = () => {
  const [oitavaInicial, setOitavaInicial] = useState(3);
  const [oitavaFinal, setOitavaFinal] = useState(4);
  const [ultimaNotaTocada, setUltimaNotaTocada] = useState(null);
  const [notaRevelada, setNotaRevelada] = useState(false);
  const { tocarNota } = useToneSynth('FMSynth');

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
        
        /* Estilos do Piano */
        .piano-container { 
          position: relative; 
          display: flex; 
          margin-top: 16px; 
          width: 100%; 
          padding: 10px 0;
          background-color: #2c2c2c;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.4);
          overflow-x: auto; /* Permite rolagem horizontal */
          -webkit-overflow-scrolling: touch; /* Melhora rolagem em iOS */
        }
        .piano-key {
          border-style: solid;
          border-color: #666;
          box-sizing: border-box; 
          cursor: pointer; 
          display: flex; 
          flex-direction: column; 
          justify-content: flex-end; 
          align-items: center; 
          padding-bottom: 10px; 
          user-select: none; 
          transition: background-color 0.1s ease; 
        }
        .piano-key .note-name { font-size: 0.8rem; }
        
        .piano-key.white {
          width: 50px;
          height: 200px;
          flex-shrink: 0; /* Impede que as teclas encolham */
          background: linear-gradient(to bottom, #fff 96%, #e0e0e0 100%);
          border-width: 1px 1px 2px 1px;
          border-radius: 0 0 5px 5px;
          box-shadow: inset 0 -5px 5px rgba(0,0,0,0.1);
        }
        .piano-key.white .note-name { color: #555; }
        .piano-key.white:active { background: #ddd; }

        .piano-key.black {
          position: absolute;
          top: 10px; /* Alinha com o padding do container */
          width: 30px;
          height: 120px;
          background: linear-gradient(to bottom, #333 95%, #000 100%);
          z-index: 2;
          border-width: 1px 2px 4px 2px;
          border-radius: 0 0 4px 4px;
          box-shadow: inset 0 -4px 3px rgba(255,255,255,0.2), 0 2px 3px rgba(0,0,0,0.4);
        }
        .piano-key.black .note-name { color: #eee; font-size: 0.7rem; }
        .piano-key.black:active { background: #555; box-shadow: inset 0 -2px 2px rgba(255,255,255,0.2), 0 1px 1px rgba(0,0,0,0.3); }
      `}</style>

      <div className="main-container">
        <h1>Teclado virtual - treinamento de escalas</h2>
        
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