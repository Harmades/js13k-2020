import { Shape } from "./math/shape.js";
import { Vector } from "./math/vector.js";
import { Body } from "./physic/body.js";

export class Ball {
    constructor() {
        this.body = new Body(10);
        this.body.shape = Shape.circle(50, 50, 25);
        this.body.position = new Vector(50, 50);
    }

    update(delta) {
        this.body.update(delta);
    }
}