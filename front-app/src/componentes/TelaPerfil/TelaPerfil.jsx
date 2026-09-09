import { useState, useEffect } from 'react';
import styles from './TelaPerfil.module.css';

export function TelaPerfil() {
  const [perfis, setPerfis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/perfil')
      .then((res) => (res.status === 204 ? [] : res.json()))
      .then((data) => {
        setPerfis(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: '#8b949e', textAlign: 'center' }}>Carregando dados...</p>;

  return (
    <div className={styles.grid}>
      {perfis.length === 0 ? (
        <p style={{ color: '#8b949e', textAlign: 'center' }}>Nenhum perfil cadastrado.</p>
      ) : (
        perfis.map((p, index) => {
          // Converte a string de volta em um array de exercícios
          const exercicios = p.treinoPersonalizado ? p.treinoPersonalizado.split(', ') : [];

          return (
            <div key={p.id} className={styles.card}>
              <div className={styles.head}>
                <div>
                  <span className={styles.treinoNum}>Treino #{index + 1}</span>
                  <h3 className={styles.name}>{p.nome}</h3>
                </div>
                <span className={styles.badge}>{p.objetivo}</span>
              </div>

              <p className={styles.details}>
                Peso: <strong>{p.peso} kg</strong> • Altura: <strong>{p.altura} m</strong>
              </p>

              <div className={styles.tableBox}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ width: '50px' }}>#</th>
                      <th>Exercício</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercicios.length === 0 ? (
                      <tr>
                        <td colSpan="2" style={{ textAlign: 'center', color: '#8b949e' }}>
                          Nenhum exercício cadastrado.
                        </td>
                      </tr>
                    ) : (
                      exercicios.map((ex, i) => (
                        <tr key={i}>
                          <td className={styles.numCol}>{i + 1}</td>
                          <td>{ex}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}