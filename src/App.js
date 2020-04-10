import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio 3 - Gostack turma 11`,
      url: 'github.com/franciscovaz/defafio3',
      techs: ['ReactJS'],
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if (repoIndex < 0) {
      alert('Repositório inexistente.');
    } else {
      repositories.splice(repoIndex, 1);
      setRepositories([...repositories]);
    }

    // setRepositories(respositories.filter(repository => repository.id !=== id))



  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
