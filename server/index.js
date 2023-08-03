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

/**
 * Endpoint test for basic text results of stored pokemon data.
 * Example URL: http://localhost:3001/pokes
 */
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

/**
 * Endpoint for retrieving all pokemon basic details.
 * Example URL: http://localhost:3001/pokes3
 */
app.get("/pokes3", (req, res) => {
    const theQuery = `
        SELECT pr.name, pr.national_id, pp.icon_1
        from pokemon_ref pr
        join pokemon_pics pp on pr.national_id = pp.national_id`;
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

/**
 * Allows for getting a specific pokemon's sprite.
 * Example URL: http://localhost:3001/pokeSprite/255
 */
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

/**
 * Endpoint for retrieving party pokemon.
 * Example URL: http://localhost:3001/party
 */
app.get("/party", (req, res) => {
    const theQuery = `
        SELECT pr.name, pr.national_id, pp.icon_1
        from pokemon_party pa
        join pokemon_ref pr on pa.national_id = pr.national_id
        join pokemon_pics pp on pr.national_id = pp.national_id`;
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

/**
 * Endpoint for setting party pokemon.
 * Example URL: http://localhost:3001/party
 */
app.post("/party", (req, res) => {
    const slot = req.body.slot; // Assuming the slot value is provided in the request body
    const ID = req.body.ID;     // Assuming the ID value is provided in the request body
    
    if (typeof slot !== 'number' || typeof ID !== 'number' || slot < 1 || slot > 6) {
        res.status(400).send("Invalid slot or ID values");
        return;
    }
    
    const theQuery = `
        INSERT INTO pokemon_party (slot, ID)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE ID = VALUES(ID);
    `;
    db.query(theQuery, [slot, ID], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Error executing query");
            return;
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: "Party pokemon updated successfully" });
    });
});

// TODO: should get: evolves from, evolves into, checkboxes

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
