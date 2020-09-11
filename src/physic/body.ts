import { Vector } from "../math/vector";
import { Shape } from "../math/shape";

export class Body {
    position: Vector;
    speed: Vector;
    mass: number;
    shape: Shape;
    impulse: Vector;
    field: Vector;
    bounciness: number;
    isStatic: boolean;
    ignoreCollision: boolean;
    isRigid: boolean;
    onCollision: (mtv: Vector) => void;
    onCollisionResolved: (speed: number) => void;
    onAreaEnter: () => void;
    onAreaExit: () => void;

    constructor(mass: number) {
        this.position = Vector.zero();
        this.speed = Vector.zero();
        this.mass = mass;
        this.shape = null;
        this.impulse = Vector.zero();
        this.field = Vector.zero();
        this.bounciness = 1;
        this.isStatic = true;
        this.ignoreCollision = false;
        this.isRigid = true;
    }

    hFlip(axe: number) {
        this.shape = this.shape.hFlip(axe);
    }

    applyImpulse(force: Vector) {
        this.impulse = this.impulse.add(force);
    }

    applyField(force: Vector) {
        this.field = this.field.add(force);
    }

    rotate(center: Vector, angle: number) {
        this.shape.rotate(center, angle);
    }

    translate(vector: Vector) {
        this.position = this.position.add(vector);
    }

    getShape() {
        return new Shape(this.shape.vertices.map(v => v.add(this.position)));
    }

    update(delta: number) {
        this.speed = this.speed.add(this.impulse.add(this.field).multiply(1 / this.mass * delta));
        this.translate(this.speed.multiply(delta));
        this.impulse = Vector.zero();
    }
}