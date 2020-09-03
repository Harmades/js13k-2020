import { Game } from './src/game.js';
import { Kick, Snare, Bell } from './src/synthesizer.js';
import { Assets } from './src/assets.js';
import { p1 } from './src/assets.gen/p1.js';

Assets.load(
    p1,
    [
        'ball',
        'plunger',
        'left-kicker',
        'left-flipper',
        'right-flipper',
        'right-kicker',
        'wall-1',
        'wall-2',
        'wall-3',
        'wall-4',
        'wall-5',
        'wall-6',
        'wall-7',
        'wall-8',
        'wall-9',
        'wall-10',
        'wall-11',
        'wall-12',
        'wall-13',
        'wall-14',
        'wall-15',
        'wall-16',
        'wall-17',
        'iron-1',
        'iron-2',
        'iron-3',
        'iron-4',
        'iron-5',
        'tree-1',
        'tree-2',
        'gold-1',
        'gold-2',
        'gold-3',
        'bumper'

        // 'axe-bumper.collider',
        // 'sword-bumper.collider',
        // 'lance-bumper.collider',

        // 'enemy-1.collider',
        // 'enemy-2.collider',
        // 'enemy-3.collider',
        // 'enemy-4.collider',
        // 'enemy-5.collider',
        // 'boss.collider',
    ],
    () => {
        const game = new Game();
        game.loop(performance.now());
    }
);

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