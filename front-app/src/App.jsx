import { useState } from 'react';
import { TelaTreino } from './componentes/TelaTreino/TelaTreino';
import { TelaPerfil } from './componentes/TelaPerfil/TelaPerfil';
import './App.css';

export default function App() {
  const [aba, setAba] = useState('montar');

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">
          GymRat <span>Customizer</span>
        </h1>

        <div className="tabs">
          <button 
            type="button"
            className={`tab ${aba === 'montar' ? 'tabActive' : ''}`}
            onClick={() => setAba('montar')}
          >
            Montar Treino
          </button>
          <button 
            type="button"
            className={`tab ${aba === 'perfis' ? 'tabActive' : ''}`}
            onClick={() => setAba('perfis')}
          >
            Ver Perfis
          </button>
        </div>
      </header>

      <main>
        {aba === 'montar' && <TelaTreino />}
        {aba === 'perfis' && <TelaPerfil />}
      </main>
    </div>
  );
}