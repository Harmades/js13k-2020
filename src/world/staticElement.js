import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";

export class StaticElement {
    constructor(shape, bounciness) {
        this.body = new Body(null);
        this.body.shape = shape;
        this.body.bounciness = bounciness;
        this.body.isStatic = true;
        this.body.position = shape.vertices[0];
    }

    update(delta) { }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else {

        }
    }
}