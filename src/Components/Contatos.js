import React from 'react';

export function WhatsappButton() {
  const numero = '5531994662740';
  const mensagemPadrao = encodeURIComponent('Estou interessado nas aulas de canto.');
  const link = `https://api.whatsapp.com/send?phone=${numero}&text=${mensagemPadrao}`;

  const abrirWhatsapp = () => {
    window.open(link, '_blank');
  };

  return (
    <button onClick={abrirWhatsapp} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
      <img
        src="https://img.icons8.com/ios-filled/30/25D366/whatsapp.png"
        alt="WhatsApp"
        width="30"
        height="30"
      />
    </button>
  );
}

export function YoutubeButton() {
  const link = 'https://www.youtube.com/@michaelsilvaoficial8208';

  const abrirYoutube = () => {
    window.open(link, '_blank');
  };

  return (
    <button onClick={abrirYoutube} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
      <img
        src="https://img.icons8.com/ios-filled/30/FF0000/youtube-play.png"
        alt="YouTube"
        width="30"
        height="30"
      />
    </button>
  );
}

export function InstagramButton() {
  const link = 'https://www.instagram.com/michael_silva_s_s/?igsh=MTQ4ejZsYWhhbDMyaw%3D%3D#';

  const abrirInstagram = () => {
    window.open(link, '_blank');
  };

  return (
    <button onClick={abrirInstagram} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
      <img
        src="https://img.icons8.com/ios-filled/30/E4405F/instagram-new.png"
        alt="Instagram"
        width="30"
        height="30"
      />
    </button>
  );
}

export function Contatos() {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <WhatsappButton />
      <YoutubeButton />
      <InstagramButton />
    </div>
  );
}



