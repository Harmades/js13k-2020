import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Vector } from "../math/vector.js";
import { Assets } from "../assets.js";
import { Score } from "./score.js";

export class Enemy {
    constructor(position) {
        this.body = new Body(1);
        this.body.shape = Assets.colliders['enemy.collider'];
        this.body.bounciness = Settings.wallBounciness;
        this.body.isStatic = true;
        this.body.position = position;
        this.body.isRigid = false;
        this.body.onCollision = () => this.onCollision();
        this.healthPoint = 1;
        this.spriteBounds = Assets.sprites.enemy;
        this.armor = Assets.fxs['armor.fx'];
    }

    onCollision() {
        this.healthPoint--;
        if (this.healthPoint == 0) {
            this.body.ignoreCollision = true;
            Score.score(50);
        }
    }

    update(delta) {
        this.body.speed = new Vector(0, 60);
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
                this.spriteBounds.width,
                this.spriteBounds.height
            );
            context.save();
            context.globalAlpha = 0.7;
            context.fillStyle = "gray";
            context.translate(this.body.position.x - 657, this.body.position.y - 612);
            context.fill(this.armor);
            context.restore();
        }
    }
}