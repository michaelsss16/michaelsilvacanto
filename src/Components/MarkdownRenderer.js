import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ filePath }) => {
  const [content, setContent] = useState(''); // Estado para armazenar o conteúdo do Markdown
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    // Verifica se o arquivo está sendo acessado corretamente
    fetch(filePath)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao carregar o arquivo Markdown');
        }
        return res.text();
      })
      .then(setContent)
      .catch((err) => {
        console.error(err);
        setContent('# Erro ao carregar conteúdo');
      });
  }, [filePath]);

  const copyLessonText = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyStatus('A aula foi copiada!');
      window.setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      console.error('Erro ao copiar aula:', err);
      setCopyStatus('Não foi possível copiar.');
      window.setTimeout(() => setCopyStatus(''), 3000);
    }
  };

  return (
    <div className="prose mx-auto p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
      <div className="mt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={copyLessonText}
          disabled={!content}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Copiar aula
        </button>
        {copyStatus && <span className="text-sm text-gray-600">{copyStatus}</span>}
      </div>
    </div>
  );
};

export default MarkdownRenderer;
