// export default App;

import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import logo from './moe.png';
import PreLoader1 from "./components/PreLoader1";

import normal from './type_NORMAL.png';
import fire from './type_FIRE.png';
import water from './type_WATER.png';
import grass from './type_GRASS.png';
import electric from './type_ELECTRIC.png';
import ice from './type_ICE.png';
import fighting from './type_FIGHTING.png';
import poison from './type_POISON.png';
import ground from './type_GROUND.png';
import flying from './type_FLYING.png';
import psychic from './type_PSYCHIC.png';
import bug from './type_BUG.png';
import rock from './type_ROCK.png';
import ghost from './type_GHOST.png';
import dark from './type_DARK.png';
import steel from './type_STEEL.png';
import fairy from './type_FAIRY.png';

const typeToImageMap = {
  Normal: normal,
  Fire: fire,
  Water: water,
  Grass: grass,
  Electric: electric,
  Ice: ice,
  Fighting: fighting,
  Poison: poison,
  Ground: ground,
  Flying: flying,
  Psychic: psychic,
  Bug: bug,
  Rock: rock,
  Ghost: ghost,
  Dark: dark,
  Steel: steel,
  Fairy: fairy
  // Add more types and their corresponding image URLs here
};



function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [done, setDone] = useState(undefined);
  const [checkedPokemons, setCheckedPokemons] = useState({});
  const spriteDimensions = 250;

  // const typeToImageMap = {
  //   Normal: `url(${require("./type_NORMAL.png")})`,
  //   Fire: `url(${require("./type_FIRE.png")})`,
  //   Water: `url(${require("./type_WATER.png")})`,
  //   Grass: `url(${require("./type_GRASS.png")})`,
  //   Electric: `url(${require("./type_ELECTRIC.png")})`,
  //   Ice: `url(${require("./type_ICE.png")})`,
  //   Fighting: `url(${require("./type_FIGHTING.png")})`,
  //   Poison: `url(${require("./type_POISON.png")})`,
  //   Ground: `url(${require("./type_GROUND.png")})`,
  //   Flying: `url(${require("./type_FLYING.png")})`,
  //   Psychic: `url(${require("./type_PSYCHIC.png")})`,
  //   Bug: `url(${require("./type_BUG.png")})`,
  //   Rock: `url(${require("./type_ROCK.png")})`,
  //   Ghost: `url(${require("./type_GHOST.png")})`,
  //   Dark: `url(${require("./type_DARK.png")})`,
  //   Steel: `url(${require("./type_STEEL.png")})`,
  //   Fairy: `url(${require("./type_FAIRY.png")})`,
  //   // Add more types and their corresponding image URLs here
  // };
  
  // const typeToImageMap = {
  //   normal: `url(${require("type_NORMAL.png")})`,
  //   fire: `url(${require("type_FIRE.png")})`,
  //   water: `url(${require("type_WATER.png")})`,
  //   grass: `url(${require("type_GRASS.png")})`,
  //   electric: `url(${require("type_ELECTRIC.png")})`,
  //   ice: `url(${require("type_ICE.png")})`,
  //   fighting: `url(${require("type_FIGHTING.png")})`,
  //   poison: `url(${require("type_POISON.png")})`,
  //   ground: `url(${require("type_GROUND.png")})`,
  //   flying: `url(${require("type_FLYING.png")})`,
  //   psychic: `url(${require("type_PSYCHIC.png")})`,
  //   bug: `url(${require("type_BUG.png")})`,
  //   rock: `url(${require("type_ROCK.png")})`,
  //   ghost: `url(${require("type_GHOST.png")})`,
  //   dark: `url(${require("type_DARK.png")})`,
  //   steel: `url(${require("type_STEEL.png")})`,
  //   fairy: `url(${require("type_FAIRY.png")})`,
  //   // Add more types and their corresponding image URLs here
  // };
  
  
  
// Define maximum values for each stat (adjust these according to your data)
const maxATKValue = 190;
const maxDEFValue = 230;
const maxSpAtkValue = 190;
const maxSpDefValue = 230;
const maxHPValue = 255;
const maxSpeedValue = 180;

