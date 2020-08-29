import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";

export class Wall {
    constructor(position, width, height, angle = 0) {
        this.body = new Body(null);
        this.body.shape = Shape.rectangle(position.x, position.y, width, height);
        this.body.shape.rotate(position, angle);
        this.body.bounciness = Settings.wallBounciness;
        this.body.isStatic = true;
        this.body.position = position;
    }

    update(delta) { }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else {

        }
    }
}