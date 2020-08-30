import { Vector } from "../math/vector.js";
import { Shape } from "../math/shape.js";

export class Body {
    constructor(mass) {
        this.position = Vector.zero();
        this.speed = Vector.zero();
        this.mass = mass;
        this.shape = Shape.rectangle(0, 0, 50, 50);
        this.impulse = Vector.zero();
        this.field = Vector.zero();
        this.bounciness = 1;
        this.isStatic = false;
        this.ignoreCollision = false;
        this.isRigid = true;
    }

    applyImpulse(force) {
        this.impulse = this.impulse.add(force);
    }

    applyField(force) {
        this.field = this.field.add(force);
    }

    rotate(angle) {
        this.shape.rotate(this.position, angle);
    }

    translate(vector) {
        this.position = this.position.add(vector);
        this.shape.translate(vector);
    }

    update(delta) {
        this.speed = this.speed.add(this.impulse.add(this.field).multiply(1 / this.mass * delta));
        this.translate(this.speed.multiply(delta));
        this.impulse = Vector.zero();
    }
}