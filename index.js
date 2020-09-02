import { Game } from './src/game.js';
import { Kick, Snare, Bell } from './src/synthesizer.js';
import { Assets } from './src/assets.js';
import { p3 } from './src/assets.gen/p3.js';
import { Songs } from './src/sounds.js';

Assets.load(
    document.getElementById("svg"),
    () => {
        const game = new Game();
        game.loop(performance.now());
    }
);

const context = new AudioContext();
const kick = new Kick(context);
const snare = new Snare(context);
const bell = new Bell(context);
const song = new Songs();

function playKick() { kick.trigger(context.currentTime); }

function playSnare() { snare.trigger(context.currentTime); }

function playBell() { bell.trigger(context.currentTime); }

function playIntro() { song.play_intro(); }

window.playKick = playKick;
window.playSnare = playSnare;
window.playBell = playBell;
window.playIntro = playIntro;