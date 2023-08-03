import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch data from the /pokes3 endpoint
    fetch('/pokes3')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        return response.json(); // Parse the response body as JSON
      })
      .then(data => {
        console.log(data);
        setData(data.poke);
      })
      .catch(error => {
        console.log('js so fun');
        setError(error.message);});
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredData = data.filter(pokemon => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      pokemon.name.toLowerCase().includes(searchTerm) ||
      pokemon.national_id.toString().includes(searchTerm)
    );
  });

  return (
    <div className="App">
      <h1>Pokemon Data</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name or national ID"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ width: '400px', marginLeft: '20px' }}
        />
      </div>
      {filteredData.length > 0 ? (
        <div className="scroll-container">
          <ul style={{ margin: 0, padding: 0 }}>
            {filteredData.map(pokemon => (
              <li key={pokemon.national_id} style={{ margin: '0', padding: '0', marginBottom: '0px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={`data:image/png;base64,${Buffer.from(pokemon.icon_1.data).toString('base64')}`}
                    alt={`${pokemon.name} Icon`}
                    style={{ width: '32px', height: '32px', marginRight: '10px', marginLeft: '20px' }}
                  />
                  <h2>{pokemon.national_id + ': ' + pokemon.name}</h2>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No matching Pokemon found.</p>
      )}
    </div>
  );
}

export default App;
