import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import logo from './moe.png';
import PreLoader1 from "./components/PreLoader1";
import selectSound from './selectbetter.mp3';
import entrySound from './start.mp3';

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
import dragon from './type_DRAGON.png';

import normal_accent from './normal_accent.png';
import fire_accent from './fire_accent.png';
import water_accent from './water_accent.png';
import grass_accent from './grass_accent.png';
import electric_accent from './electric_accent.png';
import ice_accent from './ice_accent.png';
import fighting_accent from './fighting_accent.png';
import poison_accent from './poison_accent.png';
import ground_accent from './ground_accent.png';
import flying_accent from './flying_accent.png';
import psychic_accent from './psychic_accent.png';
import bug_accent from './bug_accent.png';
import rock_accent from './rock_accent.png';
import ghost_accent from './ghost_accent.png';
import dark_accent from './dark_accent.png';
import steel_accent from './steel_accent.png';
import fairy_accent from './fairy_accent.png';
import dragon_accent from './dragon_accent.png';

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
  Fairy: fairy,
  Dragon: dragon
};

const typeToAccentMap = {
  Normal: normal_accent,
  Fire: fire_accent,
  Water: water_accent,
  Grass: grass_accent,
  Electric: electric_accent,
  Ice: ice_accent,
  Fighting: fighting_accent,
  Poison: poison_accent,
  Ground: ground_accent,
  Flying: flying_accent,
  Psychic: psychic_accent,
  Bug: bug_accent,
  Rock: rock_accent,
  Ghost: ghost_accent,
  Dark: dark_accent,
  Steel: steel_accent,
  Fairy: fairy_accent,
  Dragon: dragon_accent
};

