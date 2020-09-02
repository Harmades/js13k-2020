import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Vector } from "../math/vector.js";

export class Boss {
    constructor(shape) {
        this.body = new Body(1);
        this.body.shape = shape;
        this.body.bounciness = Settings.wallBounciness;
        this.body.isStatic = true;
        this.body.position = shape.vertices[0];
        this.body.onCollision = () => this.onCollision();
        this.healthPoint = 3;
    }
    
    onCollision() {
        this.healthPoint--;
        if (this.healthPoint == 0) this.body.ignoreCollision = true;
    }

    update(delta) {
        this.body.speed = new Vector(0, 10);
        this.body.update(delta);
    }

    render(delta, context) {
        if (Settings.debug) {
            if (this.healthPoint != 0) {
                Shape.debugDraw(this.body.shape, context);
            }
        } else {

        }
    }
}