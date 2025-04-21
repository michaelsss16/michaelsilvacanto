import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ filePath }) => {
  const [content, setContent] = useState(''); // Estado para armazenar o conteúdo do Markdown

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

  return (
    <div className="prose mx-auto p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
