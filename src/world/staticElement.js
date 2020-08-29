import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";

export class StaticElement {
    constructor(position, shape, bouciness) {
        this.body = new Body(null);
        this.body.shape = shape;
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