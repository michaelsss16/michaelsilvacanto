import React, { useMemo } from 'react';
import './Piano.css';

// --- DEFINIÇÕES GLOBAIS ---
const notasBase = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// --- COMPONENTES DE UI DO PIANO ---

const PianoKey = React.memo(({ nota, type, style, tocarNota, estaPressionada }) => {
  const className = `piano-key ${type} ${estaPressionada ? 'pressed' : ''}`;
  return (
    <button
      className={className}
      style={style}
      onClick={() => tocarNota(nota)}
      aria-label={`Tocar a nota ${nota}`}
    >
      <span className="note-name">{nota}</span>
    </button>
  );
});

export const Piano = ({ oitavaInicial, oitavaFinal, tocarNota, notasPressionadas = [] }) => {
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

  const estaPressionada = (nota) => notasPressionadas.includes(nota);

  return (
    <div className="piano-container" role="group" aria-label="Teclado de piano virtual">
      {/* Renderiza as teclas brancas para formar a base */}
      {whiteKeys.map((nota) => (
        <PianoKey 
          key={nota} 
          nota={nota} 
          type="white" 
          tocarNota={tocarNota} 
          estaPressionada={estaPressionada(nota)}
        />
      ))}

      {/* Renderiza as teclas pretas com posicionamento absoluto */}
      {blackKeys.map((nota) => {
        const oitava = parseInt(nota.slice(-1));
        const notaBase = nota.slice(0, -1);
        const oitavasAnteriores = oitava - oitavaInicial;
        
        // Encontra o índice da nota base (sem oitava) para o cálculo do posicionamento
        const whiteKeysDaOitava = whiteKeys.filter(n => n.endsWith(String(oitava)));
        let indexNaOitava = -1;

        // A lógica de posicionamento depende da nota preta específica
        switch(notaBase) {
            case 'C#': indexNaOitava = whiteKeysDaOitava.findIndex(k => k.startsWith('C')); break;
            case 'D#': indexNaOitava = whiteKeysDaOitava.findIndex(k => k.startsWith('D')); break;
            case 'F#': indexNaOitava = whiteKeysDaOitava.findIndex(k => k.startsWith('F')); break;
            case 'G#': indexNaOitava = whiteKeysDaOitava.findIndex(k => k.startsWith('G')); break;
            case 'A#': indexNaOitava = whiteKeysDaOitava.findIndex(k => k.startsWith('A')); break;
            default: break;
        }

        // Posição baseada no número de teclas brancas da oitava inicial até a atual
        const totalWhiteKeysAnteriores = oitavasAnteriores * 7;

        const leftPosition = 
            ((totalWhiteKeysAnteriores + indexNaOitava + 1) * WHITE_KEY_WIDTH) - (BLACK_KEY_WIDTH / 2);

        const style = { left: `${leftPosition}px` };

        return (
          <PianoKey
            key={nota}
            nota={nota}
            type="black"
            style={style}
            tocarNota={tocarNota}
            estaPressionada={estaPressionada(nota)}
          />
        );
      })}
    </div>
  );
};
