import React, { useState, useEffect } from 'react';

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
        return response.json(); // Parse the response body as JSON
      })
      .then(data => {
        console.log(data);
        setData(data.poke);
      })
      .catch(error => setError(error.message));
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
        />
      </div>
      {filteredData.length > 0 ? (
        <div style={{ overflowY: 'scroll', maxHeight: '400px' }}>
          <ul>
            {filteredData.map(pokemon => (
              <li key={pokemon.national_id}>
                <h2>{pokemon.national_id + ': ' + pokemon.name}</h2>
                <img
                  src={`data:image/png;base64,${pokemon.sprite}`} // Display the PNG image
                  alt={`${pokemon.name} Sprite`}
                  style={{ width: '100px', height: '100px' }}
                />
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


// import React, { useState, useEffect } from 'react';

// function App() {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     // Fetch data from the /pokes2 endpoint
//     fetch('/pokes2')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json(); // Parse the response body as JSON
//       })
//       .then(data => {
//         console.log(data);
//         setData(data.poke);
//       })
//       .catch(error => setError(error.message));
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const filteredData = data.filter(pokemon => {
//     const searchTerm = searchQuery.toLowerCase();
//     return (
//       pokemon.name.toLowerCase().includes(searchTerm) ||
//       pokemon.national_id.toString().includes(searchTerm)
//     );
//   });

//   return (
//     <div className="App">
//       <h1>Pokemon Data</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Search by name or national ID"
//           value={searchQuery}
//           onChange={e => setSearchQuery(e.target.value)}
//         />
//       </div>
//       {filteredData.length > 0 ? (
//         <div style={{ overflowY: 'scroll', maxHeight: '400px' }}>
//           <ul>
//             {filteredData.map(pokemon => (
//               <li key={pokemon.national_id}>
//                 <h2>{pokemon.national_id + ': ' + pokemon.name}</h2>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>No matching Pokemon found.</p>
//       )}
//     </div>
//   );
// }

// export default App;
