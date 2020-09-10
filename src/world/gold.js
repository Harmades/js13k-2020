import { Settings } from "../settings.js";
import { Phase1 } from "./phase1.js";
import { Effects } from "../sounds.js";
import { Score } from "./score.js";
import { Entity } from "./entity.js";

export class Gold extends Entity {
    constructor(position) {
        super('gold', position);
        this.body.isRigid = false;
        this.body.onAreaEnter = () => this.onAreaEnter();
        this.jackpot = false;
    }

    onAreaEnter() {
        Phase1.goldScore++;
        Phase1.updateScore();
        this.jackpot = !this.jackpot;
        Score.score(5);
		Effects.coin();
    }

    render(context) {
        super.render(context);
        if (Settings.debug) return;
        if (!this.jackpot) {
            context.fillStyle = "rgba(0, 0, 0, 0.5)";
            context.fillRect(this.body.position.x, this.body.position.y, this.spriteBounds.width, this.spriteBounds.height);
        }
    }
}