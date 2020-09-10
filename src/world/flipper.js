import { Body } from '../physic/body.js';
import { Shape } from '../math/shape.js';
import { Vector } from '../math/vector.js';
import { Settings } from '../settings.js';
import { Input } from '../input.js';
import { Assets } from '../assets.js';
import { Effects } from '../sounds.js';

export class Flipper {
    constructor(id, side, player) {
        this.player = player;
        this.sign = null;
        this.spriteBounds = Assets.sprites[id];
        this.body = new Body(null);
        this.body.shape = Assets.colliders[`${id}.collider`];
        this.body.bounciness = Settings.paddleBounciness;
        if (side == 'right') {
            this.sign = -1;
            this.body.position = new Vector(290.61, 652.71);
            this.center = new Vector(344, 664.3);
            this.body.hFlip(this.spriteBounds.width / 2);
        }
        if (side == 'left') {
            this.sign = 1;
            this.body.position = new Vector(178.11, 653);
            this.center = new Vector(188.2, 664.3);
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
			if (this.angle == 0) {
			  Effects.paddle();
			}
            if (Math.abs(this.angle) < Math.abs(this.maxAngle)) {
                const rotation = Math.sign(this.maxAngle) * this.angularSpeed * delta;
                const distance = this.center.subtract(this.player.body.position).length() + 20;
                this.angle += rotation;
                this.body.rotate(this.center.subtract(this.body.position), rotation);
                this.body.speed = new Vector(
                    Math.sign(this.maxAngle) * Math.cos(this.angle),
                    -Math.sign(this.maxAngle) * Math.sin(this.angle)
                    ).multiply(10000 * this.angularSpeed / distance); 
            } else {
                this.flipping = false;
                this.body.speed = Vector.zero();
            }
        } else {
            if (Math.abs(this.angle) > Math.PI / 360) {
                const rotation = -Math.sign(this.maxAngle) * this.angularSpeed * delta;
                const distance = this.center.subtract(this.player.body.position).length() + 20;
                this.angle += rotation;
                this.body.rotate(this.center.subtract(this.body.position), rotation);
                this.body.speed = new Vector(
                    Math.sign(this.maxAngle) * Math.cos(this.angle),
                    -Math.sign(this.maxAngle) * Math.sin(this.angle)
                    ).multiply(-10000 * this.angularSpeed / distance); 
            } else {
                this.flipping = false;
				this.body.speed = Vector.zero();
				this.angle = 0;
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