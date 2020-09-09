import { Shape } from "../math/shape.js";
import { Vector } from "../math/vector.js";
import { Body } from "../physic/body.js";
import { Settings } from "../settings.js";
import { Assets } from "../assets.js";

export class Ball {
    constructor() {
        const position = new Vector(560, 632);
        this.initialPosition = position;
        this.body = new Body(Settings.ballMass);
        this.body.shape = Assets.colliders['ball.collider'];
        this.body.position = position;
        this.body.bounciness = Settings.ballBounciness;
        this.body.applyField(new Vector(0, this.body.mass * Settings.gravity));
        this.spriteBounds = Assets.sprites.ball;
    }

    update(delta) {
        this.body.update(delta);
        if (this.body.position.y > Settings.height) {
            this.body.translate(this.initialPosition.subtract(this.body.position));
        }
    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body, context);
        } else {
            context.drawImage(
                Assets.atlas,
                this.spriteBounds.x,
                this.spriteBounds.y,
                this.spriteBounds.width,
                this.spriteBounds.height,
                this.body.position.x,
                this.body.position.y,
                this.spriteBounds.width,
                this.spriteBounds.height
            );
        }
    }
}
