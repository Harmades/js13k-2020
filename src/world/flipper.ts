import { Vector } from '../math/vector';
import { Settings } from '../settings';
import { Input } from '../input';
import { Effects } from '../sounds';
import { Entity } from './entity';
import { Ball } from './ball';

export class Flipper extends Entity {
    side: number;
    player: Ball;
    maxAngle: number;
    angularSpeed: number;
    flipping: boolean;
    
    constructor(side: number, player: Ball) {
        let position;
        let center;
        if (side == 1) {
            position = new Vector(178, 653);
            center = new Vector(188, 664);
        }
        if (side == -1) {
            position = new Vector(290, 653);
            center = new Vector(343, 664);
        }
        super('flipper', position, Settings.paddleBounciness);
        this.side = side;
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

    up(delta: number) {
		if (this.flipping) {
			if (this.angle == 0) {
			  Effects.paddle();
			}
            if (Math.abs(this.angle) < Math.abs(this.maxAngle)) {
                const rotation = Math.sign(this.maxAngle) * this.angularSpeed * delta;
                const distance = this.center.s(this.player.body.pos).l() + 20;
                this.angle += rotation;
                this.body.rotate(this.center.s(this.body.pos), rotation);
                this.body.speed = new Vector(
                    Math.sign(this.maxAngle) * Math.cos(this.angle),
                    -Math.sign(this.maxAngle) * Math.sin(this.angle)
                    ).m(10000 * this.angularSpeed / distance); 
            } else {
                this.flipping = false;
                this.body.speed = Vector.z();
            }
        } else {
            if (Math.abs(this.angle) > Math.PI / 360) {
                const rotation = -Math.sign(this.maxAngle) * this.angularSpeed * delta;
                const distance = this.center.s(this.player.body.pos).l() + 20;
                this.angle += rotation;
                this.body.rotate(this.center.s(this.body.pos), rotation);
                this.body.speed = new Vector(
                    Math.sign(this.maxAngle) * Math.cos(this.angle),
                    -Math.sign(this.maxAngle) * Math.sin(this.angle)
                    ).m(-10000 * this.angularSpeed / distance); 
            } else {
                this.flipping = false;
				this.body.speed = Vector.z();
				this.angle = 0;
            }
        }

		if (Input.left && this.side == 1 || Input.right && this.side == -1) {
            this.flip();
        }
    }
}