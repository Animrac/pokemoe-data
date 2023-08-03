// export default App;

import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import logo from './moe.png';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    // Fetch data from the /pokes3 endpoint
    fetch('/pokes3')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.poke);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const fetchSprite = async (nationalId) => {
    try {
      const response = await fetch(`/pokeSprite/${nationalId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSelectedPokemon({ ...selectedPokemon, sprite: data.sprite });
    } catch (error) {
      console.error('Error fetching sprite:', error);
    }
  };

  const filteredData = data.filter(pokemon => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      pokemon.name.toLowerCase().includes(searchTerm) ||
      pokemon.national_id.toString().includes(searchTerm)
    );
  });

  return (
    <div className="App" style={{ display: 'flex' }}>
      {/* Left Container */}
      <div style={{ width: '400px', textAlign: 'center' }}>


      <div style={{ display: 'flex', alignItems: 'center' }}>
  <div>
    <img
      src={logo}
      alt={`Logo`}
      style={{ width: '120px' }}
    />
  </div>
  <div style={{ marginLeft: '10px' }}>
    <h1 style={{ fontSize: '24px' }}>PokéMoe Data</h1>
    <h2 style={{ fontSize: '16px' }}>&lt;3</h2>
  </div>
        </div>
        <div style={{ padding: '20px', marginTop: '-25px' }}>
          <input
            type="text"
            placeholder="Search by name or national ID"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%', // Change the width of the search rectangle here
              height: '40px', // Change the height of the search rectangle here
              fontSize: '16px', // Change the font size of the text inside the input
              fontWeight: 'bold'
            }}

          />
        </div>
        {filteredData.length > 0 ? (
          <div className="scroll-container">
            <ul style={{ margin: 0, padding: 0 }}>
              {filteredData.map((pokemon, index) => (
                <li key={pokemon.national_id} style={{ 
                margin: '0', 
                padding: '0', 
                marginBottom: '0px',
                backgroundColor: index % 2 === 0 ? '#f3fce3' : '#ffffff',
                width: '100%' }}>
                  <button
                    onClick={() => fetchSprite(pokemon.national_id)} // Fetch sprite when button is clicked
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      width: '100%'
                    }}
                  >
                    <img
                      src={`data:image/png;base64,${Buffer.from(pokemon.icon_1.data).toString('base64')}`}
                      alt={`${pokemon.name} Icon`}
                      style={{ width: '32px', height: '32px', marginRight: '10px', marginLeft: '20px' }}
                    />
                    <h2>{pokemon.national_id + ': ' + pokemon.name}</h2>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No matching Pokémon found.</p>
        )}
      </div>

      {/* Right Container */}
      <div style={{ width: '100%', textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f0' }}>
        {/* Your content for the right container */}
        {selectedPokemon ? (
          <div>
            <h2>Selected Pokémon</h2>
            <img
              src={`data:image/png;base64,${Buffer.from(selectedPokemon.sprite.data).toString('base64')}`}
              alt={`${selectedPokemon.name} Sprite`}
              style={{ width: '64px', height: '64px' }}
            />
            <p>{selectedPokemon.name}</p>
          </div>
        ) : (
          <h2>No Pokémon selected</h2>
        )}
      </div>
    </div>
  );
}

export default App;
