import { Shape } from "../math/shape.js";
import { Vector } from "../math/vector.js";
import { Body } from "../physic/body.js";
import { Settings } from "../settings.js";

export class Ball {
    constructor() {
        this.body = new Body(Settings.ballMass);
        this.body.shape = Shape.circle(50, 50, Settings.ballRadius);
        this.body.position = new Vector(50, 50);
        this.body.bounciness = Settings.ballBounciness;
        this.body.applyField(new Vector(0, this.body.mass * Settings.gravity));
    }

    update(delta) {
        this.body.update(delta);
    }
}