const partySpriteBetter = [];
const plusSign = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cline x1='32' y1='12' x2='32' y2='52' fill='none' stroke='%23e3e3e3' stroke-miterlimit='10' stroke-width='8'/%3E%3Cline x1='12' y1='32' x2='52' y2='32' fill='none' stroke='%23e3e3e3' stroke-miterlimit='10' stroke-width='8'/%3E%3C/svg%3E")`;

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [done, setDone] = useState(undefined);
  const [checkedPokemons, setCheckedPokemons] = useState({});
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [clicked4, setClicked4] = useState(false);
  const [clicked5, setClicked5] = useState(false);
  const [clicked6, setClicked6] = useState(false);
  const [evolvesToData, setEvolvesToData] = useState([]);

  const [atkBarWidth, setAtkBarWidth] = useState(0);
  const [defBarWidth, setDefBarWidth] = useState(0);
  const [spAtkBarWidth, setSpAtkBarWidth] = useState(0);
  const [spDefBarWidth, setSpDefBarWidth] = useState(0);
  const [hpBarWidth, setHpBarWidth] = useState(0);
  const [speedBarWidth, setSpeedBarWidth] = useState(0);

  const spriteDimensions = 250;

  const calculateStats = (selectedPokemon) => {
    setAtkBarWidth((selectedPokemon.Attack / maxATKValue) * 100);
    setDefBarWidth((selectedPokemon.Defense / maxDEFValue) * 100);
    setSpAtkBarWidth((selectedPokemon.Special_Attack / maxSpAtkValue) * 100);
    setSpDefBarWidth((selectedPokemon.Special_Defense / maxSpDefValue) * 100);
    setHpBarWidth((selectedPokemon.HP / maxHPValue) * 100);
    setSpeedBarWidth((selectedPokemon.Speed / maxSpeedValue) * 100);
  };

  const arrowButtonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    border: 'none', // Remove the border
    marginBottom: '20px',
    width: '100px',
    borderRadius: '10px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cpath d='M52 32L22 12V22H12V42H22V52L52 32Z' fill='%23aaaaaa'/%3E%3C/svg%3E")`
  };

  const partyButtonStyle = {
    backgroundColor: 'white',
    height: '100px',
    borderRadius: '10px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '5px solid #ffffff',
  };

  // when selecting a pokemon to view from the list
  const handleButtonClick = async (nationalId) => {
    const audio = new Audio(selectSound);
    audio.play();
    const fetchedPokemon = await fetchData(nationalId);
    calculateStats(fetchedPokemon);
  };

  //easter egg
  const handleLogoClick = async () => {
    const audio = new Audio(entrySound);
    audio.play();
  };

  // Define maximum values for each stat (adjust these according to your data)
  const maxATKValue = 190;
  const maxDEFValue = 230;
  const maxSpAtkValue = 190;
  const maxSpDefValue = 230;
  const maxHPValue = 255;
  const maxSpeedValue = 180;

  async function partyData(slot, nationalId) {
    var responseData = {};
    try {
      const response = await fetch('/party', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          slot: slot,
          ID: nationalId
        })
      });

      if (!response.ok) {
        return false;
      }

      responseData = await response.json();
    } catch (error) {
      return false;
    }

    return ('message' in responseData) ? true : false;
  }

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
        setChecked(data.poke);
      }, 2000)
      .catch(error => {
        setError(error.message);
      });

    partySprites();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  async function partySprites() {
    try {
      const response = await fetch(`/party`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.message === 'empty party') {
        return;
      }

      data.poke.forEach(p => {
        partySpriteBetter[p.slot] = `url(data:image/png;base64,${Buffer.from(p.sprite).toString('base64')})`;
      });

      if (partySpriteBetter[1]) {
        setClicked1(!clicked1);
      }
      if (partySpriteBetter[2]) {
        setClicked2(!clicked2);
      }
      if (partySpriteBetter[3]) {
        setClicked3(!clicked3);
      }
      if (partySpriteBetter[4]) {
        setClicked4(!clicked4);
      }
      if (partySpriteBetter[5]) {
        setClicked5(!clicked5);
      }
      if (partySpriteBetter[6]) {
        setClicked6(!clicked6);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async (nationalId) => {
    try {
      const response = await fetch(`/pokeData/${nationalId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const newSelectedPokemon = data;
      setSelectedPokemon(newSelectedPokemon);
      fetchEvData(nationalId);
      return newSelectedPokemon; // Return the fetched Pokemon data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchEvData = async (nationalId) => {
    try {
      const response2 = await fetch(`/evolvesinto/${nationalId}`);
      if (!response2.ok) {
        throw new Error('Network response was not ok');
      }
      const evdata = await response2.json();

      if ('message' in evdata) {
        setEvolvesToData([]); // No evolutions, so set empty array
      } else {
        setEvolvesToData(evdata.poke); // Set the evolution data array
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredData = data.filter(pokemon => {
    var searchTerm = searchQuery.toLowerCase();
    if (searchTerm.includes('c:') && !searchTerm.includes('!c:')) {
      searchTerm = searchTerm.slice(2);
      return (
        pokemon.caught && (pokemon.name.toLowerCase().includes(searchTerm) ||
        pokemon.national_id.toString().includes(searchTerm))
      );
    } else if (searchTerm.includes('!c:')) {
      searchTerm = searchTerm.slice(3);
      return (
        !pokemon.caught && (pokemon.name.toLowerCase().includes(searchTerm) ||
        pokemon.national_id.toString().includes(searchTerm))
      );
    }
    return (
      pokemon.name.toLowerCase().includes(searchTerm) ||
      pokemon.national_id.toString().includes(searchTerm)
    );
  });

  const setChecked = (poke) => {
    poke.forEach(p => {
      checkedPokemons[p.national_id] = p.caught ? true : false;
    });
    setCheckedPokemons(checkedPokemons);
  };

  const handleCheckboxChange = async (nationalId) => {
    try {
      const response = await fetch('/caught', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: nationalId }),
      });

      if (response.ok) {
        // Update the caught status in the local state
        const updatedData = data.map((pokemon) => {
          if (pokemon.national_id === nationalId) {
            return { ...pokemon, caught: !pokemon.caught };
          }
          return pokemon;
        });
        setData(updatedData);

        checkedPokemons[nationalId] = !checkedPokemons[nationalId];
        setCheckedPokemons(checkedPokemons);
      } else {
        console.error('Failed to update caught status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App" style={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>

      {/* Left Container */}
      <div className="left-container" style={{ width: '470px', textAlign: 'center', backgroundColor: '#EEEEEE' }}>

        {/* Top-Left Container */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
          <div onClick={handleLogoClick}>
            <img src={logo} alt={`Logo`} style={{ width: '120px' }} />
          </div>
          <div style={{ padding: '0', margin: '0' }}>
            <h1 style={{ fontSize: '25px', margin: '0', marginLeft: '10px' }}>PokéMoe Data</h1>
            Gotta woo 'em all &lt;3<br />
            nvm
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
          <div style={{ display: 'flex', justifyContent: 'center' }}><PreLoader1 /></div>
        ) : filteredData.length > 0 ? (
          <div style={{ padding: '20px' }}>
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
                        key={pokemon.national_id}
                        onClick={() => handleButtonClick(pokemon.national_id)}
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
          <p style={{ minHeight: '218px', fontWeight: 'bold', color: 'red' }}>No matching Pokémon found.</p>
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
          }}
        >
          <button style={{
            ...partyButtonStyle,
            backgroundImage: partySpriteBetter[1] ? partySpriteBetter[1] : plusSign,
          }} onClick={() => {
            if (selectedPokemon != null) {
              const newSprite = partyData(1, selectedPokemon.national_id)
                ? `url(data:image/png;base64,${Buffer.from(selectedPokemon.sprite.data).toString('base64')})` : plusSign;
              partySpriteBetter[1] = !clicked1 ? newSprite : plusSign;
              setClicked1(!clicked1);
            } else {
              if (!clicked1) {
                alert('No pokemon selected!');
              } else {
                partySpriteBetter[1] = partyData(1, -1) ? plusSign : plusSign;
                setClicked1(!clicked1);
              }
            }
          }}>
            {/* Content for the first cell of the grid */}
          </button>
          <button style={{
            ...partyButtonStyle,
            backgroundImage: partySpriteBetter[2] ? partySpriteBetter[2] : plusSign,
          }} onClick={() => {
            if (selectedPokemon != null) {
              const newSprite = partyData(2, selectedPokemon.national_id)
                ? `url(data:image/png;base64,${Buffer.from(selectedPokemon.sprite.data).toString('base64')})` : plusSign;
              partySpriteBetter[2] = !clicked2 ? newSprite : plusSign;
              setClicked2(!clicked2);
            } else {
              if (!clicked2) {
                alert('No pokemon selected!');
              } else {
                partySpriteBetter[2] = partyData(2, -1) ? plusSign : plusSign;
                setClicked2(!clicked2);
              }
            }
          }}>
            {/* Content for the second cell of the grid */}
          </button>
          <button style={{
            ...partyButtonStyle,
            backgroundImage: partySpriteBetter[3] ? partySpriteBetter[3] : plusSign,
          }} onClick={() => {
            if (selectedPokemon != null) {
              const newSprite = partyData(3, selectedPokemon.national_id)
                ? `url(data:image/png;base64,${Buffer.from(selectedPokemon.sprite.data).toString('base64')})` : plusSign;
              partySpriteBetter[3] = !clicked3 ? newSprite : plusSign;
              setClicked3(!clicked3);
            } else {
              if (!clicked3) {
                alert('No pokemon selected!');
              } else {
                partySpriteBetter[3] = partyData(3, -1) ? plusSign : plusSign;
                setClicked3(!clicked3);
              }
            }
          }}>
            {/* Content for the third cell of the grid */}
          </button>
          <button style={{
            ...partyButtonStyle,
            backgroundImage: partySpriteBetter[4] ? partySpriteBetter[4] : plusSign,
          }} onClick={() => {
            if (selectedPokemon != null) {
              const newSprite = partyData(4, selectedPokemon.national_id)
                ? `url(data:image/png;base64,${Buffer.from(selectedPokemon.sprite.data).toString('base64')})` : plusSign;
              partySpriteBetter[4] = !clicked4 ? newSprite : plusSign;
              setClicked4(!clicked4);
            } else {
              if (!clicked4) {
                alert('No pokemon selected!');
              } else {
                partySpriteBetter[4] = partyData(4, -1) ? plusSign : plusSign;
                setClicked4(!clicked4);
              }
            }
          }}>
            {/* Content for the fourth cell of the grid */}
          </button>
          <button style={{
            ...partyButtonStyle,
            backgroundImage: partySpriteBetter[5] ? partySpriteBetter[5] : plusSign,
          }} onClick={() => {
            if (selectedPokemon != null) {
              const newSprite = partyData(5, selectedPokemon.national_id)
                ? `url(data:image/png;base64,${Buffer.from(selectedPokemon.sprite.data).toString('base64')})` : plusSign;
              partySpriteBetter[5] = !clicked5 ? newSprite : plusSign;
              setClicked5(!clicked5);
            } else {
              if (!clicked5) {
                alert('No pokemon selected!');
              } else {
                partySpriteBetter[5] = partyData(5, -1) ? plusSign : plusSign;
                setClicked5(!clicked5);
              }
            }
          }}>
            {/* Content for the fifth cell of the grid */}
          </button>
          <button style={{
            ...partyButtonStyle,
            backgroundImage: partySpriteBetter[6] ? partySpriteBetter[6] : plusSign,
          }} onClick={() => {
            if (selectedPokemon != null) {
              const newSprite = partyData(6, selectedPokemon.national_id)
                ? `url(data:image/png;base64,${Buffer.from(selectedPokemon.sprite.data).toString('base64')})` : plusSign;
              partySpriteBetter[6] = !clicked6 ? newSprite : plusSign;
              setClicked6(!clicked6);
            } else {
              if (!clicked6) {
                alert('No pokemon selected!');
              } else {
                partySpriteBetter[6] = partyData(6, -1) ? plusSign : plusSign;
                setClicked6(!clicked6);
              }
            }
          }}>
            {/* Content for the sixth cell of the grid */}
          </button>
        </div>

        <h3 style={{ marginTop: '0px', marginBottom: '0px' }}>Party</h3>
      </div>

      {/* Middle Container */}
      <div
        style={{
          display: 'flex', // Use flex display to arrange items side by side
          width: '100%',
          textAlign: 'left',
          padding: '20px',
          backgroundImage: `url(${require("./stripesbg.jpg")})`
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
            <div style={{
              padding: '10px', marginBottom: '20px', display: 'flex', flexDirection: 'row',
              borderRadius: '10px', backgroundColor: '#eeeeee'
            }}>
              <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <h2 style={{ margin: '0' }}> ATK </h2>
                <h2 style={{ margin: '0' }}> DEF </h2>
                <h2 style={{ margin: '0' }}> SP. ATK </h2>
                <h2 style={{ margin: '0' }}> SP. DEF </h2>
                <h2 style={{ margin: '0' }}> HP </h2>
                <h2 style={{ margin: '0' }}> SPD </h2>
              </div>

              <div style={{ flex: 1, alignItems: 'right', textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: `${atkBarWidth}%`, maxWidth: '90px', height: '10px', margin: '11px', alignSelf: 'flex-end', backgroundColor: 'DarkGray' }}></div>
                <div style={{ width: `${defBarWidth}%`, maxWidth: '90px', height: '10px', margin: '11px', alignSelf: 'flex-end', backgroundColor: 'SteelBlue' }}></div>
                <div style={{ width: `${spAtkBarWidth}%`, maxWidth: '90px', height: '10px', margin: '11px', alignSelf: 'flex-end', backgroundColor: 'Goldenrod' }}></div>
                <div style={{ width: `${spDefBarWidth}%`, maxWidth: '90px', height: '10px', margin: '11px', alignSelf: 'flex-end', backgroundColor: 'MediumPurple' }}></div>
                <div style={{ width: `${hpBarWidth}%`, maxWidth: '90px', height: '10px', margin: '11px', alignSelf: 'flex-end', backgroundColor: 'LightCoral' }}></div>
                <div style={{ width: `${speedBarWidth}%`, maxWidth: '90px', height: '10px', margin: '11px', alignSelf: 'flex-end', backgroundColor: 'YellowGreen' }}></div>
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

            {/* Other Info Container */}
            <div style={{ padding: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'center', borderRadius: '10px', backgroundColor: '#eeeeee' }}>
              <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minWidth: '100px' }}>

                <h3 style={{ margin: '0', padding: '0' }}>height</h3>
                <p style={{ margin: '0' }}>{selectedPokemon.height} m</p>

                <div><h3 style={{ margin: '0', padding: '0' }}>male</h3> {selectedPokemon.male_gender_ratio} %</div>

                <h3 style={{ margin: '0', padding: '0', marginTop: '5px' }}>catch rate</h3> {selectedPokemon.catch_rate} %

              </div>
              <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minWidth: '100px' }}>

                <h3 style={{ margin: '0', padding: '0' }}>weight</h3>
                <p style={{ margin: '0' }}>{selectedPokemon.weight} kg</p>

                <div><h3 style={{ margin: '0', padding: '0' }}>female</h3> {(100.00 - selectedPokemon.male_gender_ratio).toFixed(2)} %</div>

                <h3 style={{ margin: '0', padding: '0', marginTop: '5px' }}>level rate</h3> {selectedPokemon.level_rate}

              </div>
            </div>

          </div>
        ) : null}

        {/* Name Container */}
        {selectedPokemon ? (
          <div style={{ display: 'flex', flexDirection: 'column', flex: '1', padding: '20px', margin: '20px 30px 20px 0', borderRadius: '10px', backgroundColor: '#dedede' }}>
            <div style={{ display: 'flex', flexDirection: 'row', borderRadius: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', marginRight: '30px' }}>
                <h1 style={{ margin: '0', padding: '0' }}>{selectedPokemon.name}</h1>
                <h2 style={{ margin: '0', padding: '0' }}>#{selectedPokemon.national_id}</h2>

                {/* Type Container */}
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <img
                    style={{ marginRight: '5px', width: '100px' }}
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

              <div style={{ flex: '1', textAlign: 'right' }}>
                <button
                  onClick={() => selectedPokemon.national_id > 252 ? handleButtonClick(selectedPokemon.national_id - 1) : alert('No Pokemon to the left!')}
                  style={{
                    alignItems: 'center',
                    margin: '10px',
                    fontSize: '50px',
                    background: 'none',
                    cursor: 'pointer',
                    padding: 10,
                    border: '5px solid #eeeeee',
                    width: '100px',
                    height: '100px',
                    borderRadius: '10px',
                    backgroundColor: '#eeeeee',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  {/* colors already seemed good */}
                  <div style={{ color: '#000000' }}>&#10148;</div>
                </button>
                <button
                  onClick={() => selectedPokemon.national_id < 386 ? handleButtonClick(selectedPokemon.national_id + 1) : alert('No Pokemon to the right!')}
                  style={{
                    alignItems: 'center',
                    margin: '10px',
                    fontSize: '50px',
                    background: 'none',
                    cursor: 'pointer',
                    border: '5px solid #eeeeee',
                    padding: 10,
                    width: '100px',
                    height: '100px',
                    borderRadius: '10px',
                    backgroundColor: '#eeeeee'
                  }}>
                  &#10148;
                </button>
              </div>

            </div>

            {/* Location Container */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', padding: '10px', borderRadius: '10px', backgroundColor: '#eeeeee' }}>
              <h2 style={{ margin: '0px' }}>Location Description</h2>
              {selectedPokemon.location}<br />
            </div>

            {/* Ability List Container */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', padding: '10px', borderRadius: '10px', backgroundColor: '#eeeeee' }}>
              <h2 style={{ margin: '0px' }}>Ability List</h2>
              <ul style={{ margin: 0, paddingLeft: '50px', listStyle: 'none' }}>
                {[
                  { ability: selectedPokemon.ability_1, description: selectedPokemon.ability_1_desc },
                  { ability: selectedPokemon.ability_2, description: selectedPokemon.ability_2_desc },
                  { ability: selectedPokemon.hidden_ability, description: selectedPokemon.ability_h_desc },
                ].map((entry, index) => (
                  entry.ability && (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ padding: 0, margin: '5px 0' }}>
                          {entry.ability === selectedPokemon.hidden_ability
                            ? <span style={{ color: 'grey' }}>{entry.ability}</span>
                            : entry.ability}
                        </h3>
                        <p style={{ padding: 0, margin: 0, paddingLeft: '20px' }}>{entry.description}</p>
                      </div>
                    </li>
                  )
                ))}
              </ul>
            </div>

            {/* Evolves To Container */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', padding: '10px', borderRadius: '10px', backgroundColor: '#eeeeee' }}>
              <h2 style={{ margin: '0px', paddingBottom: '10px' }}>Evolves to:</h2>
              {evolvesToData.length > 0 ? (
                evolvesToData.map((evolution, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <img src={`data:image/png;base64,${Buffer.from(evolution.sprite.data).toString('base64')}`}
                      alt={`${evolution.name} Sprite`}
                      style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                    <div>
                      <p style={{ fontSize: '25px', margin: '0' }}>{evolution.name}</p>
                      <p style={{ margin: '0' }}>{evolution.evolve_method}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '20px', margin: '0 0 0 20px' }}>No evolutions :&lt;</p>
              )}
            </div>

          </div>
        ) : null}
      </div>

      {/* Right Container */}
      <div style={{ display: 'flex', width: '150px' }}>
        {/* This part contains the content */}
        {selectedPokemon ? (
          <div>
            <img
              src={typeToAccentMap[selectedPokemon.primary_type]}
              alt={`${selectedPokemon.primary_type} Accent`}
              style={{ maxWidth: '100%', height: '100%', filter: 'opacity(50%)' }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );

}

export default App;
