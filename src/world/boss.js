import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Vector } from "../math/vector.js";
import { Assets } from "../assets.js";

export class Boss {
    constructor(position) {
        this.scale = 2;
        this.body = new Body(1);
        this.body.shape = new Shape(Assets.colliders['enemy.collider'].vertices.map(v => v.multiply(this.scale)));
        this.body.bounciness = Settings.wallBounciness;
        this.body.isStatic = true;
        this.body.position = position;
        this.body.onCollision = () => this.onCollision();
        this.healthPoint = 3;
        this.spriteBounds = Assets.sprites['enemy'];
    }

    onCollision() {
        this.healthPoint--;
        if (this.healthPoint == 0) this.body.ignoreCollision = true;
    }

    update(delta) {
        this.body.speed = new Vector(0, 60);
        if (this.body.position.y > Settings.height) this.body.position.y = -this.spriteBounds.height;
        this.body.update(delta);
    }

    render(delta, context) {
        if (this.healthPoint == 0) return;
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
                this.spriteBounds.width * this.scale,
                this.spriteBounds.height * this.scale
            );

        }
    }
}