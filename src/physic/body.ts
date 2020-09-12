import { Vector } from "../math/vector";
import { Shape } from "../math/shape";

export class Body {
    pos: Vector;
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
        this.pos = Vector.z();
        this.speed = Vector.z();
        this.mass = mass;
        this.shape = null;
        this.impulse = Vector.z();
        this.field = Vector.z();
        this.bounciness = 1;
        this.isStatic = true;
        this.ignoreCollision = false;
        this.isRigid = true;
    }

    hFlip(axe: number) {
        this.shape = this.shape.hFlip(axe);
    }

    applyImpulse(force: Vector) {
        this.impulse = this.impulse.a(force);
    }

    applyField(force: Vector) {
        this.field = this.field.a(force);
    }

    rotate(center: Vector, angle: number) {
        this.shape.rotate(center, angle);
    }

    translate(vector: Vector) {
        this.pos = this.pos.a(vector);
    }

    getShape() {
        return new Shape(this.shape.vertices.map(v => v.a(this.pos)));
    }

    update(delta: number) {
        this.speed = this.speed.a(this.impulse.a(this.field).m(1 / this.mass * delta));
        this.translate(this.speed.m(delta));
        this.impulse = Vector.z();
    }
}