// Calculate bar widths for each stat
const atkBarWidth = (selectedPokemon.Attack / maxATKValue) * 100;
const defBarWidth = (selectedPokemon.Defense / maxDEFValue) * 100;
const spAtkBarWidth = (selectedPokemon.Special_Attack / maxSpAtkValue) * 100;
const spDefBarWidth = (selectedPokemon.Special_Defense / maxSpDefValue) * 100;
const hpBarWidth = (selectedPokemon.HP / maxHPValue) * 100;
const speedBarWidth = (selectedPokemon.Speed / maxSpeedValue) * 100;

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

    

  // const fetchSprite = async (nationalId) => {
  //   try {
  //     const response = await fetch(`/pokeSprite/${nationalId}`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     setSelectedPokemon({ ...selectedPokemon, sprite: data.sprite });
  //   } catch (error) {
  //     console.error('Error fetching sprite:', error);
  //   }
  // };

  const fetchData = async (nationalId) => {
    try {
      const response = await fetch(`/pokeData/${nationalId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSelectedPokemon({
        ...selectedPokemon,
        name: data.name,
        national_id: data.national_id,
        location: data.location,
        height: data.height,
        weight: data.weight,
        catch_rate: data.catch_rate,
        male_gender_ratio: data.male_gender_ratio,
        level_rate: data.level_rate,
        sprite: data.sprite,
        icon_1: data.icon_1,
        icon_2: data.icon_2,
        evolves_from: data.evolves_from,
        evolve_method: data.evolve_method,
        Attack: data.Attack,
        Defense: data.Defense,
        Speed: data.Speed,
        HP: data.HP,
        Special_Attack: data.Special_Attack,
        Special_Defense: data.Special_Defense,
        primary_type: data.primary_type,
        secondary_type: data.secondary_type
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
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
    <div className="App" style={{ display: 'flex'}}>

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
                onClick={() => {
                  fetchData(pokemon.national_id);
                }}
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
          backgroundImage: `url(${require("./stripesbg.jpg")})`
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

                <div  style={{ padding: '10px', marginBottom: '20px', display: 'flex', flexDirection: 'row', borderRadius: '10px', backgroundColor: '#eeeeee'}}>
                  <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <h2 style={{ margin: '0' }}> ATK </h2>
                        <h2 style={{ margin: '0' }}> DEF </h2>
                        <h2 style={{ margin: '0' }}> SP. ATK </h2>
                        <h2 style={{ margin: '0' }}> SP. DEF </h2>
                        <h2 style={{ margin: '0' }}> HP </h2>
                        <h2 style={{ margin: '0' }}> SPD </h2>
                      </div>
                      
                      <div style={{ flex: 1, alignItems: 'right', textAlign: 'right', display: 'flex', flexDirection: 'column'}}>
                        <div style={{ width: `${atkBarWidth}%`, height: '10px', margin: '11px', alignSelf: 'flex-end', backgroundColor: 'DarkGray' }}></div>
                        <div style={{ width: `${defBarWidth}%`, height: '10px', margin: '11px', alignSelf: 'flex-end', backgroundColor: 'SteelBlue' }}></div>
                        <div style={{ width: `${spAtkBarWidth}%`, height: '10px', margin: '11px', alignSelf: 'flex-end', backgroundColor: 'Goldenrod' }}></div>
                        <div style={{ width: `${spDefBarWidth}%`, height: '10px', margin: '11px', alignSelf: 'flex-end', backgroundColor: 'MediumPurple' }}></div>
                        <div style={{ width: `${hpBarWidth}%`, height: '10px', margin: '11px', alignSelf: 'flex-end', backgroundColor: 'LightSalmonCoral' }}></div>
                        <div style={{ width: `${speedBarWidth}%`, height: '10px', margin: '11px', alignSelf: 'flex-end', backgroundColor: 'YellowGreen' }}></div>
                      </div>

                      <div style={{ margin: '0', padding: '0', minWidth: '35px', display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                        <div style={{ flex: 1, textAlign: 'right', fontSize: '22px' }}>{selectedPokemon.Attack}</div>
                        <div style={{ flex: 1, textAlign: 'right', fontSize: '22px' }}>{selectedPokemon.Defense}</div>
                        <div style={{ flex: 1, textAlign: 'right', fontSize: '22px' }}>{selectedPokemon.Special_Attack}</div>
                        <div style={{ flex: 1, textAlign: 'right', fontSize: '22px' }}>{selectedPokemon.Special_Defense}</div>
                        <div style={{ flex: 1, textAlign: 'right', fontSize: '22px' }}>{selectedPokemon.HP}</div>
                        <div style={{ flex: 1, textAlign: 'right', fontSize: '22px' }}>{selectedPokemon.Speed}</div>
                        </div>
                </div>

                {/* <div  style={{ padding: '10px', marginBottom: '20px', display: 'flex', flexDirection: 'column', borderRadius: '10px', backgroundColor: '#eeeeee'}}>
                <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ margin: '0' }}> ATK </h2>
                    </div>
                    
                    <div
                      style={{
                        width: `${atkBarWidth}%`,
                        height: '10px', // Set desired height for the bar
                        backgroundColor: 'red', // Choose a color for the bar
                      }}>
                    </div>

                    <div style={{ flex: 1, textAlign: 'right', fontSize: '22px' }}>
                      {selectedPokemon.Attack}
                    </div>

                  </div>

                  <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ margin: '0' }}> DEF </h2>
                    </div>

                    <div
                      style={{
                        width: `${defBarWidth}%`,
                        height: '10px', // Set desired height for the bar
                        backgroundColor: 'orange', // Choose a color for the bar
                      }}>
                    </div>

                    <div style={{ flex: 1, textAlign: 'right', fontSize: '22px' }}>
                      {selectedPokemon.Defense}
                    </div>
                  </div>

                  <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ margin: '0' }}> SP. ATK </h2>
                    </div>
                    
                    <div
                      style={{
                        width: `${spAtkBarWidth}%`,
                        height: '10px', // Set desired height for the bar
                        backgroundColor: 'yellow', // Choose a color for the bar
                      }}>
                    </div>

                    <div style={{ flex: 1, textAlign: 'right', fontSize: '22px' }}>
                      {selectedPokemon.Special_Attack}
                    </div>
                  </div>

                  <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ margin: '0' }}> SP. DEF </h2>
                    </div>
                    
                    <div
                      style={{
                        width: `${spDefBarWidth}%`,
                        height: '10px', // Set desired height for the bar
                        backgroundColor: 'green', // Choose a color for the bar
                      }}>
                    </div>

                    <div style={{ flex: 1, textAlign: 'right', fontSize: '22px' }}>
                      {selectedPokemon.Special_Defense}
                    </div>
                  </div>

                  <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ margin: '0' }}> HP </h2>
                    </div>
                    
                    <div
                      style={{
                        width: `${speedBarWidth}%`,
                        height: '10px', // Set desired height for the bar
                        backgroundColor: 'blue', // Choose a color for the bar
                      }}>
                    </div>

                    <div style={{ flex: 1, textAlign: 'right', fontSize: '22px' }}>
                      {selectedPokemon.HP}
                    </div>
                  </div>

                  <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ margin: '0' }}> SPD </h2>
                    </div>
                    
                    <div
                      style={{
                        width: `${hpBarWidth}%`,
                        height: '10px', // Set desired height for the bar
                        backgroundColor: 'purple', // Choose a color for the bar
                      }}>
                    </div>

                    <div style={{ flex: 1, textAlign: 'right', fontSize: '22px' }}>
                      {selectedPokemon.Speed}
                    </div>
                  </div>

                </div> */}

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
                        <h1 style={{margin: '0', padding: '0' }}>{selectedPokemon.name}</h1>
                        <h2 style={{margin: '0', padding: '0' }}>#{selectedPokemon.national_id}</h2>

                        {/* Type Container */}
                        <div style={{ display: 'flex', flexDirection: 'row'}}>
                          {/* <h3 style = {{marginRight: '20px'}}>{selectedPokemon.primary_type}</h3> */}
                          <img 
                            style = {{marginRight: '5px', width: '100px'}} 
                            src={typeToImageMap[selectedPokemon.primary_type]} 
                            alt={selectedPokemon.primary_type} 
                          />

                          {selectedPokemon.secondary_type !== null ? (
                            <img
                              style={{ width: '100px' }}
                              src={typeToImageMap[selectedPokemon.secondary_type]}
                              alt={selectedPokemon.secondary_type}
                            />
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>

                      <div style ={{ flex: 1, textAlign: 'right', alignItems: 'right' }}>
                        Evolves from or maybe arrow buttons go here
                      </div>

                    </div>

                    {/* Location Container */}
                    <div  style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', padding: '10px', borderRadius: '10px', backgroundColor: '#eeeeee'}}>
                      <h2 style = {{margin: '0px'}}>Location Description</h2>
                      {selectedPokemon.location}<br />
                      You can find this pokemon in the dirt where you live. Here is some other information you might find helpful. Just kidding. Now I wonder if this description will run off the page. Oh it didn't. I guess that's good. I'm hungry, should I eat ice cream?
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

                      <p style = {{fontWeight: 'bold', padding: '0', margin: '0', marginTop: '20px'}}>currently: </p><br />
                      - neat sections mean we can just add the code into each section/resize once we get the endpoints working<br />
                      - colors and new sections can be added if we need<br />
                      - checkboxes do NOTHING atm. we also need a way to filter by caught/uncaught pokemon<br />
                      - maybe we could add arrows to easily go between each pokemon by index<br />
                      - until i understand how to call the pokemon's type, then we can do the cool backgrounds. for now i was able to put a stripey one and an elongated sprite on the right<br />
                      - i couldn't figure out how to remove the little bit of white space at the bottom<br />
                      - i know how to do html all by hand now XD <br />
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
