import { Body } from "../physic/body.js";
import { Settings } from "../settings.js";
import { Shape } from "../math/shape.js";
import { Vector } from "../math/vector.js";

export class Kicker {
    constructor(shape) {
        this.body = new Body(null);
        this.body.shape = shape;
        this.body.bounciness = Settings.wallBounciness;
        this.body.position = shape.vertices[0];
        this.body.speed = new Vector(0, -Settings.kickerImpulseSpeed);
        this.body.isStatic = false;
    }

    update(delta) {

    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else {

        }
    }
}