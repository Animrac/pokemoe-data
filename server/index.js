// const express = require('express')
// const app = express();
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const mysql = require('mysql')

// const sqlFormatter = require('sql-formatter');

// const port = 3001; // Replace this with your desired port number

// // Configure static file serving for the "public" folder
// app.use(express.static('public'));

// // Your other routes and middleware can be defined here...

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// const db = mysql.createPool({
//     host: 'us-cdbr-east-06.cleardb.net',
//     user: 'bbc1d236a2fdf8',
//     password: 'c0f12074',
//     database: 'heroku_7dd2ee314208c5d'
// })

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const imgQ = "SELECT * from pokemon_pics";

// app.get("/snore", (req, res) => {
//     const imageId = req.params.id;

//     // Query the database to retrieve the binary image data
//     db.query(imgQ, (err, result) => {
//         if (err) {
//             console.error("Error retrieving image:", err);
//             res.status(500).send("Error retrieving image");
//             return;
//         }

//         if (result.length === 0) {
//             res.status(404).send("Image not found");
//             return;
//         }

//         result.forEach(row => {
//             res.write(row.sprite);
//         });

//         res.end();
//     });
// });

// const testQuery = "SELECT *, " +
//     "(SELECT pr.name FROM pokemon_ref pr WHERE pr.national_id = er.evolves_from) AS evolves_from_name " +
//     "FROM pokemon_ref p " +
//     "NATURAL JOIN pokemon_type " +
//     "JOIN evolve_ref er ON p.national_id = er.national_id";

// // const formattedSql = sqlFormatter.format(testQuery); wth this just formats the query

// app.get("/pokes", (req, res) => {
//     db.query(testQuery, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         result.forEach((pokemon) => {
//             let pokemonInfo = `Name: ${pokemon.name}
//                 |ID: ${pokemon.national_id}
//                 |Primary Type: ${pokemon.primary_type}
//                 |Secondary Type: ${pokemon.secondary_type ? pokemon.secondary_type : 'None'}`;

//             // Check if 'evolves_from' is not null and add it to the template string
//             if (pokemon.evolves_from !== null) {
//                 pokemonInfo += `\n|Evolves From: ${pokemon.evolves_from_name}`;
//             }

//             pokemonInfo += "\n--------------------\n";

//             res.write(pokemonInfo);
//         });
//         res.end();
//     })
// })

// app.get("/pokes2", (request, res) => {
//     const theQuery = "select * from pokemon_ref where national_id > 257";
//     let values = [257];

//     db.query(theQuery, (err, result) => {
//         if (err) {
//             console.error("Error retrieving image:", err);
//             res.status(500).send("Error retrieving image");
//             return;
//         }

//         if (result.length === 0) {
//             res.status(404).send("valid pokes not found");
//             return;
//         }

//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json({ poke: result });
//     });
// });

// app.get("/pokes3", (request, res) => {
//     const theQuery = "select * from pokemon_ref join pokemon_pics on pokemon_ref.national_id = pokemon_pics.national_id";

//     db.query(theQuery, (err, result) => {
//         if (err) {
//             console.error("Error retrieving image:", err);
//             res.status(500).send("Error retrieving image");
//             return;
//         }

//         if (result.length === 0) {
//             res.status(404).send("valid pokes not found");
//             return;
//         }

//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json({ poke: result });
//     });
// });

// app.get("/pokeSprite/:national_id", (request, response) => {
//     const theQuery = "SELECT * FROM pokemon_ref JOIN pokemon_pics ON pokemon_ref.national_id = pokemon_pics.national_id WHERE pokemon_ref.national_id = ?";
//     const values = [request.params.national_id];

//     db.query(theQuery, values, (err, rows) => {
//       if (err) {
//         console.error("Error retrieving image:", err);
//         response.status(500).send("Error retrieving image");
//         return;
//       }

//       if (rows.length !== 1) {
//         response.status(404).send("Valid pokes not found");
//       } else {
//         response.setHeader('Content-Type', 'application/json');
//         response.status(200).json({ sprite: rows[0].sprite });
//       }
//     });
//   });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const port = 3001; // Replace this with your desired port number

// Configure static file serving for the "public" folder
app.use(express.static('public'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bbc1d236a2fdf8',
    password: 'c0f12074',
    database: 'heroku_7dd2ee314208c5d',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Endpoint for retrieving Pokemon information
app.get("/pokes", (req, res) => {
    const testQuery = `
        SELECT *,
            (SELECT pr.name FROM pokemon_ref pr WHERE pr.national_id = er.evolves_from) AS evolves_from_name
        FROM pokemon_ref p
        NATURAL JOIN pokemon_type
        JOIN evolve_ref er ON p.national_id = er.national_id
    `;

    db.query(testQuery, (err, result) => {
        if (err) {
            console.error("Error retrieving Pokemon data:", err);
            res.status(500).send("Error retrieving Pokemon data");
            return;
        }
        const pokemonInfoList = result.map(pokemon => {
            let pokemonInfo = `Name: ${pokemon.name}
                |ID: ${pokemon.national_id}
                |Primary Type: ${pokemon.primary_type}
                |Secondary Type: ${pokemon.secondary_type || 'None'}`;
            if (pokemon.evolves_from !== null) {
                pokemonInfo += `\n|Evolves From: ${pokemon.evolves_from_name}`;
            }
            return pokemonInfo + "\n--------------------";
        });
        res.send(pokemonInfoList.join('\n'));
    });
});

// Endpoint for retrieving Pokemon images and details
app.get("/pokes3", (req, res) => {
    const theQuery = "SELECT * from pokemon_ref join pokemon_pics on pokemon_ref.national_id = pokemon_pics.national_id";
    db.query(theQuery, (err, result) => {
        if (err) {
            console.error("Error retrieving image:", err);
            res.status(500).send("Error retrieving image");
            return;
        }
        if (result.length === 0) {
            res.status(404).send("Valid pokes not found");
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ poke: result });
    });
});

// Endpoint for retrieving specific Pokemon sprite
app.get("/pokeSprite/:national_id", (req, res) => {
    const theQuery = `
    SELECT * 
    FROM pokemon_ref 
    JOIN pokemon_pics ON pokemon_ref.national_id = pokemon_pics.national_id 
    WHERE pokemon_ref.national_id = ?
`;

    const values = [req.params.national_id];
    db.query(theQuery, values, (err, rows) => {
        if (err) {
            console.error("Error retrieving sprite:", err);
            res.status(500).send("Error retrieving sprite");
            return;
        }
        if (rows.length !== 1) {
            res.status(404).send("Valid pokes not found");
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ sprite: rows[0].sprite });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
