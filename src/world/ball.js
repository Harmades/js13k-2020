import { Shape } from "../math/shape.js";
import { Vector } from "../math/vector.js";
import { Body } from "../physic/body.js";
import { Settings } from "../settings.js";
import { Assets } from "../assets.js";

export class Ball {
    constructor(position) {
        this.body = new Body(Settings.ballMass);
        this.body.shape = Shape.circle(position.x, position.y, Settings.ballRadius);
        this.body.position = new Vector(position.x, position.y);
        this.body.bounciness = Settings.ballBounciness;
        this.body.applyField(new Vector(0, this.body.mass * Settings.gravity));
        this.sprite = Assets.ball;
    }

    update(delta) {
        this.body.update(delta);
    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else {
            context.drawImage(this.sprite, this.body.position.x, this.body.position.y);
        }
    }
}