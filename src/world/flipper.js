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
        this.body.isStatic = true;
        this.maxAngle = -sign * Settings.paddleMaxAngle;
        this.angularSpeed = Settings.paddleAngularSpeed;
        this.angle = 0;
        this.flipping = false;
        this.tag = 'paddle';
    }

    flip() {
        this.flipping = true;
        this.body.bounciness = Settings.paddleBounciness;
    }

    getContactFactor(position) {
        return this.body.position.dot(position);
    }

    update(delta) {
        if (this.flipping) {
            if (Math.abs(this.angle) < Math.abs(this.maxAngle)) {
                const rotation = Math.sign(this.maxAngle) * this.angularSpeed * delta;
                this.angle += rotation;
                this.body.rotate(rotation);
            } else {
                this.flipping = false;
                this.body.bounciness = Settings.wallBounciness;
            }
        } else {
            if (Math.abs(this.angle) > Math.PI / 360) {
                const rotation = -Math.sign(this.maxAngle) * this.angularSpeed * delta;
                this.angle += rotation;
                this.body.rotate(rotation);
            } else {
                this.flipping = false;
                this.body.bounciness = Settings.wallBounciness;
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