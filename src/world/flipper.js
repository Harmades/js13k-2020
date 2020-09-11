import { Vector } from '../math/vector.js';
import { Settings } from '../settings.js';
import { Input } from '../input.js';
import { Effects } from '../sounds.js';
import { Entity } from './entity.js';

export class Flipper extends Entity {
    constructor(side, player) {
        this.side = side;
        let position;
        let center;
        if (side == 1) {
            position = new Vector(178.11, 653);
            center = new Vector(188.2, 664.3);
        }
        if (side == -1) {
            position = new Vector(290.61, 652.71);
            center = new Vector(344, 664.3);
        }
        super('flipper', position, Settings.paddleBounciness);
        this.player = player;
        this.body.isStatic = false;
        if (side == -1) {
            this.hFlip();
        }
        this.center = center;
        this.maxAngle = -this.side * Settings.paddleMaxAngle;
        this.angularSpeed = Settings.paddleAngularSpeed;
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
                const rotation = Math.side(this.maxAngle) * this.angularSpeed * delta;
                const distance = this.center.subtract(this.player.body.position).length() + 20;
                this.angle += rotation;
                this.body.rotate(this.center.subtract(this.body.position), rotation);
                this.body.speed = new Vector(
                    Math.side(this.maxAngle) * Math.cos(this.angle),
                    -Math.side(this.maxAngle) * Math.sin(this.angle)
                    ).multiply(10000 * this.angularSpeed / distance); 
            } else {
                this.flipping = false;
                this.body.speed = Vector.zero();
            }
        } else {
            if (Math.abs(this.angle) > Math.PI / 360) {
                const rotation = -Math.side(this.maxAngle) * this.angularSpeed * delta;
                const distance = this.center.subtract(this.player.body.position).length() + 20;
                this.angle += rotation;
                this.body.rotate(this.center.subtract(this.body.position), rotation);
                this.body.speed = new Vector(
                    Math.side(this.maxAngle) * Math.cos(this.angle),
                    -Math.side(this.maxAngle) * Math.sin(this.angle)
                    ).multiply(-10000 * this.angularSpeed / distance); 
            } else {
                this.flipping = false;
				this.body.speed = Vector.zero();
				this.angle = 0;
            }
        }

		if (Input.left && this.side == 1 || Input.right && this.side == -1) {
            this.flip();
        }
    }
}