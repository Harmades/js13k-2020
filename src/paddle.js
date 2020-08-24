import { Body } from './physic/body.js';
import { Shape } from './math/shape.js';
import { Vector } from './math/vector.js';


export class Paddle {
    constructor(position, direction, maxAngle) {
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
        this.maxAngle = maxAngle;
        this.flipSpeed = 0.01;
        this.angle = 0;
        this.flipping = false;
        this.tag = 'paddle';
    }

    flip() {
        this.flipping = true;
    }

    getContactFactor(position) {
        return this.body.position.dot(position);
    }

    update(delta) {
        if (this.flipping) {
            if (Math.abs(this.angle) < Math.abs(this.maxAngle)) {
                const rotation = Math.sign(this.maxAngle) * this.flipSpeed * delta;
                this.angle += rotation;
                this.body.rotate(rotation);
            } else {
                this.flipping = false;
            }
        } else {
            if (Math.abs(this.angle) > Math.PI / 360) {
                const rotation = -Math.sign(this.maxAngle) * this.flipSpeed * delta;
                this.angle += rotation;
                this.body.rotate(rotation);
            } else {
                this.flipping = false;
            }

        }
    }
}