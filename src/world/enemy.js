import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Vector } from "../math/vector.js";
import { Assets } from "../assets.js";

export class Enemy {
    constructor(position) {
        this.body = new Body(1);
        this.body.shape = Assets.colliders['enemy.collider'];
        this.body.bounciness = Settings.wallBounciness;
        this.body.isStatic = true;
        this.body.position = position;
        this.body.onCollision = () => this.onCollision();
        this.healthPoint = 1;
        this.spriteBounds = Assets.sprites.enemy;
    }

    onCollision() {
        this.healthPoint--;
        if (this.healthPoint == 0) this.body.ignoreCollision = true;
    }

    update(delta) {
        this.body.speed = new Vector(0, 10);
        this.body.update(delta);
    }

    render(delta, context) {
        if (this.healthPoint == 0) return;
        if (Settings.debug) {
            Shape.debugDraw(this.body, context);
        } else {
            Shape.debugDraw(this.body, context);
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