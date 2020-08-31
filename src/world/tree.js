import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Phase1 } from "./phase1.js";

export class Tree {
    constructor(shape, bounciness) {
        this.body = new Body(null);
        this.body.shape = shape;
        this.body.bounciness = bounciness;
        this.body.isStatic = true;
        this.body.position = shape.vertices[0];
        this.body.onCollision = () => this.onCollision();
        this.healthPoint = 1;
    }

    onCollision() {
        this.healthPoint--;
        Phase1.woodScore++;
    }

    update(delta) { }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else {

        }
    }
}