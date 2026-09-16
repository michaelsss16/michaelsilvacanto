import React, { useEffect, useState } from 'react';

const LessonActions = ({ filePath }) => {
  const [content, setContent] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [shareStatus, setShareStatus] = useState('');

  useEffect(() => {
    if (!filePath) {
      return;
    }

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
        setContent('');
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

  const shareLesson = async () => {
    const lessonUrl = window.location.href;
    const title = document.title || 'Aula de canto';
    const shareText = `Confira esta aula: ${title}\n${lessonUrl}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: 'Confira esta aula do curso de canto.',
          url: lessonUrl,
        });
        setShareStatus('Aula compartilhada!');
        window.setTimeout(() => setShareStatus(''), 2000);
        return;
      }

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setShareStatus('Abrindo opções de compartilhamento...');
      window.setTimeout(() => setShareStatus(''), 2500);
    } catch (err) {
      if (err && err.name === 'AbortError') {
        return;
      }

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setShareStatus('Compartilhamento alternativo aberto.');
      window.setTimeout(() => setShareStatus(''), 2500);
    }
  };

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-5">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={shareLesson}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Compartilhar aula
        </button>

        <button
          type="button"
          onClick={copyLessonText}
          disabled={!content}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Copiar aula
        </button>
      </div>

      {(copyStatus || shareStatus) && (
        <span className="text-sm text-gray-600">{copyStatus || shareStatus}</span>
      )}
    </div>
  );
};

export default LessonActions;
