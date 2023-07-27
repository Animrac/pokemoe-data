const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

const sqlFormatter = require('sql-formatter');

const port = 3000; // Replace this with your desired port number

// Configure static file serving for the "public" folder
app.use(express.static('public'));

// Your other routes and middleware can be defined here...

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




const db = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bbc1d236a2fdf8',
    password: 'c0f12074',
    database: 'heroku_7dd2ee314208c5d'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const imgQ = "SELECT * from pokemon_pics";

app.get("/snore", (req, res) => {
    const imageId = req.params.id;

    // Query the database to retrieve the binary image data
    db.query(imgQ, (err, result) => {
        if (err) {
            console.error("Error retrieving image:", err);
            res.status(500).send("Error retrieving image");
            return;
        }

        if (result.length === 0) {
            res.status(404).send("Image not found");
            return;
        }




        result.forEach(row => {
            res.write(row.sprite);
        });

        res.end();



        // // Retrieve the image data from the query result
        // const imageBuffer = result[1].sprite;

        // // Set the appropriate Content-Type for the image
        // res.set("Content-Type", "image/png"); // Change the content type according to your image format

        // // Send the image binary data as the response
        // // res.write("snorlax ig:");
        // res.write(imageBuffer);
        // res.end();
    });
});

const testQuery = "SELECT *, " +
                 "(SELECT pr.name FROM pokemon_ref pr WHERE pr.national_id = er.evolves_from) AS evolves_from_name " +
                 "FROM pokemon_ref p " +
                 "NATURAL JOIN pokemon_type "+ 
                 "JOIN evolve_ref er ON p.national_id = er.national_id";

// const formattedSql = sqlFormatter.format(testQuery); wth this just formats the query
                
app.get("/pokes", (req, res) => {        
    db.query(testQuery, (err, result) => {
        if (err) {
            throw err;
          }
        result.forEach((pokemon) => {
            let pokemonInfo = `Name: ${pokemon.name}
|ID: ${pokemon.national_id}
|Primary Type: ${pokemon.primary_type}
|Secondary Type: ${pokemon.secondary_type ? pokemon.secondary_type : 'None'}`;

            // Check if 'evolves_from' is not null and add it to the template string
            if (pokemon.evolves_from !== null) {
                pokemonInfo += `\n|Evolves From: ${pokemon.evolves_from_name}`;
            }

            pokemonInfo += "\n--------------------\n";

            res.write(pokemonInfo);
        });
        res.end();
    })
})

app.get("/", (req, res) => {
    res.send("type \/uwu in the URL pls");
})

app.get("/uwu", (req, res) => {
    res.send("HIT THAT YOINKY SPLOINKY");
})

app.get("/owo", (req, res) => {
    res.send("stop");
})


app.listen(3001, () => {
    console.log("running on port 3001 yaya idk what im doing")
})



// app.get("/pokes", (req, res) => {        
//     db.query(testQuery, (err, result) => {
//         if (err) {
//             throw err;
//           }
//         // console.log(result);
//         // const parsedData = JSON.parse(result);

//         // result.forEach((pokemon) => {
//         //     console.log(`Name: ${pokemon.name}`);
//         //     console.log(`ID: ${pokemon.national_id}`);
//         //     console.log("--------------------");
//         //   });

//         result.forEach((pokemon) => {
//             const pokemonInfo = 
//                 `Name: ${pokemon.name}
//                 \nID: ${pokemon.national_id}
//                 \nPrimary Type: ${pokemon.primary_type}
//                 \nEvolves From: ${pokemon.evolves_from}
//                 \n--------------------\n`;
//             res.write(pokemonInfo);
//         });
//         res.end();

//     })
// })