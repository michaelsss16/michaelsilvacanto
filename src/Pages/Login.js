import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY_USUARIO = 'usuario_logado';

export default function Login({ onLogin }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha === '1234') {
      // salvar nome no localStorage semelhante às respostas
      try {
        localStorage.setItem(STORAGE_KEY_USUARIO, JSON.stringify({ nome }));
      } catch (err) {
        // se falhar, seguimos sem bloquear o fluxo
      }
      if (onLogin) onLogin(nome);
      navigate('/');
    } else {
      alert('Senha incorreta! Envie uma mensagem pelo whatsapp para acessar os conteúdos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Digite a senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Entrar</button>
    </form>
  );
}
