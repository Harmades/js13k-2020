import { Body } from "../physic/body.js";
import { Settings } from "../settings.js";
import { Shape } from "../math/shape.js";
import { Vector } from "../math/vector.js";
import { Assets } from "../assets.js";
import { Fx } from "../fx/fx.js";
import { Particle } from "../fx/particle.js";
import { Effects } from "../sounds.js";

export class Kicker {
    constructor(side) {

        this.body1 = new Body(null);
        this.body1.position = new Vector(100.5, 454.7);
        this.body1.shape = Assets.colliders['kicker.collider.1'];
        this.body1.bounciness = Settings.wallBounciness;
        this.body1.isStatic = false;

        this.body2 = new Body(null);
        this.body2.position = new Vector(100.4, 530.2);
        this.body2.shape = Assets.colliders['kicker.collider.2'];
        this.body2.bounciness = Settings.wallBounciness;
        this.body2.isStatic = false;

        this.spriteBounds = Assets.sprites['kicker'];
        this.body = new Body(null);
        this.body.shape = Assets.colliders['kicker.collider.3'];
        if (side == 'right') {
            this.body.position = new Vector(344.4, 454.69);
            this.body1.position = new Vector(417.1, 454);
            this.body2.position = new Vector(347.9, 530);
            this.sign = -1;
            this.body2.hFlip(this.spriteBounds.width / 2);
            this.body.hFlip(this.spriteBounds.width / 2);
        }
        if (side == 'left') {
            this.body.position = new Vector(105.18, 454.69);
            this.sign = 1;
        }

        this.body.bounciness = Settings.wallBounciness;
        this.body.speed = new Vector(0, -Settings.kickerImpulseSpeed);
        this.body.isStatic = false;
		this.body.onCollision = () => this.onCollision()
    }

    onCollision() {
        const offset = this.sign == -1 ? new Vector(16.5, -16.5) : Vector.zero();
        const position = this.body1.position
            .subtract(new Vector(this.sign * this.spriteBounds.x, this.sign * this.spriteBounds.y))
            .add(offset);
        const kickerGlow = new Particle(Assets.fxs['kicker.fx'], position);
        kickerGlow.alphaSpeed = -0.7;
        kickerGlow.scaleSpeed = 0.1;
        kickerGlow.life = 1.5;
        kickerGlow.hFlip = this.sign;
        kickerGlow.lineWidth = 2;
        Fx.particles.push(kickerGlow);
        const helmetGlow = new Particle(Assets.fxs['helmet.fx'], position);
        helmetGlow.alphaSpeed = -0.7;
        helmetGlow.scaleSpeed = 0.1;
        helmetGlow.life = 1.5;
        helmetGlow.hFlip = this.sign;
		Fx.particles.push(helmetGlow);
		Effects.impact_bumper();
    }

    update(delta) {

    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body, context);
            Shape.debugDraw(this.body1, context);
            Shape.debugDraw(this.body2, context);
        } else {

            context.save();
            context.scale(this.sign, 1);
            const offset = this.sign == -1 ? -this.spriteBounds.width -5 : -5;
            context.drawImage(
                Assets.atlas,
                this.spriteBounds.x,
                this.spriteBounds.y,
                this.spriteBounds.width,
                this.spriteBounds.height,
                this.sign * this.body.position.x + offset,
                this.body.position.y,
                this.spriteBounds.width,
                this.spriteBounds.height
            );
            context.restore();
        }
    }
}