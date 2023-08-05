// export default App;

import React, { useState, useEffect } from 'react';
import ReactLoading from "react-loading";
import { Buffer } from 'buffer';
import logo from './moe.png';
import PreLoader1 from "./components/PreLoader1";


function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [done, setDone] = useState(undefined);
  const spriteDimensions = 100;

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
        setDone(true);
      }, 2000)
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
    <div className="App" style={{ display: 'flex', height: '100vh' }}>


      {/* Left Container */}
      <div className="left-container" style={{ width: '400px', textAlign: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <img src={logo} alt={`Logo`} style={{ width: '120px' }} />
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
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '40px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          />
        </div>
        {!done ? (
          <div style = {{ display: 'flex', justifyContent: 'center' }}><PreLoader1 /></div>
          // <div>Loading</div>
        ) : filteredData.length > 0 ? (
          <div className="scroll-container" style = {{ maxHeight: '250px', minHeight: '250px' }} >
            <ul style={{ margin: 0, padding: 0 }}>
              {filteredData.map((pokemon, index) => (
                <li
                  key={pokemon.national_id}
                  style={{
                    margin: '0',
                    padding: '0',
                    marginBottom: '0px',
                    backgroundColor:
                      index % 2 === 0 ? '#f3fce3' : '#ffffff',
                    width: '100%',
                  }}
                >
                  <button
                    onClick={() => fetchSprite(pokemon.national_id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      width: '100%',
                    }}
                  >
                    <img
                      src={`data:image/png;base64,${Buffer.from(
                        pokemon.icon_1.data
                      ).toString('base64')}`}
                      alt={`${pokemon.name} Icon`}
                      style={{
                        width: '32px',
                        height: '32px',
                        marginRight: '10px',
                        marginLeft: '20px',
                      }}
                    />
                    <h2>{pokemon.national_id + ': ' + pokemon.name}</h2>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p style= {{ minHeight: '218px',  fontWeight: 'bold', color: 'red'}}>No matching Pokémon found.</p>
        )}
        

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            padding: '20px',
            // marginTop: '-5px',
            gap: '10px',
            // margin: '20px 0',
          }}
        >
        <button style={{ backgroundColor: '#f3fce3', height: '100px' }} onClick={() => alert('Slot 1')}>
          {/* Content for the first cell of the grid */}
        </button>
        <button style={{ backgroundColor: '#f3fce3', height: '100px' }} onClick={() => alert('Slot 2')}>
          {/* Content for the second cell of the grid */}
        </button>
        <button style={{ backgroundColor: '#f3fce3', height: '100px' }} onClick={() => alert('Slot 3')}>
          {/* Content for the third cell of the grid */}
        </button>
        <button style={{ backgroundColor: '#f3fce3', height: '100px' }} onClick={() => alert('Slot 4')}>
          {/* Content for the fourth cell of the grid */}
        </button>
        <button style={{ backgroundColor: '#f3fce3', height: '100px' }} onClick={() => alert('Slot 8')}>
          {/* Content for the fifth cell of the grid */}
        </button>
        <button style={{ backgroundColor: '#f3fce3', height: '100px' }} onClick={() => alert('Slot 6')}>
          {/* Content for the sixth cell of the grid */}
        </button>
        </div>
        
        <h3 style = {{  marginTop: '0px',
                        marginBottom: '0px'}}>Party</h3>
      </div>
  
      {/* Right Container */}
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f0f0f0',
        }}
      >
        {/* Your content for the right container */}
        {selectedPokemon ? (
          <div>
            <h2>Selected Pokémon</h2>
            <img
              src={`data:image/png;base64,${Buffer.from(
                selectedPokemon.sprite.data
              ).toString('base64')}`}
              alt={`${selectedPokemon.name} Sprite`}
              style={{ width: '64px', height: spriteDimensions, width: spriteDimensions }}
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
