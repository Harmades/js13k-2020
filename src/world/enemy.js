import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Vector } from "../math/vector.js";

export class Enemy {
    constructor(shape, bounciness) {
        this.body = new Body(1);
        this.body.shape = shape;
        this.body.bounciness = bounciness;
        this.body.isStatic = true;
        this.body.position = shape.vertices[0];
        this.body.onCollision = () => this.onCollision();
        this.healthPoint = 1;
    }

    onCollision() {
        this.healthPoint--;
    }

    update(delta) {
        this.body.speed = new Vector(0, 10);
        this.body.update(delta);
    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else {

        }
    }
}