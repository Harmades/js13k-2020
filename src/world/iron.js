import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Phase1 } from "./phase1.js";
import { Assets } from "../assets.js";

export class Iron {
    constructor(position) {
        this.body = new Body(null);
        this.body.shape = Assets.colliders[`iron.collider`];
        this.body.bounciness = Settings.wallBounciness;
        this.body.isStatic = true;
        this.body.position = position;
        this.body.onCollision = () => this.onCollision();
        this.healthPoint = 1;
        this.spriteBounds = Assets.sprites.iron;
    }

    update(delta) {

    }

    onCollision() {
        this.healthPoint--;
        Phase1.ironScore++;
        this.body.ignoreCollision = true;
    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else if (this.healthPoint != 0) {
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