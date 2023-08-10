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
        SELECT pr.name, pr.national_id, pp.icon_1, pc.caught
        from pokemon_ref pr
        join pokemon_pics pp on pr.national_id = pp.national_id
        join pokemon_caught pc on pp.national_id = pc.national_id`;
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

// /**
//  * Allows for getting a specific pokemon's sprite.
//  * Example URL: http://localhost:3001/pokeSprite/255
//  */
// app.get("/pokeSprite/:national_id", (req, res) => {
//     const theQuery = `
//         SELECT * 
//         FROM pokemon_ref 
//         JOIN pokemon_pics ON pokemon_ref.national_id = pokemon_pics.national_id 
//         WHERE pokemon_ref.national_id = ?
//     `;

//     const values = [req.params.national_id];
//     db.query(theQuery, values, (err, rows) => {
//         if (err) {
//             console.error("Error retrieving sprite:", err);
//             res.status(500).send("Error retrieving sprite");
//             return;
//         }
//         if (rows.length !== 1) {
//             res.status(404).send("Valid pokes not found");
//         } else {
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json({ sprite: rows[0].sprite });
//         }
//     });
// });

// /**
//  * Allows for getting a specific pokemon's name.
//  * Example URL: http://localhost:3001/pokeName/255
//  */
// app.get("/pokeName/:national_id", (req, res) => {
//     const theQuery = `
//         SELECT * 
//         FROM pokemon_ref 
//         WHERE pokemon_ref.national_id = ?
//     `;

//     const values = [req.params.national_id];
//     db.query(theQuery, values, (err, rows) => {
//         if (err) {
//             console.error("Error retrieving sprite:", err);
//             res.status(500).send("Error retrieving sprite");
//             return;
//         }
//         if (rows.length !== 1) {
//             res.status(404).send("Valid pokes not found");
//         } else {
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json({ name: rows[0].name,
//             national_id : rows[0].national_id });
//         }
//     });
// });




/**
 * Allows for getting a specific pokemon's name, sprite, icon, 
 * base stats, location, abilities, rates, and type(s).
 * Example URL: http://localhost:3001/pokeName/255
 */
app.get("/pokeData/:national_id", (req, res) => {
    const theQuery = `
        SELECT *
        FROM pokemon_ref
            join pokemon_type pt on pokemon_ref.national_id = pt.national_id
            join base_stats bs on pokemon_ref.national_id = bs.ID
            join other_ref o on pokemon_ref.national_id = o.national_id
            join pokemon_abilities pa on pokemon_ref.national_id = pa.national_id
            join pokemon_location pl on pokemon_ref.national_id = pl.national_id
            join pokemon_pics pp on pokemon_ref.national_id = pp.national_id
        WHERE pokemon_ref.national_id = ?
    `;

    const values = [req.params.national_id];
    db.query(theQuery, values, (err, rows) => {
        if (err) {
            console.error("Error retrieving data:", err);
            res.status(500).send("Error retrieving data");
            return;
        }
        if (rows.length !== 1) {
            res.status(404).send("Valid pokes not found");
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ 
                name: rows[0].name,
                national_id : rows[0].national_id,
                location : rows[0].location,
                height : rows[0].height,
                weight : rows[0].weight,
                catch_rate : rows[0].catch_rate,
                male_gender_ratio : rows[0].male_gender_ratio,
                level_rate : rows[0].level_rate,
                sprite : rows[0].sprite,
                icon_1 : rows[0].icon_1,
                icon_2 : rows[0].icon_2,
                evolves_from : rows[0].evolves_from,
                evolve_method : rows[0].evolve_method,
                Attack : rows[0].Attack,
                Defense : rows[0].Defense,
                Speed : rows[0].Speed,
                HP : rows[0].HP,
                Special_Attack : rows[0].Special_Attack,
                Special_Defense : rows[0].Special_Defense,
                primary_type : rows[0].primary_type, 
                secondary_type : rows[0].secondary_type,});
        }
    });
});




/**
 * Endpoint for retrieving party pokemon.
 * Example URL: http://localhost:3001/party
 */
app.get("/party", (req, res) => {
    const theQuery = `
        select pa.slot, pp.sprite
        from pokemon_party pa
        join pokemon_pics pp on pa.id = pp.national_id`;
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
    
    var theQuery = `
        INSERT INTO pokemon_party (slot, ID)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE ID = VALUES(ID);
    `;

    if (ID === -1) {
        theQuery = `
        DELETE FROM pokemon_party WHERE slot = ?;
    `;
    }

    db.query(theQuery, [slot, ID], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Error executing query");
            return;
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: "success" });
    });
});

/**
 * Endpoint for setting caught pokemon.
 * Example URL: http://localhost:3001/caught
 */
app.post("/caught", (req, res) => {
    const ID = req.body.ID;     // Assuming the ID value is provided in the request body
    
    const theQuery = `
        update pokemon_caught
        SET caught = not caught
        WHERE national_id = ?;
    `;
    db.query(theQuery, [ID], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Error executing query");
            return;
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: "Caught pokemon updated successfully" });
    });
});

// TODO: should get: evolves from, evolves into, checkboxes
// TODO: should also get abilities and their descriptions

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
