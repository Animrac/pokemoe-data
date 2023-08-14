import React, { useState, useEffect } from 'react';
import './App.css';
import { Buffer } from 'buffer';
import logo from './moe.png';
import PreLoader1 from "./components/PreLoader1";
import selectSound from './selectbetter.mp3';
import entrySound from './poke.mp3';

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

/**
 * Swap these lines out to run local or remote for backend and DB.
 */
// const burl = 'http://localhost:3001';
const burl = 'https://pokemoe-server-51c05b8425e0.herokuapp.com';

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
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [atkBarWidth, setAtkBarWidth] = useState(0);
  const [defBarWidth, setDefBarWidth] = useState(0);
  const [spAtkBarWidth, setSpAtkBarWidth] = useState(0);
  const [spDefBarWidth, setSpDefBarWidth] = useState(0);
  const [hpBarWidth, setHpBarWidth] = useState(0);
  const [speedBarWidth, setSpeedBarWidth] = useState(0);

  const spriteDimensions = '16vw';
  const maxBaseValue = 255; // Maximum values for each base stat

  /**
   * Set Base Stat bars of selected pokemon.
   * @param {JSON} selectedPokemon 
   */
  const calculateStats = (selectedPokemon) => {
    setAtkBarWidth((selectedPokemon.Attack / maxBaseValue) * 100);
    setDefBarWidth((selectedPokemon.Defense / maxBaseValue) * 100);
    setSpAtkBarWidth((selectedPokemon.Special_Attack / maxBaseValue) * 100);
    setSpDefBarWidth((selectedPokemon.Special_Defense / maxBaseValue) * 100);
    setHpBarWidth((selectedPokemon.HP / maxBaseValue) * 100);
    setSpeedBarWidth((selectedPokemon.Speed / maxBaseValue) * 100);
  };

  /**
   * Credits.
   */
  const credits = 'Thank you for checking out PokéMoe Data! :D <3\n\nCreated by Carmina Cruz, James Deal, and Devin Hanson.\n\nSprites and Icons drawn by members of the Moemon Fire Red Revival Project Community.\n\nLogo illustrated by Carmina Cruz.\n\n© 2023 Pokémon. © 1995-2023 Nintendo/Creatures Inc./GAME FREAK inc. Pokémon, Pokémon character names, and sounds are trademarks of Nintendo.';

  /**
   * Fetches data from server about specific pokemon, and plays sound when executed.
   * @param {int} nationalId 
   */
  const handleButtonClick = async (nationalId) => {
    const audio = new Audio(selectSound);
    audio.play();
    const fetchedPokemon = await fetchData(nationalId);
    calculateStats(fetchedPokemon);
  };

  /**
   * Easter egg.
   */
  const handleLogoClick = async () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
        alert(credits);
      }
      setIsPlaying(!isPlaying);
    } else {
      const newAudio = new Audio(entrySound);
      newAudio.loop = true;
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);
      alert(credits);

    }
  };

  /**
   * Put selected pokemon into party on server.
   * @param {int} slot 
   * @param {int} nationalId 
   * @returns true if successful.
   */
  async function partyData(slot, nationalId) {
    var responseData = {};
    try {
      const response = await fetch(burl + '/party', {
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

  /**
   * Gets initial information for Pokemon list and party.
   */
  useEffect(() => {
    fetch(burl + '/pokes3')
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

  /**
   * Ability to show errors if crashed.
   */
  if (error) {
    return <div>Error: {error}</div>;
  }

  /**
   * Gets current party data from server, called in useEffect when app loads.
   * @returns nothing
   */
  async function partySprites() {
    try {
      const response = await fetch(burl + `/party`);
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



  /**
   * Gets detailed information about a specified pokemon.
   * @param {int} nationalId 
   * @returns JSON of pokemon data
   */
  const fetchData = async (nationalId) => {
    try {
      const response = await fetch(burl + `/pokeData/${nationalId}`);
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

  /**
   * Gets detailed evolution information about selected pokemon.
   * Called automatically by fetchData.
   * @param {int} nationalId 
   */
  const fetchEvData = async (nationalId) => {
    try {
      const response2 = await fetch(burl + `/evolvesinto/${nationalId}`);
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

  /**
   * Allows for filtering of Pokemon list without dialing out to server each time.
   */
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

  /**
   * Set each Pokemon in the list as caught/not caught as necessary.
   * Called automatically by useEffect when app starts.
   * @param {JSON} poke 
   */
  const setChecked = (poke) => {
    poke.forEach(p => {
      checkedPokemons[p.national_id] = p.caught ? true : false;
    });
    setCheckedPokemons(checkedPokemons);
  };

  /**
   * Updates caught status of specified Pokemon, informs server of change.
   * @param {int} nationalId 
   */
  const handleCheckboxChange = async (nationalId) => {
    try {
      const response = await fetch(burl + '/caught', {
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

  /**
   * The visual stuff.
   */
  return (
    <div className="App" style={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>

      {/* Left Container */}
      <div className="left-container" style={{ width: '24vw', height: '100vh', textAlign: 'center', backgroundColor: 'rgba(225, 225, 225, 0.4)', position: 'fixed' }}>

        {/* Top-Left Container */}
        <div style={{ display: 'flex', alignItems: 'center', height: '10vh', textAlign: 'center', justifyContent: 'center', flexDirection: 'row', padding: '4vh 2vw 4vh 2vw' }}>
          <div onClick={handleLogoClick}>
            <img class='logoButton' src={logo} alt={`Logo`} style={{ height: '12vh' }} />
          </div>
          <div style={{ padding: '0', margin: '0 3vh 0 0 ', justifyContent: 'center', width: '100%' }}>
            <h1 style={{ fontSize: '3.5vh', margin: '0 0 0 0 ' }}>PokéMoe Data</h1>
              <div style={{fontSize: '2.3vh'}}>Gotta woo 'em all &lt;3</div>
          </div>
        </div>

        {/* Search Bar Container */}
        <div style={{ padding: '0', padding: '0px 2vw 0px 2vw' }}>
          <input
            type="text"
            placeholder="Search by name or national ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '5vh',
              fontSize: '2.5vh',
              fontWeight: 'bold',
              border: '0.5vh solid white',
              borderRadius: '1vh'
            }}
          />
        </div>

        {/* Pokemon List Container */}
        {!done ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}><PreLoader1 /></div>
        ) : filteredData.length > 0 ? (
          <div style={{ padding: '1vw' }}>
            <div className="scroll-container" style={{ minWidth: '100%', minHeight: '100%', maxHeight: '37vh', borderRadius: '1vh' }}>
              <ul class='tightElement'>
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
                        style={{ marginRight: '1vw', marginLeft: '2vw', height: '2.5vh', width: '2.5vw' }}
                      />
                      <button
                        class='pokemonListItemButton'
                        key={pokemon.national_id}
                        onClick={() => handleButtonClick(pokemon.national_id)}
                      >
                        <img
                          src={`data:image/png;base64,${Buffer.from(pokemon.icon_1.data).toString('base64')}`}
                          alt={`${pokemon.name} Icon`}
                          style={{
                            width: '2vw',
                            marginRight: '1vw',
                          }}
                        />
                        <h2 style={{fontSize: '2.75vh'}}>{pokemon.national_id + ': ' + pokemon.name}</h2>
                      </button>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p style={{ minHeight: '37vh', fontWeight: 'bold', color: 'red' }}>No matching Pokémon found.</p>
        )}

        {/* Party Pokemon Grid Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            height: '30%',
            padding: '0px 1vw 0px 1vw',
            gap: '1vh',
          }}
        >
          <button class='partyButton' style={{
            backgroundImage: partySpriteBetter[1] ? partySpriteBetter[1] : plusSign,
          }} onClick={() => {
            if (selectedPokemon != null && !clicked1) {
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
          <button class='partyButton' style={{
            backgroundImage: partySpriteBetter[2] ? partySpriteBetter[2] : plusSign,
          }} onClick={() => {
            if (selectedPokemon != null && !clicked2) {
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
          <button class='partyButton' style={{
            backgroundImage: partySpriteBetter[3] ? partySpriteBetter[3] : plusSign,
          }} onClick={() => {
            if (selectedPokemon != null && !clicked3) {
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
          <button class='partyButton' style={{
            backgroundImage: partySpriteBetter[4] ? partySpriteBetter[4] : plusSign,
          }} onClick={() => {
            if (selectedPokemon != null && !clicked4) {
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
          <button class='partyButton' style={{
            backgroundImage: partySpriteBetter[5] ? partySpriteBetter[5] : plusSign,
          }} onClick={() => {
            if (selectedPokemon != null && !clicked5) {
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
          <button class='partyButton' style={{
            backgroundImage: partySpriteBetter[6] ? partySpriteBetter[6] : plusSign,
          }} onClick={() => {
            if (selectedPokemon != null && !clicked6) {
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

        <h3 style={{ marginTop: '0px', marginBottom: '0px', fontSize: '2.5vh' }}>Party</h3>
      </div>

      {/* Middle Container */}
      <div class="stripes-animated-bg">
        {/* Sprite Image */}
        {selectedPokemon ? (
          <div style={{ padding: '4vh', display: 'flex', flexDirection: 'column' }}>
            <img
              src={`data:image/png;base64,${Buffer.from(
                selectedPokemon.sprite.data
              ).toString('base64')}`}
              alt={`${selectedPokemon.name} Sprite`}
              style={{ width: spriteDimensions, marginBottom: '2vh' }}
            />

            {/* Base Stat Container */}
            <div style={{
              padding: '2vh', marginBottom: '3vh', display: 'flex', flexDirection: 'row',
              borderRadius: '1vh', backgroundColor: 'rgba(225, 225, 225, 0.5)'
            }}>
              <div class='tightElement' style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <h2 class='statTitle'> ATK </h2>
                <h2 class='statTitle'> DEF </h2>
                <h2 class='statTitle'> SP. ATK </h2>
                <h2 class='statTitle'> SP. DEF </h2>
                <h2 class='statTitle'> HP </h2>
                <h2 class='statTitle'> SPD </h2>
              </div>

              <div style={{ flex: 1, alignItems: 'right', textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                <div class='statBar' style={{ width: `${atkBarWidth}%`, backgroundColor: 'DarkGray' }}></div>
                <div class='statBar' style={{ width: `${defBarWidth}%`, backgroundColor: 'SteelBlue' }}></div>
                <div class='statBar' style={{ width: `${spAtkBarWidth}%`, backgroundColor: 'Goldenrod' }}></div>
                <div class='statBar' style={{ width: `${spDefBarWidth}%`, backgroundColor: 'MediumPurple' }}></div>
                <div class='statBar' style={{ width: `${hpBarWidth}%`, backgroundColor: 'LightCoral' }}></div>
                <div class='statBar' style={{ width: `${speedBarWidth}%`, backgroundColor: 'YellowGreen' }}></div>
              </div>

              <div style={{ margin: '0', padding: '0', minWidth: '2vw', display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <div class='statNumber'>{selectedPokemon.Attack}</div>
                <div class='statNumber'>{selectedPokemon.Defense}</div>
                <div class='statNumber'>{selectedPokemon.Special_Attack}</div>
                <div class='statNumber'>{selectedPokemon.Special_Defense}</div>
                <div class='statNumber'>{selectedPokemon.HP}</div>
                <div class='statNumber'>{selectedPokemon.Speed}</div>
              </div>
            </div>

            {/* Other Info Container */}
            <div style={{ padding: '0.5vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', borderRadius: '1vh', backgroundColor: 'rgba(225, 225, 225, 0.5)' }}>
              <div style={{ padding: '0.75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minWidth: '7vw' }}>
                  <h3 class='otherRefTitles'>height</h3>
                  <p class='otherRefStats'> {selectedPokemon.height} m</p>
                  <h3 class='otherRefTitles'>male</h3> 
                  <div class='otherRefStats'>{selectedPokemon.male_gender_ratio} %</div>
                  <h3 class='otherRefTitles'>catch rate</h3> 
                  <div class='otherRefStats'>{selectedPokemon.catch_rate} %</div>
              </div>
              <div style={{ padding: '0.75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minWidth: '7vw' }}>
                <h3 class='otherRefTitles'>weight</h3>
                <p class='otherRefStats'>{selectedPokemon.weight} kg</p>
                <h3 class='otherRefTitles'>female</h3> 
                <div class='otherRefStats'>{(100.00 - selectedPokemon.male_gender_ratio).toFixed(2)} %</div>
                <h3 class='otherRefTitles'>level rate</h3> 
                <div class='otherRefStats'>{selectedPokemon.level_rate}</div>
              </div>
            </div>

          </div>
        ) : null}

        {/* Name Container */}
        {selectedPokemon ? (
          <div style={{ display: 'flex', flexDirection: 'column', flex: '1', padding: '3vh', margin: '3vh 2vw 3vh 0', borderRadius: '1vh', backgroundColor: 'rgba(225, 225, 225, 0.5)' }}>
            <div style={{ display: 'flex', flexDirection: 'row', borderRadius: '1vh' }}>
              <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '1vh'}}>
                <h1 style={{ margin: '0', padding: '0', fontSize: '5vh' }}>{selectedPokemon.name}</h1>
                <h2 style={{ margin: '0', padding: '0', fontSize: '3.5vh' }}>#{selectedPokemon.national_id}</h2>

                {/* Type Container */}
                <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 1vh 1vh 0px' }}>
                  <img
                    style={{ marginRight: '1vw', maxWidth: '7vw', maxHeight: '8vh' }}
                    src={typeToImageMap[selectedPokemon.primary_type]}
                    alt={selectedPokemon.primary_type}
                  />

                  {selectedPokemon.secondary_type !== null ? (
                    <img
                      style={{ maxWidth: '7vw', maxHeight: '8vh' }}
                      src={typeToImageMap[selectedPokemon.secondary_type]}
                      alt={selectedPokemon.secondary_type}
                    />
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>

              {/* arrow buttons to go to the next/previous pokemon by national ID */}
              <div style={{ flex: '1', textAlign: 'right' }}>
                <button
                  class='arrowButton'
                  onClick={() => (selectedPokemon.national_id > 252) ? handleButtonClick(selectedPokemon.national_id - 1) : alert('No Pokemon to the left!')}
                >
                  <div style={{ transform: 'rotateY(180deg)' }}>&#10148;</div>
                </button>
                <button
                  class='arrowButton'
                  onClick={() => (selectedPokemon.national_id < 386 && selectedPokemon.national_id != 143) ? handleButtonClick(selectedPokemon.national_id + 1) : alert('No Pokemon to the right!')}
                >
                  &#10148;
                </button>
              </div>

            </div>

            {/* Location Container */}
            <div class='nameContainerBox'>
              <h2 class='nameContainerTitle'>Location Description:</h2>
              <div style={{ fontSize: '2.5vh', paddingLeft: '3vw', margin: '1vh 0px' }}>{selectedPokemon.location}</div>
            </div>

            {/* Ability List Container */}
            <div class='nameContainerBox'>
              <h2 class='nameContainerTitle'>Ability List:</h2>
              <ul style={{ margin: 0, paddingLeft: '3vw', listStyle: 'none' }}>
                {[
                  { ability: selectedPokemon.ability_1, description: selectedPokemon.ability_1_desc },
                  { ability: selectedPokemon.ability_2, description: selectedPokemon.ability_2_desc },
                  { ability: selectedPokemon.hidden_ability, description: selectedPokemon.ability_h_desc },
                ].map((entry, index) => (
                  entry.ability && (
                    <li key={index} style={{ marginBottom: '1vh' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ padding: 0, margin: '1vh 0', fontSize: '2.5vh' }}>
                          {entry.ability === selectedPokemon.hidden_ability
                            ? <span style={{ flexDirection: 'column' }}><span>{entry.ability}</span><span style={{ color: 'grey', marginLeft: '1vw', fontSize: '2.5vh' }}>(Hidden Ability)</span></span>
                            : entry.ability}
                        </h3>
                        <p style={{ padding: 0, margin: 0, paddingLeft: '3vh', fontSize: '2vh' }}>{entry.description}</p>
                      </div>
                    </li>
                  )
                ))}
              </ul>
            </div>

            {/* Evolves To Container */}
            <div class='nameContainerBox'>
              <h2 class='nameContainerTitle'>Evolves to:</h2>
              {evolvesToData.length > 0 ? (
                evolvesToData.map((evolution, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1vh', paddingLeft: '3vw', margin: '1vh 0px' }}>
                    <img src={`data:image/png;base64,${Buffer.from(evolution.sprite.data).toString('base64')}`}
                      alt={`${evolution.name} Sprite`}
                      style={{height: '13vh', marginRight: '1vw' }} />
                    <div>
                      <p style={{ fontSize: '3.5vh', margin: '0' }}>{evolution.name}</p>
                      <p class='tightElement' style={{fontSize: '2.5vh'}}>{evolution.evolve_method}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '2.5vh', margin: '1vh 0px', paddingLeft: '3vw' }}>No evolutions :&lt;</p>
              )}
            </div>

          </div>


        ) : null}

        {/* Right Container */}
        <div style={{ display: 'flex', width: '10vw', height: '100vh' }}>
          {selectedPokemon ? (
            <div>
              <img
                src={typeToAccentMap[selectedPokemon.primary_type]}
                alt={`${selectedPokemon.primary_type} Accent`}
                style={{ minHeight: '100%', position: 'fixed', backgroundRepeat: 'repeat' }}
              />
            </div>
          ) : null}
        </div>
      </div>


    </div>
  );

}

export default App;
