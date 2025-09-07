import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as Tone from 'tone';
import { Piano } from '../Components/Piano';

// --- DEFINIÇÕES E HOOKS REUTILIZADOS ---
const notasBase = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const sintetizadores = { FMSynth: Tone.FMSynth, AMSynth: Tone.AMSynth };

const useToneSynth = (synthType = 'FMSynth') => {
  const [synth, setSynth] = useState(null);
  useEffect(() => {
    const polySynth = new Tone.PolySynth(sintetizadores[synthType]).toDestination();
    setSynth(polySynth);
    return () => { if (polySynth) polySynth.dispose(); };
  }, [synthType]);

  const tocarAcorde = useCallback(async (notas, duracao = '1n') => {
    if (synth && notas?.length) {
      await Tone.start();
      synth.triggerAttackRelease(notas, duracao);
    }
  }, [synth]);
  return { tocarAcorde };
};

// --- LÓGICA DE ACORDES ---
const definicoesAcordes = {
    'maior': { nome: 'Maior', formula: [0, 4, 7] },
    'menor': { nome: 'Menor', formula: [0, 3, 7] },
    'diminuto': { nome: 'Diminuto', formula: [0, 3, 6] },
    'aumentado': { nome: 'Aumentado', formula: [0, 4, 8] },
    'dom7': { nome: 'Dominante 7ª (7)', formula: [0, 4, 7, 10] },
    'maj7': { nome: 'Maior 7ª (maj7)', formula: [0, 4, 7, 11] },
    'm7': { nome: 'Menor 7ª (m7)', formula: [0, 3, 7, 10] },
    'm7b5': { nome: 'Meio-Diminuto (m7b5)', formula: [0, 3, 6, 10] },
    'add9': { nome: 'Com nona add (add9)', formula: [0, 4, 7, 14] },
};

const gerarNotasDoAcorde = (notaFundamental, oitava, tipoAcorde) => {
    const definicao = definicoesAcordes[tipoAcorde];
    if (!definicao) return [];
    const indiceFundamental = notasBase.indexOf(notaFundamental);
    if (indiceFundamental === -1) return [];
    return definicao.formula.map(intervalo => {
        const totalSemitons = indiceFundamental + intervalo;
        const oitavaFinal = oitava + Math.floor(totalSemitons / 12);
        const indiceNota = totalSemitons % 12;
        return `${notasBase[indiceNota]}${oitavaFinal}`;
    });
};

