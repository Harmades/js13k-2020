import { Body } from "../physic/body.js";
import { Settings } from "../settings.js";
import { Shape } from "../math/shape.js";
import { Vector } from "../math/vector.js";
import { Assets } from "../assets.js";

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
            this.body.position = new Vector(347.4, 454.69);
            this.body1.position = new Vector(417.1, 454);
            this.body2.position = new Vector(347.9, 530);
            this.sign = -1;
            this.body2.hFlip(this.spriteBounds.width / 2);
            this.body.hFlip(this.spriteBounds.width / 2);
        }
        if (side == 'left') {
            this.body.position = new Vector(100.18, 454.69);
            this.sign = 1;
        }

        this.body.bounciness = Settings.wallBounciness;
        this.body.speed = new Vector(0, -Settings.kickerImpulseSpeed);
        this.body.isStatic = false;
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
            const offset = this.sign == -1 ? -this.spriteBounds.width : 0;
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