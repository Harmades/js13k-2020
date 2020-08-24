import { Vector } from "../math/vector.js";
import { Shape } from "../math/shape.js";

export class Body {
    constructor(mass) {
        this.position = Vector.zero();
        this.speed = Vector.zero();
        this.mass = mass || 10;
        this.shape = Shape.rectangle(0, 0, 50, 50);
        this.force = Vector.zero();
    }

    applyImpulse(force) {
        this.force = this.force.add(force);
    }

    rotate(angle) {
        this.shape.rotate(angle);
    }

    translate(vector) {
        this.position.add(vector);
        this.shape.translate(vector);
    }

    update(delta) {
        this.speed = this.speed.add(this.force.multiply(1 / this.mass * delta));
        this.translate(this.speed.multiply(delta));
        this.force = new Vector(0, 1000);
    }
}