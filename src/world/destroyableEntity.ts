import { Entity } from "./entity";
import { Gui } from "./gui";
import { Settings } from "../settings";
import { Vector } from "../math/vector";

export class DestroyableEntity extends Entity {
    life: number;
    decay: number;
    score: number;

    constructor(id: string, position: Vector, score: number, bounciness = Settings.wallBounciness, mass: number = null) {
        super(id, position, bounciness, mass);
        this.life = 1;
        this.decay = 1;
        this.body.onCollision = (_) => this.onCollision();
        this.score = score;
    }

    onCollision() {
        this.life -= this.decay;
        if (this.life <= 0) {
            this.body.ignoreCollision = true;
            Gui.score(this.score);
        }
    }

    render(context: CanvasRenderingContext2D) {
        if (this.life <= 0) return;
        super.render(context);
    }
}