// --- NOVO COMPONENTE: TecladoAcordes ---
export const TecladoAcordes = () => {
    const { tocarAcorde } = useToneSynth('FMSynth');
    const [ultimaProgressao, setUltimaProgressao] = useState(null);
    const [progressaoRevelada, setProgressaoRevelada] = useState(false);
    const [tiposDeAcordesSelecionados, setTiposDeAcordesSelecionados] = useState(['maior', 'menor']);
    const [numAcordes, setNumAcordes] = useState(1); // Padrão alterado para 1
    const [bpm, setBpm] = useState(100);
    const [repeticoes, setRepeticoes] = useState(1);
    const [oitavaBase, setOitavaBase] = useState(3);
    const [isPlaying, setIsPlaying] = useState(false);
    const [notasPressionadas, setNotasPressionadas] = useState([]);

    const handleTipoAcordeChange = (tipo) => {
        setTiposDeAcordesSelecionados(prev => {
            const jaSelecionado = prev.includes(tipo);
            if (jaSelecionado) {
                if (prev.length === 1) return prev;
                return prev.filter(t => t !== tipo);
            } else {
                return [...prev, tipo];
            }
        });
    };

    const tocarSequencia = useCallback(async (progressao) => {
        if (!progressao || isPlaying) return;
        setIsPlaying(true);
        setProgressaoRevelada(false);

        const duracaoCompassoMs = (60 / bpm) * 4 * 1000;
        
        for (let r = 0; r < repeticoes; r++) {
            for (const acordeInfo of progressao) {
                const notas = gerarNotasDoAcorde(acordeInfo.fundamental, acordeInfo.oitava, acordeInfo.tipo);
                setNotasPressionadas(notas);
                tocarAcorde(notas, '1n');
                await new Promise(res => setTimeout(res, duracaoCompassoMs));
            }
            if (r < repeticoes - 1) {
                await new Promise(res => setTimeout(res, duracaoCompassoMs));
            }
        }
        setIsPlaying(false);
        setNotasPressionadas([]);
    }, [bpm, repeticoes, tocarAcorde, isPlaying]);
    
    const handleTocarProgressao = () => {
        if (tiposDeAcordesSelecionados.length === 0) return;

        const novaProgressao = Array.from({ length: numAcordes }, () => {
            const fundamentalAleatoria = notasBase[Math.floor(Math.random() * notasBase.length)];
            const tipoAleatorio = tiposDeAcordesSelecionados[Math.floor(Math.random() * tiposDeAcordesSelecionados.length)];
            return { fundamental: fundamentalAleatoria, oitava: oitavaBase, tipo: tipoAleatorio };
        });

        setUltimaProgressao(novaProgressao);
        tocarSequencia(novaProgressao);
    };
    
    const handleRepetirProgressao = () => {
        if(ultimaProgressao) tocarSequencia(ultimaProgressao);
    };
    
    const handlePianoKeyClick = (nota) => {
        const notaFundamental = nota.slice(0, -1);
        const oitava = parseInt(nota.slice(-1));
        const tipoParaTocar = tiposDeAcordesSelecionados[0] || 'maior';
        const notasDoAcorde = gerarNotasDoAcorde(notaFundamental, oitava, tipoParaTocar);
        setNotasPressionadas(notasDoAcorde);
        tocarAcorde(notasDoAcorde, '1n').then(() => {
            setTimeout(() => setNotasPressionadas([]), 1000);
        });
    };

    return (
        <>
            <style>{`
                .main-container { max-width: 900px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h2, h3 { color: #1a237e; border-bottom: 2px solid #3f51b5; padding-bottom: 8px; }
                .controls-fieldset { border: 1px solid #ccc; border-radius: 8px; padding: 16px; margin-bottom: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem 2rem; }
                .controls-fieldset legend { font-weight: bold; color: #3f51b5; padding: 0 8px; }
                .control-group { display: flex; flex-direction: column; gap: 8px; }
                .control-group label { font-weight: 500; }
                .control-group input { width: 100%; box-sizing: border-box; }
                .button-group { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
                .button-group button { padding: 10px 15px; font-size: 16px; cursor: pointer; border: none; border-radius: 4px; background-color: #3f51b5; color: white; transition: background-color 0.2s ease; }
                .button-group button:hover:not(:disabled) { background-color: #303f9f; }
                .button-group button:disabled { background-color: #9e9e9e; cursor: not-allowed; }
                .revelacao-progressao { grid-column: 1 / -1; margin-top: 10px; padding: 12px; background-color: #e8eaf6; border-left: 4px solid #3f51b5; font-size: 1.2rem; text-align: center; }
                .revelacao-progressao strong { margin: 0 8px; }

                .acorde-selector summary { cursor: pointer; font-weight: 500; padding: 8px; border: 1px solid #ccc; border-radius: 4px; list-style: none; }
                .acorde-selector summary::-webkit-details-marker { display: none; }
                .acorde-selector summary::after { content: ' ▼'; }
                .acorde-selector[open] summary::after { content: ' ▲'; }
                .acorde-options { margin-top: 5px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; max-height: 150px; overflow-y: auto; }
                .acorde-option { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
                .acorde-option label { font-weight: normal; }
            `}</style>
            <div className="main-container">
                <h2>Teclado virtual - treinamento de acordes</h2>
                <fieldset className="controls-fieldset">
                    <legend>Controles do Exercício</legend>
                    
                    <div className="control-group">
                        <label>Tipos de Acordes</label>
                        <details className="acorde-selector">
                            <summary>Selecionar ({tiposDeAcordesSelecionados.length})</summary>
                            <div className="acorde-options">
                                {Object.entries(definicoesAcordes).map(([key, { nome }]) => (
                                    <div key={key} className="acorde-option">
                                        <input
                                            type="checkbox"
                                            id={`acorde-${key}`}
                                            checked={tiposDeAcordesSelecionados.includes(key)}
                                            onChange={() => handleTipoAcordeChange(key)}
                                        />
                                        <label htmlFor={`acorde-${key}`}>{nome}</label>
                                    </div>
                                ))}
                            </div>
                        </details>
                    </div>

                    <div className="control-group">
                        <label htmlFor="num-acordes">Nº de Acordes na Progressão: {numAcordes}</label>
                        <input type="range" id="num-acordes" min="1" max="6" step="1" value={numAcordes} onChange={e => setNumAcordes(Number(e.target.value))} />
                    </div>

                    <div className="control-group">
                        <label htmlFor="bpm">BPM: {bpm}</label>
                        <input type="range" id="bpm" min="40" max="200" step="10" value={bpm} onChange={e => setBpm(Number(e.target.value))} />
                    </div>
                    
                    <div className="control-group">
                        <label htmlFor="repeticoes">Repetições: {repeticoes}</label>
                        <input type="range" id="repeticoes" min="1" max="5" step="1" value={repeticoes} onChange={e => setRepeticoes(Number(e.target.value))} />
                    </div>

                    <div className="button-group">
                        <button onClick={handleTocarProgressao} disabled={isPlaying}>Tocar Progressão</button>
                        <button onClick={handleRepetirProgressao} disabled={!ultimaProgressao || isPlaying}>Repetir</button>
                        <button onClick={() => setProgressaoRevelada(true)} disabled={!ultimaProgressao || isPlaying}>Revelar</button>
                    </div>

                    {progressaoRevelada && ultimaProgressao && (
                        <div className="revelacao-progressao" aria-live="polite">
                            <span>A progressão foi:</span>
                            {ultimaProgressao.map((acorde, index) => (
                                <strong key={index}>{acorde.fundamental}{definicoesAcordes[acorde.tipo]?.nome.match(/\((.*?)\)/)?.[1] || acorde.tipo.replace('maior', '')}</strong>
                            )).reduce((prev, curr) => [prev, ' - ', curr])}
                        </div>
                    )}
                </fieldset>

                <h3 style={{ marginTop: '2rem' }}>Teclado Interativo</h3>
                <Piano 
                    oitavaInicial={3} 
                    oitavaFinal={4} 
                    tocarNota={handlePianoKeyClick} 
                    notasPressionadas={notasPressionadas} 
                />
            </div>
        </>
    );
};