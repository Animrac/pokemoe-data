# pokemoe-data
is any further description necessary

# Install instructions
1. Download repository.
1. Open the terminal and run `npm install` in both the `client` and `server` directories to download dependencies.
1. Optionally run additional install of `npm install --save-dev @babel/plugin-proposal-private-property-in-object` to make an annoying (ineffectual) error go away.
1. In the terminal run `npm start` from the `server` directory.
1. In a _second_ terminal run `npm start` from the `client` directory.
1. The app should open on its own in your default browser. if it does not you can reach it manually by going to `http://localhost:3000/pokemoe-data`.

# Troubleshooting:
1. If you receive an error about how "options.allowedHosts[0] should be a non-empty string", go to this directory: `\pokemoe-data\client\node_modules\react-scripts\config` and find `webpackDevServer.config`. Change line 46: `allowedHosts: disableFirewall ? 'all' : [allowedHost],` to: `allowedHosts: disableFirewall ? 'all' : "localhost"`.

<img src="https://github.com/cat-milk/Anime-Girls-Holding-Programming-Books/blob/master/NodeJs/Hifumi_Takimoto_NodeJs.png?raw=true" alt="Confusion">