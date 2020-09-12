import { Vector } from "../math/vector";
import { Settings } from "../settings";
import { Entity } from "./entity";

export class Ball extends Entity {
    initialPosition: Vector;

    constructor() {
        super('ball', new Vector(560, 600), Settings.ballBounciness, Settings.ballMass);
        this.initialPosition = this.body.pos;
        this.body.isStatic = false;
        this.body.applyField(new Vector(0, this.body.mass * Settings.gravity));
    }

    reset() { this.body.pos = this.initialPosition; }

    update(delta: number) { this.body.update(delta); }
}
