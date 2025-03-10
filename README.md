# Cards Against Humanity
> Play CAH directly in your browser with the power of WebRTC

## What is different to the original
This is a visually updated version of the original code/game from ninest's cards-against-humanity. This includes a general new look, as well as new features


## Play in your browser
1. Ask the host (black card reader) to share the room code
2. The player should enter the room code and automatically join
3. The players should automatically connect to the game

## To do
- [x] Add player names
- [x] Add a scoring system
- [x] Add a scoreboard
- [ ] Better shuffling
- [ ] Selecting card packs
- [ ] Docker containerization for fast deployment

## Current limits
- Only one blank/white card per black card

## Built with
- NodeJS + Express
- Socket.IO
- HTML/CSS/JS (no frameworks)
- [JSON Against Humanity](https://www.crhallberg.com/cah/) (Using the base set)
- PeerJS
- Python (to generate arrays for the white and black cards)

## How to host
1. Install requirements
2. `npm install` to install the needed packages in npm
3. `npm start` to start the web game
4. Visit localhost:3000/ to get to the landing page
5. Have fun!

## License
GNU AGPLv3
