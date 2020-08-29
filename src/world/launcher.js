import { Settings } from "../settings.js";
import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Input } from "../input.js"

export class Launcher {
    constructor(position) {
        this.body = new Body(null);
        this.body.shape = Shape.rectangle(position.x, position.y, 100, 25);
        this.body.position = position;
        this.body.bounciness = Settings.wallBounciness;
        this.sprite = null;
    }

    update(delta) {

    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else {

        }
    }
}