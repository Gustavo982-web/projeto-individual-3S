import { useState } from 'react';
import { TelaTreino } from './componentes/TelaTreino/TelaTreino';
import { TelaPerfil } from './componentes/TelaPerfil/TelaPerfil';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('montar');

  return (
    <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#1a202c', marginBottom: '16px' }}>FitControl</h1>
        
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={() => setAbaAtiva('montar')}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: abaAtiva === 'montar' ? '#3182ce' : '#e2e8f0',
              color: abaAtiva === 'montar' ? '#ffffff' : '#2d3748',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            1. Montar Treino
          </button>

          <button
            onClick={() => setAbaAtiva('perfis')}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: abaAtiva === 'perfis' ? '#3182ce' : '#e2e8f0',
              color: abaAtiva === 'perfis' ? '#ffffff' : '#2d3748',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            2. Ver Perfis
          </button>
        </nav>
      </header>

      <main>
        {abaAtiva === 'montar' ? <TelaTreino /> : <TelaPerfil />}
      </main>
    </div>
  );
}