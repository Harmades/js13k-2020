import { Game } from './src/game.js';
import { Songs } from './src/sounds.js';
import { Assets } from './src/assets.js';

Assets.load(
    document.getElementById("svg"),
    () => {
        const game = new Game();
        game.loop(performance.now());
    }
);

const songs = new Songs();

function playIntro() { songs.play_intro();}
function playPone() { songs.play_pone();}
function playPtwo() { songs.play_ptwo();}
function stop() { songs.stop_song();}

window.playIntro = () => playIntro();
window.playPone = () => playPone();
window.playPtwo = () => playPtwo();
window.stop = () => stop();

