import { useEffect, useState } from 'react';
import styles from './TelaTreino.module.css';

export function TelaTreino() {
  const [opcoesExercicios, setOpcoesExercicios] = useState([]);
  const [exercicioSelecionado, setExercicioSelecionado] = useState('');
  const [listaTreino, setListaTreino] = useState([]);
  
  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [objetivo, setObjetivo] = useState('Hipertrofia');

  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    const buscarExercicios = async () => {
      try {
        const res = await fetch('http://localhost:8080/exercicio');
        if (res.ok) {
          const dados = await res.json();
          setOpcoesExercicios(dados);
          if (dados.length > 0) setExercicioSelecionado(dados[0].nome);
        }
      } catch (err) {
        console.error('Erro ao carregar opções de exercícios:', err);
      }
    };
    buscarExercicios();
  }, []);

  const adicionarNaLista = () => {
    if (exercicioSelecionado && !listaTreino.includes(exercicioSelecionado)) {
      setListaTreino([...listaTreino, exercicioSelecionado]);
    }
  };

  const removerDaLista = (item) => {
    setListaTreino(listaTreino.filter((e) => e !== item));
  };

  const salvarPerfilETreino = async (e) => {
    e.preventDefault();
    if (listaTreino.length === 0) {
      setMensagem({ tipo: 'erro', texto: 'Adicione pelo menos um exercício à sua lista de treino!' });
      return;
    }

    setCarregando(true);
    setMensagem(null);

    const novoPerfil = {
      nome,
      peso: parseFloat(peso),
      altura: parseFloat(altura),
      objetivo,
      treinoPersonalizado: listaTreino.join(', ')
    };

    try {
      const res = await fetch('http://localhost:8080/perfil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoPerfil)
      });

      if (!res.ok) throw new Error('Erro ao salvar no banco de dados.');

      setMensagem({ tipo: 'sucesso', texto: 'Perfil e treino salvos com sucesso!' });
      setNome('');
      setPeso('');
      setAltura('');
      setListaTreino([]);
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: err.message });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Montar Treino e Salvar no Perfil</h2>

      <form onSubmit={salvarPerfilETreino}>
        <div className={styles.secaoForm}>
          <div className={styles.campo}>
            <label>Nome Completo:</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} required placeholder="Ex: Gustavo Henrique" />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div className={`${styles.campo} ${styles.flex1}`}>
              <label>Peso (kg):</label>
              <input type="number" step="0.1" value={peso} onChange={(e) => setPeso(e.target.value)} required placeholder="75.0" />
            </div>

            <div className={`${styles.campo} ${styles.flex1}`}>
              <label>Altura (m):</label>
              <input type="number" step="0.01" value={altura} onChange={(e) => setAltura(e.target.value)} required placeholder="1.75" />
            </div>
          </div>

          <div className={styles.campo}>
            <label>Objetivo:</label>
            <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)}>
              <option value="Hipertrofia">Hipertrofia</option>
              <option value="Emagrecimento">Emagrecimento</option>
              <option value="Resistência">Resistência</option>
            </select>
          </div>
        </div>

        <hr style={{ margin: '20px 0' }} />

        <div className={styles.secaoForm}>
          <h3>Selecione os Exercícios da sua Lista</h3>
          <div className={styles.seletorExercicio} style={{ marginTop: '10px' }}>
            <select value={exercicioSelecionado} onChange={(e) => setExercicioSelecionado(e.target.value)}>
              {opcoesExercicios.map((ex) => (
                <option key={ex.id} value={ex.nome}>
                  {ex.nome} ({ex.categoria})
                </option>
              ))}
            </select>
            <button type="button" className={styles.botaoAdicionar} onClick={adicionarNaLista}>
              + Adicionar
            </button>
          </div>
        </div>

        <div className={styles.listaCard}>
          <h4>Sua Lista de Treino ({listaTreino.length} itens)</h4>
          {listaTreino.length === 0 ? (
            <p style={{ color: '#718096', marginTop: '8px' }}>Nenhum exercício adicionado ainda.</p>
          ) : (
            <ul style={{ listStyle: 'none', marginTop: '10px' }}>
              {listaTreino.map((item) => (
                <li key={item} className={styles.itemExercicio}>
                  <span>{item}</span>
                  <button type="button" className={styles.botaoRemover} onClick={() => removerDaLista(item)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {mensagem && (
          <p style={{ color: mensagem.tipo === 'sucesso' ? 'green' : 'red', marginBottom: '12px', fontWeight: 'bold' }}>
            {mensagem.texto}
          </p>
        )}

        <button type="submit" className={styles.botaoSalvar} disabled={carregando}>
          {carregando ? 'Salvando...' : 'Salvar Perfil e Treino'}
        </button>
      </form>
    </div>
  );
}