import { Body } from '../physic/body.js';
import { Shape } from '../math/shape.js';
import { Vector } from '../math/vector.js';
import { Settings } from '../settings.js';
import { Input } from '../input.js';
import { Assets } from '../assets.js';
import { Effects } from '../sounds.js';
import { Entity } from './entity.js';

export class Flipper extends Entity {
    constructor(side, player) {
        let position;
        let center;
        if (side == 'left') {
            position = new Vector(178.11, 653);
            center = new Vector(188.2, 664.3);
        }
        if (side == 'right') {
            position = new Vector(290.61, 652.71);
            center = new Vector(344, 664.3);
        }
        super('flipper', position, Settings.paddleBounciness);
        this.player = player;
        this.body.isStatic = false;
        if (side == 'right') {
            this.sign = -1;
            this.hFlip();
        }
        if (side == 'left') {
            this.sign = 1;
        }
        this.center = center;
        this.maxAngle = -this.sign * Settings.paddleMaxAngle;
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

		if (Input.left && this.sign == 1 || Input.right && this.sign == -1) {
            this.flip();
        }
    }
}