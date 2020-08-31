import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Phase1 } from "./phase1.js";

export class Gold {
    constructor(shape, bounciness) {
        this.body = new Body(null);
        this.body.shape = shape;
        this.body.bounciness = bounciness;
        this.body.isStatic = true;
        this.body.isRigid = false;
        this.body.position = shape.vertices[0];
        this.body.onAreaEnter = () => this.onAreaEnter();
    }

    update(delta) { }

    onAreaEnter() {
        Phase1.goldScore++;
    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else {

        }
    }
}