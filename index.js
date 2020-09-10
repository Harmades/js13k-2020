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

// songs.play_intro();
// songs.play_ptwo();