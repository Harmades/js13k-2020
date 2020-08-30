import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";

export class Gold {
    constructor(position, shape, bounciness) {
        this.body = new Body(null);
        this.body.shape = shape;
        this.body.bounciness = bounciness;
        this.body.isStatic = true;
        this.body.isRigid = false;
        this.body.position = position;
    }

    update(delta) { }

    onCollision() {
        // Trigger gold collection
    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else {

        }
    }
}