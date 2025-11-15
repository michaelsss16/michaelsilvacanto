import React from 'react';
import { Link } from 'react-router-dom';
import './LessonNav.css';

// Componente simples de navegação entre aulas de um módulo
// Props esperadas: modulo (número como string/ex: '1'), aulaAtual (número), totalAulas (número)
export default function LessonNav({ modulo, aulaAtual, totalAulas }) {
  const numeroAnterior = aulaAtual - 1;
  const numeroProximo = aulaAtual + 1;

  const buildPath = (mod, aulaNum) => {
    return `/modulo-${mod}/aula-${aulaNum}`;
  };

  const handleClickScrollTop = (e) => {
    // rolagem suave para o topo antes/nos clique
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      window.scrollTo(0, 0);
    }
    // permitimos que o Link proceda normalmente
  };

  return (
    <div className="lesson-nav" aria-hidden={false}>
      {numeroAnterior >= 1 ? (
        <Link to={buildPath(modulo, numeroAnterior)} onClick={handleClickScrollTop} className="btn">← Aula anterior</Link>
      ) : <div />}

      <div className="spacer" />

      {numeroProximo <= totalAulas ? (
        <Link to={buildPath(modulo, numeroProximo)} onClick={handleClickScrollTop} className="btn">Próxima aula →</Link>
      ) : <div />}
    </div>
  );
}
