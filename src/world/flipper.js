import { Body } from '../physic/body.js';
import { Shape } from '../math/shape.js';
import { Vector } from '../math/vector.js';
import { Settings } from '../settings.js';
import { Input } from '../input.js';


export class Paddle {
    constructor(shape, side) {
        let sign = null;
        if (side == 'right') sign = -1;
        if (side == 'left') sign = 1;
        this.side = side;
        this.body = new Body(null);
        this.body.shape = shape;
        this.body.position = shape.vertices[0];
        this.body.bounciness = Settings.wallBounciness;
        this.maxAngle = -sign * Settings.paddleMaxAngle;
        this.angularSpeed = Settings.paddleAngularSpeed;
        this.angle = 0;
        this.flipping = false;
        this.tag = 'paddle';
    }

    flip() {
        this.flipping = true;
    }

    update(delta) {
        if (this.flipping) {
            if (Math.abs(this.angle) < Math.abs(this.maxAngle)) {
                const rotation = Math.sign(this.maxAngle) * this.angularSpeed * delta;
                this.angle += rotation;
                this.body.rotate(rotation);
                this.body.speed = new Vector(
                    Math.sign(this.maxAngle) * Math.cos(this.angle),
                    -Math.sign(this.maxAngle) * Math.sin(this.angle)
                    ).multiply(100000 * this.angularSpeed * 6 * delta); 
            } else {
                this.flipping = false;
                this.body.speed = Vector.zero();
            }
        } else {
            if (Math.abs(this.angle) > Math.PI / 360) {
                const rotation = -Math.sign(this.maxAngle) * this.angularSpeed * delta;
                this.angle += rotation;
                this.body.rotate(rotation);
                this.body.speed = new Vector(
                    Math.sign(this.maxAngle) * Math.cos(this.angle),
                    -Math.sign(this.maxAngle) * Math.sin(this.angle)
                    ).multiply(-100000 * this.angularSpeed * 6 * delta); 
            } else {
                this.flipping = false;
                this.body.speed = Vector.zero();
            }
        }

        if (Input.left && this.side == 'left' || Input.right && this.side == 'right') {
            this.flip();
        }
    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else {

        }
    }
}