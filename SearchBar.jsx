// SearchBar.jsx
import { useState } from 'react';
import axios from 'axios';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await axios.get(`http://localhost:5000/search?q=${query}`);
    setResults(res.data);
  };

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={search}>Search</button>
      <ul>
        {results.map((r, i) => (
          <li key={i}>
            <strong>{r.title}</strong><br />
            <a href={r.url}>{r.url}</a><br />
            <small>{r.content.slice(0, 150)}...</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
