
import React, { useState } from 'react';

const articles = [
  { id: 1, title: "Artigo 1", content: "O empregado tem direito a..." },
  { id: 2, title: "Artigo 2", content: "É assegurado ao trabalhador..." },
  { id: 3, title: "Artigo 3", content: "Todo contrato deve conter..." }
];

export default function CltSearch() {
  const [query, setQuery] = useState("");

  const results = articles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Consulta à CLT</h2>
      <input
        type="text"
        placeholder="Digite o termo..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '8px', width: '100%', maxWidth: '400px' }}
      />
      <ul>
        {results.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
