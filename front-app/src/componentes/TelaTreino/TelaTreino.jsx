import { useState, useEffect } from 'react';
import styles from './TelaTreino.module.css';

export function TelaTreino() {
  const [exerciciosApi, setExerciciosApi] = useState([]);
  const [exercicioAtual, setExercicioAtual] = useState('');
  const [listaTreino, setListaTreino] = useState([]);

  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [objetivo, setObjetivo] = useState('Hipertrofia');

  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/exercicio')
      .then((res) => res.json())
      .then((data) => {
        setExerciciosApi(data);
        if (data.length > 0) setExercicioAtual(data[0].nome);
      })
      .catch(() => {});
  }, []);

  function handleAdd() {
    if (exercicioAtual && !listaTreino.includes(exercicioAtual)) {
      setListaTreino([...listaTreino, exercicioAtual]);
    }
  }

  function handleRemove(item) {
    setListaTreino(listaTreino.filter((ex) => ex !== item));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (listaTreino.length === 0) {
      setStatus('Selecione ao menos um exercício.');
      return;
    }

    const payload = {
      nome,
      peso: Number(peso),
      altura: Number(altura),
      objetivo,
      treinoPersonalizado: listaTreino.join(', ')
    };

    try {
      const res = await fetch('http://localhost:8080/perfil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStatus('ok');
        setNome('');
        setPeso('');
        setAltura('');
        setListaTreino([]);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>Novo Treino</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Nome do aluno</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label>Peso (kg)</label>
            <input 
              type="number" 
              step="0.1" 
              value={peso} 
              onChange={(e) => setPeso(e.target.value)} 
              required 
            />
          </div>

          <div className={styles.field}>
            <label>Altura (m)</label>
            <input 
              type="number" 
              step="0.01" 
              value={altura} 
              onChange={(e) => setAltura(e.target.value)} 
              required 
            />
          </div>
        </div>

        <div className={styles.field}>
          <label>Objetivo</label>
          <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)}>
            <option value="Hipertrofia">Hipertrofia</option>
            <option value="Emagrecimento">Emagrecimento</option>
            <option value="Resistência">Resistência</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Exercícios disponíveis</label>
          <div className={styles.row}>
            <select value={exercicioAtual} onChange={(e) => setExercicioAtual(e.target.value)}>
              {exerciciosApi.map((ex) => (
                <option key={ex.id} value={ex.nome}>
                  {ex.nome} ({ex.categoria})
                </option>
              ))}
            </select>
            <button type="button" className={styles.btnAdd} onClick={handleAdd}>
              Adicionar
            </button>
          </div>
        </div>

        <div className={styles.list}>
          <p style={{ fontSize: '13px', color: '#8b949e', marginBottom: '8px' }}>
            Exercícios no treino ({listaTreino.length})
          </p>
          {listaTreino.map((ex) => (
            <div key={ex} className={styles.item}>
              <span>{ex}</span>
              <button type="button" className={styles.btnRemove} onClick={() => handleRemove(ex)}>
                Remover
              </button>
            </div>
          ))}
        </div>

        {status === 'ok' && <p className={styles.msgOk}>Perfil e treino salvos no banco!</p>}
        {status === 'error' && <p className={styles.msgError}>Erro ao conectar com a API.</p>}
        {status && status !== 'ok' && status !== 'error' && <p className={styles.msgError}>{status}</p>}

        <button type="submit" className={styles.btnSubmit}>
          Salvar Ficha
        </button>
      </form>
    </div>
  );
}