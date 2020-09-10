import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Assets } from "../assets.js";
import { Vector } from "../math/vector.js";
import { Effects } from "../sounds.js";

export class StaticElement {
    constructor(id, position, bounciness = Settings.wallBounciness) {
        this.body = new Body(null);
        this.body.shape = Assets.colliders[`${id}.collider`];
        this.body.bounciness = bounciness;
        this.body.isStatic = true;
		this.body.position = position;
		this.body.onCollisionResolved = (speed) => this.onCollisionResolved(speed);
        this.spriteBounds = Assets.sprites[id];
        this.sign = 1;
    }

    hFlip() {
        if (this.spriteBounds == undefined) return;
        this.body.hFlip(this.spriteBounds.width / 2);
        this.sign = -1;
    }

	update(delta) { }

  onCollisionResolved(speed) {
	  if(speed > Settings.minImpactSoundSpeed) {
		Effects.impact(speed);
	  }
  }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body, context);
        } else {
            if (this.spriteBounds != undefined) {
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
}