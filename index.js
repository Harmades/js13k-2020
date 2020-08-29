import { Game } from './src/game.js';
import { Kick, Snare, Bell } from './src/synthesizer.js';
import { Assets } from './src/assets.js';
import { ball } from './src/assets.gen/ball.js';

Assets.loadSvg("ball", ball, () => {
    const game = new Game();
    game.loop(performance.now());
});
const context = new AudioContext();
const kick = new Kick(context);
const snare = new Snare(context);
const bell = new Bell(context);

function playKick() { kick.trigger(context.currentTime); }

function playSnare() { snare.trigger(context.currentTime); }

function playBell() { bell.trigger(context.currentTime); }

window.playKick = playKick;
window.playSnare = playSnare;
window.playBell = playBell;