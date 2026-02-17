import React, { useEffect, useState, useMemo, useRef } from "react";
import * as Tone from "tone";
import { Piano } from "./Piano";

const armazenamento = {
  get: (chave, def) => {
    try {
      const val = localStorage.getItem(chave);
      return val === null ? def : JSON.parse(val);
    } catch {
      return def;
    }
  },
  set: (chave, val) => {
    try {
      localStorage.setItem(chave, JSON.stringify(val));
    } catch {}
  },
};

const notasBase = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const sintetizadores = {
  AMSynth: Tone.AMSynth,
  FMSynth: Tone.FMSynth,
  MembraneSynth: Tone.MembraneSynth,
  DuoSynth: Tone.DuoSynth,
  MonoSynth: Tone.MonoSynth,
};

export const Teclado = () => {
  // Estados
  const [synth, setSynth] = useState(null);
  const [bpm, setBpm] = useState(() => armazenamento.get("bpm", 90));
  const [oitava, setOitava] = useState(() => armazenamento.get("oitava", 3));
  const [rep, setRep] = useState(() => armazenamento.get("rep", 1));
  const [sintetizadorTipo, setSintetizadorTipo] = useState(() =>
    armazenamento.get("sintetizadorTipo", "FMSynth")
  );
  const [escalaTipo, setEscalaTipo] = useState(() =>
    armazenamento.get("escalaTipo", "maior5")
  );
  const [escalaPersonalizada, setEscalaPersonalizada] = useState(() =>
    armazenamento.get("escalaPersonalizada", "0 2 4 5 7 9 11 12")
  );
  const sequenciaIdRef = useRef(0);

  // Monta synth conforme tipo
  useEffect(() => {
    if (synth) {
      synth.dispose();
    }
    const SynthClass = sintetizadores[sintetizadorTipo] || Tone.FMSynth;
    const poly = new Tone.PolySynth(SynthClass).toDestination();
    setSynth(poly);
  }, [sintetizadorTipo]);

  // Salva estados no localStorage
  useEffect(() => {
    armazenamento.set("bpm", bpm);
  }, [bpm]);
  useEffect(() => {
    armazenamento.set("oitava", oitava);
  }, [oitava]);
  useEffect(() => {
    armazenamento.set("rep", rep);
  }, [rep]);
  useEffect(() => {
    armazenamento.set("sintetizadorTipo", sintetizadorTipo);
  }, [sintetizadorTipo]);
  useEffect(() => {
    armazenamento.set("escalaTipo", escalaTipo);
  }, [escalaTipo]);
  useEffect(() => {
    armazenamento.set("escalaPersonalizada", escalaPersonalizada);
  }, [escalaPersonalizada]);

  // Definição das escalas
  const todasEscalas = {
    maior: [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0],
    menor: [0, 2, 3, 5, 7, 8, 10, 12, 10, 8, 7, 5, 3, 2, 0],
    maior5: [0, 2, 4, 5, 7, 5, 4, 2, 0],
    pentatonica: [0, 2, 4, 7, 9, 7, 4, 2, 0],
    harmonicaMenor: [0, 2, 3, 5, 7, 8, 11, 12, 11, 8, 7, 5, 3, 2, 0],
    dorica: [0, 2, 3, 5, 7, 9, 10, 12, 10, 9, 7, 5, 3, 2, 0],
    cromatica: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    personalizada: null, // será usado o input
  };
  

  // Calcula escala atual a partir da fórmula e oitava
  const escalaAtual = useMemo(() => {
    let formula = todasEscalas[escalaTipo];
    if (escalaTipo === "personalizada") {
      const nums = escalaPersonalizada
        .split(" ")
        .map((n) => parseInt(n))
        .filter((n) => !isNaN(n));
      formula = nums.length ? nums : [0];
    }
    if (!formula) return [];
    return formula.map((semi) => {
      const idx = (semi) % 12;
      const oitavaExtra = Math.floor(semi / 12);
      return notasBase[idx] + (oitava + oitavaExtra);
    });
  }, [oitava, escalaTipo, escalaPersonalizada]);

  // Função que toca a sequência da escala, repetições e BPM
  const tocarSequencia = async (notaInicial = "C4") => {
    if (!synth || !notaInicial) return;

    // Gera um ID único para esta execução.
    sequenciaIdRef.current += 1;
    const idAtual = sequenciaIdRef.current;

    await Tone.start();
    synth.releaseAll(); // Interrompe qualquer nota que esteja soando da sequência anterior
    const delayMs = (60 / bpm) * 1000;
  
    const [letra, ...resto] = notaInicial;
    const baseNota = notaInicial.slice(0, -1); // Ex: "C#" de "C#4"
    const baseOitava = parseInt(notaInicial.slice(-1)); // Oitava da nota clicada
  
    // Encontra índice da nota inicial na lista
    const indexNotaInicial = notasBase.indexOf(baseNota);
    if (indexNotaInicial === -1) return;
  
    // Pega fórmula da escala
    let formula = todasEscalas[escalaTipo];
    if (escalaTipo === "personalizada") {
      const nums = escalaPersonalizada
        .split(" ")
        .map((n) => parseInt(n))
        .filter((n) => !isNaN(n));
      formula = nums.length ? nums : [0];
    }
    if (!formula) return;
  
    // Calcula escala a partir da nota base
    const notasEscala = formula.map((semi) => {
      const totalSemitons = indexNotaInicial + semi;
      const notaIdx = totalSemitons % 12;
      const oitavaExtra = Math.floor((indexNotaInicial + semi) / 12);
      return notasBase[notaIdx] + (baseOitava + oitavaExtra);
    });
  
    // calculamos a duração em segundos para a nota se manter tocando
    // até a próxima. Com bpm lento, isso adapta o sustain automaticamente.
    const notaDuration = delayMs / 1000; // em segundos

    for (let r = 0; r < rep; r++) {
      // repetir primeira nota para dar tempo de preparação
      if (notasEscala.length > 0) {
        if (idAtual !== sequenciaIdRef.current) {
          return;
        }
        synth.triggerAttackRelease(notasEscala[0], notaDuration);
        await new Promise((res) => setTimeout(res, delayMs));
      }

      for (let nota of notasEscala) {
        // Verifica se outra sequência foi iniciada. Se sim, interrompe a atual.
        if (idAtual !== sequenciaIdRef.current) {
          return;
        }
        synth.triggerAttackRelease(nota, notaDuration);
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  };
  
  // Mapear teclas para notas começando em C
  const tecladoNotas = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const tecladoTeclas = [
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "ç",
    "~",
    "´",
  ]; // 12 teclas

  // Teclas de controle: q/w = bpm; z/x = repetições
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tecla = e.key.toLowerCase();
      if (tecladoTeclas.includes(tecla)) {
        e.preventDefault();
        const index = tecladoTeclas.indexOf(tecla);
        // Calcular nota + oitava
        const notaBase = tecladoNotas[index];
        const notaCompleta = notaBase + oitava;
        tocarSequencia(notaCompleta);
      } else if (tecla === "q") {
        e.preventDefault();
        setBpm((b) => Math.max(20, b - 5));
      } else if (tecla === "w") {
        e.preventDefault();
        setBpm((b) => Math.min(300, b + 5));
      } else if (tecla === "z") {
        e.preventDefault();
        setRep((r) => Math.max(1, r - 1));
      } else if (tecla === "x") {
        e.preventDefault();
        setRep((r) => Math.min(20, r + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [oitava, bpm, rep, escalaAtual]);

  return (
    <div style={{ maxWidth: 900, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Teclado Virtual - treinamento de escalas</h1>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="sintetizador" style={{ fontWeight: "bold" }}>
          Sintetizador:
        </label>
        <select
          id="sintetizador"
          value={sintetizadorTipo}
          onChange={(e) => setSintetizadorTipo(e.target.value)}
          aria-label="Selecionar sintetizador"
          style={{ width: "100%", marginTop: 4 }}
        >
          {Object.keys(sintetizadores).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="oitava" style={{ fontWeight: "bold" }}>
          Oitava Inicial:
        </label>
        <select
          id="oitava"
          value={oitava}
          onChange={(e) => setOitava(Number(e.target.value))}
          aria-label="Selecionar oitava"
          style={{ width: "100%", marginTop: 4 }}
        >
          {[1, 2, 3, 4, 5, 6].map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="bpm" style={{ fontWeight: "bold" }}>
          BPM: {bpm}
        </label>
        <input
          id="bpm"
          type="range"
          min={20}
          max={300}
          step={5}
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          aria-valuemin={20}
          aria-valuemax={300}
          aria-valuenow={bpm}
          aria-label="Definir BPM"
          style={{ width: "100%", marginTop: 4 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="rep" style={{ fontWeight: "bold" }}>
          Repetições: {rep}
        </label>
        <input
          id="rep"
          type="range"
          min={1}
          max={20}
          step={1}
          value={rep}
          onChange={(e) => setRep(Number(e.target.value))}
          aria-valuemin={1}
          aria-valuemax={20}
          aria-valuenow={rep}
          aria-label="Definir número de repetições"
          style={{ width: "100%", marginTop: 4 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="escala-tipo" style={{ fontWeight: "bold" }}>
          Escala:
        </label>
        <select
          id="escala-tipo"
          value={escalaTipo}
          onChange={(e) => setEscalaTipo(e.target.value)}
          aria-label="Selecionar tipo de escala"
          style={{ width: "100%", marginTop: 4 }}
        >
          <option value="maior">Maior</option>
          <option value="menor">Menor</option>
          <option value="maior5">Maior (5 notas)</option>
          <option value="pentatonica">Pentatônica</option>
          <option value="harmonicaMenor">Harmônica Menor</option>
          <option value="dorica">Dórica</option>
          <option value="cromatica">Cromática</option>
          <option value="personalizada">Personalizada</option>
        </select>

        {escalaTipo === "personalizada" && (
          <>
            <label
              htmlFor="escala-personalizada"
              style={{ marginTop: 8, display: "block", fontWeight: "bold" }}
            >
              Digite a sequência de semitons separados por espaço:
            </label>
            <input
              id="escala-personalizada"
              type="text"
              value={escalaPersonalizada}
              onChange={(e) => setEscalaPersonalizada(e.target.value)}
              placeholder="Exemplo: 0 1 2 3 4 5 6 7"
              aria-label="Sequência personalizada de semitons da escala"
              style={{
                width: "100%",
                padding: 6,
                fontSize: 16,
                marginTop: 4,
                boxSizing: "border-box",
              }}
            />
          </>
        )}
      </div>

      <Piano
        oitavaInicial={oitava}
        oitavaFinal={oitava + 1}
        tocarNota={tocarSequencia}
      />

      <details style={{ marginTop: 20, fontSize: 14 }}>
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          Atalhos de teclado
        </summary>
        <ul style={{ paddingLeft: 20, marginTop: 6 }}>
          <li>
            Teclas <kbd>a s d f g h j k l ç ~ ´</kbd>: Tocar escala iniciando na nota
            correspondente (C, C#, D, D#, E, F, F#, G, G#, A, A#, B)
          </li>
          <li>
            <kbd>q</kbd> / <kbd>w</kbd>: Diminuir / Aumentar BPM (passos de 5)
          </li>
          <li>
            <kbd>z</kbd> / <kbd>x</kbd>: Diminuir / Aumentar número de repetições
          </li>
        </ul>
      </details>
    </div>
  );
};
