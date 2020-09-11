import { Game } from './game';
import { Assets } from './assets';

Assets.load(
    document.getElementById("svg") as any,
    () => {
        const game = new Game();
        game.loop(performance.now());
    }
);