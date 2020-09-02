import { Game } from './src/game.js';
import { Kick, Snare, Bell } from './src/synthesizer.js';
import { Assets } from './src/assets.js';
import { p3 } from './src/assets.gen/p3.js';

Assets.loadColliders(
    p3,
    [
        'ball.collider',
        // 'plunger.collider',
        'left-kicker.collider',
        'left-flipper.collider',
        'right-flipper.collider',
        'right-kicker.collider',
        // 'wall-1.collider',
        // 'wall-2.collider',
        'wall-3.collider',
        // 'wall-4.collider',
        // 'wall-5.collider',
        'wall-6.collider',
        // 'wall-7.collider',
        // 'wall-8.collider',
        'wall-9.collider',
        'wall-10.collider',
        'wall-11.collider',
        'wall-12.collider',
        'wall-13.collider',
        'wall-14.collider',
        'wall-15.collider',


        // 'wall-16.collider',
        // 'wall-17.collider',
        // 'iron-1.collider',
        // 'iron-2.collider',
        // 'iron-3.collider',
        // 'iron-4.collider',
        // 'iron-5.collider',
        // 'tree-1.collider',
        // 'tree-2.collider',
        // 'gold-1.collider',
        // 'gold-2.collider',
        // 'gold-3.collider',
        // 'bumper.collider'

        // 'axe-bumper.collider',
        // 'sword-bumper.collider',
        // 'lance-bumper.collider',

        'enemy-1.collider',
        'enemy-2.collider',
        'enemy-3.collider',
        'enemy-4.collider',
        'enemy-5.collider',
        'boss.collider'
    ]
);
const game = new Game();
game.loop(performance.now());
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