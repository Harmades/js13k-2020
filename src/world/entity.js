import { Body } from "../physic/body.js";
import { Vector } from "../math/vector.js";
import { Assets } from "../assets.js";
import { Settings } from "../settings.js";
import { Shape } from "../math/shape.js";

export class Entity {
    constructor(id, position, bounciness = Settings.wallBounciness, mass = null) {
        let body = new Body(mass);
        body.position = position;
        body.shape = Assets.colliders[`${id}.collider`];
        body.bounciness = bounciness;
        this.body = body;
        this.spriteBounds = Assets.sprites[id];
        this.scale = new Vector(1, 1);
        this.angle = 0;
        this.center = Vector.zero();
        this.offset = new Vector(0, 0);
    }

    hFlip() {
        if (this.spriteBounds == undefined) return;
        this.scale = new Vector(-1, 1);
        this.body.hFlip(this.spriteBounds.width / 2);
        this.offset.x -= this.spriteBounds.width;
    }

    update(delta) { }

    render(context) {
        if (Settings.debug && this.body.shape) {
            Shape.debugDraw(this.body, context);
        } else if (this.spriteBounds) {
            context.save();
            context.scale(this.scale.x, this.scale.y);
            context.translate(this.scale.x * this.center.x,  this.scale.y * this.center.y);
            context.rotate(Math.sign(this.scale.x) * this.angle);
            context.drawImage(
                Assets.atlas,
                this.spriteBounds.x,
                this.spriteBounds.y,
                this.spriteBounds.width,
                this.spriteBounds.height,
                (this.body.position.x - this.center.x) / this.scale.x + this.offset.x,
                (this.body.position.y - this.center.y) / this.scale.y + this.offset.y,
                this.spriteBounds.width,
                this.spriteBounds.height 
            );
            context.restore();
        }
    }
}