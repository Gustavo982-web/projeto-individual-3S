import { useEffect, useState } from 'react';
import styles from './TelaPerfil.module.css';

export function TelaPerfil() {
  const [perfis, setPerfis] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const buscarPerfis = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const res = await fetch('http://localhost:8080/perfil');
      
      if (res.status === 204) {
        setPerfis([]);
        return;
      }

      if (!res.ok) {
        throw new Error('Falha ao buscar perfis na API.');
      }

      const dados = await res.json();
      setPerfis(dados);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarPerfis();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Perfis e Treinos Cadastrados</h2>

      {carregando && <p style={{ textAlign: 'center' }}>Carregando perfis...</p>}
      {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}

      {!carregando && !erro && perfis.length === 0 && (
        <div className={styles.vazio}>
          <p>Nenhum perfil cadastrado no banco de dados.</p>
        </div>
      )}

      {!carregando && !erro && perfis.length > 0 && (
        <div className={styles.grid}>
          {perfis.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.headerCard}>
                <h3 className={styles.nome}>{item.nome}</h3>
                <span className={styles.tagObjetivo}>{item.objetivo}</span>
              </div>

              <div className={styles.detalhes}>
                <span><strong>Peso:</strong> {item.peso} kg</span>
                <span><strong>Altura:</strong> {item.altura} m</span>
              </div>

              <div className={styles.secaoTreino}>
                <p className={styles.subtituloTreino}>Treino Personalizado:</p>
                <p className={styles.listaTreinos}>
                  {item.treinoPersonalizado ? item.treinoPersonalizado : 'Nenhum exercício associado.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}