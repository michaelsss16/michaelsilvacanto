import React, { useState } from 'react';
import { getPageTitleFromPath } from '../Util/pageTitles';

const LessonActions = () => {
  const [shareStatus, setShareStatus] = useState('');

  const getCurrentLessonTitle = () => {
    const path = window.location.hash
      ? window.location.hash.replace(/^#/, '')
      : window.location.pathname;

    return getPageTitleFromPath(path) || 'Aula de canto';
  };

  const shareLesson = async () => {
    const lessonUrl = window.location.href;
    const title = getCurrentLessonTitle();
    const shareText = `Confira esta aula: ${title}\n${lessonUrl}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: shareText,
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
      </div>

      {shareStatus && (
        <span className="text-sm text-gray-600">{shareStatus}</span>
      )}
    </div>
  );
};

export default LessonActions;
