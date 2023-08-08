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
  const [checkedPokemons, setCheckedPokemons] = useState({});
  const spriteDimensions = 250;

  

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

  //i didn't write this yo
  const handleCheckboxChange = (pokemonId) => {
    setCheckedPokemons((prevChecked) => ({
      ...prevChecked,
      [pokemonId]: !prevChecked[pokemonId],
    }));

    // Perform an action when a checkbox is checked
    console.log(`Checkbox for Pokémon ID ${pokemonId} is now ${!checkedPokemons[pokemonId]}`);
  };

  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>

      {/* Left Container */}
      <div className="left-container" style={{ width: '470px', textAlign: 'center', backgroundColor: '#EEEEEE' }}>

        {/* Top-Left Container */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
          <div>
            <img src={logo} alt={`Logo`} style={{ width: '120px' }} />
          </div>
          <div style={{ padding: '0', margin: '0' }}>
            <h1 style={{ fontSize: '25px', margin: '0', marginLeft: '10px'}}>PokéMoe Data</h1>
            {/* insert a description */}
            &lt;3
          </div>
        </div>

        {/* Search Bar Container */}
        <div style={{ padding: '0', marginLeft: '35px', marginRight: '35px' }}>
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
              borderRadius: '10px'
            }}
          />
        </div>

        {!done ? (
          <div style = {{ display: 'flex', justifyContent: 'center' }}><PreLoader1 /></div>
          // <div>Loading</div>
        ) : filteredData.length > 0 ? (
          <div style = {{padding: '20px'}}>
    <div className="scroll-container" style={{ maxHeight: '250px', minHeight: '250px', borderRadius: '10px' }}>
      <ul style={{ margin: 0, padding: 0 }}>
        {filteredData.map((pokemon, index) => (
          <li
            key={pokemon.national_id}
            style={{
              margin: '0',
              padding: '0',
              marginBottom: '0px',
              backgroundColor: index % 2 === 0 ? '#e3e3e3' : '#ffffff',
              width: '100%',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <input
                type="checkbox"
                checked={checkedPokemons[pokemon.national_id]}
                onChange={() => handleCheckboxChange(pokemon.national_id)}
                style={{ marginRight: '10px', marginLeft: '20px' }}
              />
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
                  src={`data:image/png;base64,${Buffer.from(pokemon.icon_1.data).toString('base64')}`}
                  alt={`${pokemon.name} Icon`}
                  style={{
                    width: '32px',
                    height: '32px',
                    marginRight: '10px',
                  }}
                />
                <h2>{pokemon.national_id + ': ' + pokemon.name}</h2>
              </button>
            </label>
          </li>
        ))}
      </ul>
    </div>
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
            paddingTop: '0',
            paddingBottom: '0',
            gap: '10px',
            // margin: '20px 0',
          }}
        >
        <button style={{ backgroundColor: 'white', height: '100px', borderRadius: '10px' }} onClick={() => alert('Slot 1')}>
          {/* Content for the first cell of the grid */}
        </button>
        <button style={{ backgroundColor: 'white', height: '100px', borderRadius: '10px' }} onClick={() => alert('Slot 2')}>
          {/* Content for the second cell of the grid */}
        </button>
        <button style={{ backgroundColor: 'white', height: '100px', borderRadius: '10px' }} onClick={() => alert('Slot 3')}>
          {/* Content for the third cell of the grid */}
        </button>
        <button style={{ backgroundColor: 'white', height: '100px', borderRadius: '10px' }} onClick={() => alert('Slot 4')}>
          {/* Content for the fourth cell of the grid */}
        </button>
        <button style={{ backgroundColor: 'white', height: '100px', borderRadius: '10px' }} onClick={() => alert('Slot uwu')}>
          {/* Content for the fifth cell of the grid */}
        </button>
        <button style={{ backgroundColor: 'white', height: '100px', borderRadius: '10px' }} onClick={() => alert('Slot 6')}>
          {/* Content for the sixth cell of the grid */}
        </button>
        </div>
        
        <h3 style = {{  marginTop: '0px', marginBottom: '0px'}}>Party</h3>
      </div>
  
      {/* Middle Container */}
      <div
        style={{
          display: 'flex', // Use flex display to arrange items side by side
          width: '100%',
          textAlign: 'left',
          padding: '20px',
          backgroundColor: 'white',
          // backgroundColor: '#f8fcf3',
        }}>
            {/* Sprite Image */}
            {selectedPokemon ? (
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
                <img
                  src={`data:image/png;base64,${Buffer.from(
                    selectedPokemon.sprite.data
                  ).toString('base64')}`}
                  alt={`${selectedPokemon.name} Sprite`}
                  style={{ width: spriteDimensions, marginBottom: '15px' }}
                />
                
                {/* Base Stat Container */}
                <div  style={{ padding: '10px', marginBottom: '20px', display: 'flex', flexDirection: 'column', borderRadius: '10px', backgroundColor: '#eeeeee'}}>
                  <h2 style={{margin: '0', padding: '0' }}>ATK</h2>
                  <h2 style={{margin: '0', padding: '0' }}>DEF</h2>
                  <h2 style={{margin: '0', padding: '0' }}>SP. ATK</h2>
                  <h2 style={{margin: '0', padding: '0' }}>SP. DEF</h2>
                  <h2 style={{margin: '0', padding: '0' }}>HP</h2>
                  <h2 style={{margin: '0', padding: '0' }}>SPD</h2>
                </div>

                {/* Other Info Container */}
                <div  style={{ padding: '10px', display: 'flex', flexDirection: 'column', borderRadius: '10px', backgroundColor: '#eeeeee' }}>
                  <h3 style={{margin: '0', padding: '0' }}>height</h3>
                  <h3 style={{margin: '0', padding: '0' }}>weight</h3>
                  <h3 style={{margin: '0', padding: '0' }}>gender rate</h3>
                  <h3 style={{margin: '0', padding: '0' }}>catch rate</h3>
                  <h3 style={{margin: '0', padding: '0' }}>level rate</h3>
                </div>

              </div>
            ) : null}        

            {/* Name Container */}
            {selectedPokemon ? (
              <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', borderRadius: '10px', backgroundColor: '#dedede' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', borderRadius: '10px' }}>
                      {/* <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', marginRight: '30px', backgroundColor: 'white' }}> */}
                      <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', marginRight: '30px' }}>
                        <h1 style={{margin: '0', padding: '0' }}>Pokémon Name</h1>
                        <h2 style={{margin: '0', padding: '0' }}>#123</h2>

                        {/* Type Container */}
                        <div style={{ display: 'flex', flexDirection: 'row'}}>
                          <h3 style = {{marginRight: '20px'}}>Type 1</h3>
                          <h3>Type 2</h3>
                        </div>
                      </div>

                      <div style ={{ flex: 1, textAlign: 'right', alignItems: 'right' }}>
                        Evolves from or maybe arrow buttons go here
                      </div>

                    </div>

                    {/* Location Container */}
                    <div  style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', padding: '10px', borderRadius: '10px', backgroundColor: '#eeeeee'}}>
                      <h2 style = {{margin: '0px'}}>Location Description</h2>
                      You can find this pokemon in the dirt where you live. Here is some other information you might find helpful. Just kidding. Now I wonder if this description will run off the page. Oh it didn't. I guess that's good. Should I eat ice cream?
                    </div>

                    {/* Ability List Container */}
                    <div  style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', padding: '10px', borderRadius: '10px', backgroundColor: '#eeeeee'}}>
                      <h2 style = {{margin: '0px'}}>Ability List</h2>
                      insert list of poke abilities, idk how
                    </div>
                    
                    {/* Evolves To Container */}
                    <div  style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', padding: '10px', borderRadius: '10px', backgroundColor: '#eeeeee'}}>
                      <h2 style = {{margin: '0px'}}>Evolves to:</h2>
                      a better pokemon

                      <p style = {{fontWeight: 'bold'}}>(these are placeholders. i hope you knew that.) </p>
                      currently:<br />
                      - i tried making the sections as neat as possible. this way we can just add the code into each section once we get the endpoints working<br />
                      - checkboxes do NOTHING. we also need a way to filter by caught/uncaught pokemon<br />
                      - i want to add arrows to easily go between each pokemon by index<br />
                      - the container on the right is there until i understand how to call the pokemon's type. then we can do the cool backgrounds<br />
                    </div>
              </div>
            ) : null}        
          </div>     

      {/* Right Container */}
      <div style={{ display: 'flex', width: '100px'}}>
        {/* This part contains the content */}
        {selectedPokemon ? (
          <div>
            <img
              src={`data:image/png;base64,${Buffer.from(
                selectedPokemon.sprite.data
              ).toString('base64')}`}
              alt={`${selectedPokemon.name} Sprite`}
              style={{ maxWidth: '100%', height: '100%' }}
            />
          </div>
        ) : null}  
      </div>            
        
    </div>
  );
  
}

export default App;
