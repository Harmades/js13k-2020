import { Entity } from "./entity.js";
import { Score } from "./score.js";
import { Settings } from "../settings.js";

export class DestroyableEntity extends Entity {
    constructor(id, position, score, bounciness = Settings.wallBounciness, mass = null) {
        super(id, position, bounciness, mass);
        this.life = 1;
        this.decay = 1;
        this.body.onCollision = () => this.onCollision();
        this.score = score;
    }

    onCollision() {
        this.life -= this.decay;
        if (this.life <= 0) {
            this.body.ignoreCollision = true;
            Score.score(this.score);
        }
    }

    render(context) {
        if (this.life <= 0) return;
        super.render(context);
    }
}