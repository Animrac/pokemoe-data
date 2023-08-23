<p align="center"><img src="https://github.com/Animrac/pokemoe-data/blob/main/client/src/moe.png?raw=true" alt="Confusion" width=200></p>

# PokéMoe Data
A Pokedex which allows users to create a party of pokemon and track what they have caught. It is coded in JavaScript, using React and Node, with a MySQL database.

The app is no longer hosted online, as this project had a intended short lifespan and server costs would not make sense to keep it running. Instructions for usage online and offline are kept below, for any user who desires to run the project in either configuration using their own resources. DDL/DML statements are provided in the repository to rebuild the database to correct specification.

When downloaded the app is capable of being run with local or remote server and database connectivity. Instructions for running fully remote and locally are provided below. Remote functionality is likely not to function past August 2023 due to server costs.

# Local Install instructions
1. Download repository.
1. Open the terminal and run `npm install` in both the `client` and `server` directories to download dependencies.
1. In the `server` folder find the file named `.env`. Comment out the lines labeled for Remote use, uncomment the lines labelled for Local use, and supply your local database configuration information, such as username, port, and password.
1. In the `client/src` folder find the file named `App.js`, at line 50 is there are two definitions given for a variable named `burl`, uncomment the one for _localhost_, and comment out the one for _pokemoe-server_.
1. In the terminal run `npm start` from the `server` directory.
1. In a _second_ terminal run `npm start` from the `client` directory.
1. The app should open on its own in your default browser. If it does not you can reach it manually by going to `http://localhost:3000/pokemoe-data`.

# Remote Install instructions
1. Download repository.
1. Open the terminal and run `npm install` in the `client` directory to download dependencies.
1. If the app has been run in local configuration previously (above), ensure to change back the value of `burl` at line 50 of `client/src/App.js`.
1. In the terminal run `npm start` from the `client` directory.
1. The app should open on its own in your default browser. If it does not you can reach it manually by going to `http://localhost:3000/pokemoe-data`.

# Usage Tricks & Tips
* The search bar accepts some limited commands:
    * `c:query` : only pokemon which match the query and have been caught will be returned
    * `!c:query` : only pokemon which match the query and have *not* been caught will be returned
* If you found the background music we have hidden in the application and wish to turn it off, clicking the button again will do so.

# Troubleshooting:
1. If you receive an error about how "options.allowedHosts[0] should be a non-empty string", go to this directory: `\pokemoe-data\client\node_modules\react-scripts\config` and find `webpackDevServer.config`. Change line 46: `allowedHosts: disableFirewall ? 'all' : [allowedHost],` to: `allowedHosts: disableFirewall ? 'all' : "localhost"`.


<img src="https://github.com/cat-milk/Anime-Girls-Holding-Programming-Books/blob/master/NodeJs/Hifumi_Takimoto_NodeJs.png?raw=true" alt="Confusion">
