import { Vector } from "../math/vector.js";
import { Settings } from "../settings.js";
import { Entity } from "./entity.js";

export class Ball extends Entity {
    constructor() {
        super('ball', new Vector(560, 632), Settings.ballBounciness, Settings.ballMass);
        this.initialPosition = this.body.position;
        this.body.isStatic = false;
        this.body.applyField(new Vector(0, this.body.mass * Settings.gravity));
    }

    reset() { this.body.position = this.initialPosition; }

    update(delta) { this.body.update(delta); }
}
