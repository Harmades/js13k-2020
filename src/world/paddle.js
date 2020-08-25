import { Body } from '../physic/body.js';
import { Shape } from '../math/shape.js';
import { Vector } from '../math/vector.js';
import { Settings } from '../settings.js'


export class Paddle {
    constructor(position, direction) {
        let sign = null;
        if (direction == 'left') sign = -1;
        if (direction == 'right') sign = 1;
        this.body = new Body(null);
        this.body.shape = new Shape([
            new Vector(position.x, position.y + 10),
            new Vector(position.x + sign * 100, position.y + 10),
            new Vector(position.x + sign * 100, position.y - 10),
            new Vector(position.x, position.y - 10)
        ]);
        this.body.position = new Vector(position.x, position.y);
        this.body.bounciness = Settings.wallBounciness;
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
    }
}