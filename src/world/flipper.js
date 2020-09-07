import { Body } from '../physic/body.js';
import { Shape } from '../math/shape.js';
import { Vector } from '../math/vector.js';
import { Settings } from '../settings.js';
import { Input } from '../input.js';
import { Assets } from '../assets.js';


export class Flipper {
    constructor(id, side) {
        this.sign = null;
        this.spriteBounds = Assets.sprites[id];
        this.body = new Body(null);
        this.body.shape = Assets.colliders[`${id}.collider`];
        this.body.bounciness = Settings.wallBounciness;
        if (side == 'right') {
            this.sign = -1;
            this.body.position = new Vector(298.61, 654.71);
            this.center = new Vector(354, 664.3);
            this.body.hFlip(this.spriteBounds.width / 2);
        }
        if (side == 'left') {
            this.sign = 1;
            this.body.position = new Vector(168.11, 654.71);
            this.center = new Vector(178.2, 664.3);
        }
        this.side = side;
        this.maxAngle = -this.sign * Settings.paddleMaxAngle;
        this.angularSpeed = Settings.paddleAngularSpeed;
        this.angle = 0;
        this.flipping = false;
    }

    flip() {
        this.flipping = true;
    }

    update(delta) {
        if (this.flipping) {
            if (Math.abs(this.angle) < Math.abs(this.maxAngle)) {
                const rotation = Math.sign(this.maxAngle) * this.angularSpeed * delta;
                this.angle += rotation;
                this.body.rotate(this.center.subtract(this.body.position), rotation);
                this.body.speed = new Vector(
                    Math.sign(this.maxAngle) * Math.cos(this.angle),
                    -Math.sign(this.maxAngle) * Math.sin(this.angle)
                    ).multiply(10000 * this.angularSpeed * 6 * delta); 
            } else {
                this.flipping = false;
                this.body.speed = Vector.zero();
            }
        } else {
            if (Math.abs(this.angle) > Math.PI / 360) {
                const rotation = -Math.sign(this.maxAngle) * this.angularSpeed * delta;
                this.angle += rotation;
                this.body.rotate(this.center.subtract(this.body.position), rotation);
                this.body.speed = new Vector(
                    Math.sign(this.maxAngle) * Math.cos(this.angle),
                    -Math.sign(this.maxAngle) * Math.sin(this.angle)
                    ).multiply(-10000 * this.angularSpeed * 6 * delta); 
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
            Shape.debugDraw(this.body, context);
        } else {
            context.save();
            context.scale(this.sign, 1);
            context.translate(this.sign * this.center.x, this.center.y);
            const offset = this.sign == -1 ? -this.spriteBounds.width : 0;
            context.rotate(this.sign * this.angle);
            context.drawImage(
                Assets.atlas,
                this.spriteBounds.x,
                this.spriteBounds.y,
                this.spriteBounds.width,
                this.spriteBounds.height,
                this.sign * this.body.position.x + offset - this.sign * this.center.x,
                this.body.position.y - this.center.y,
                this.spriteBounds.width,
                this.spriteBounds.height
            );
            context.restore();
        }
    }
}