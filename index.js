import { Game } from './src/game.js';
import { Assets } from './src/assets.js';

Assets.load(
    document.getElementById("svg"),
    () => {
        const game = new Game();
        game.loop(performance.now());
    }
);