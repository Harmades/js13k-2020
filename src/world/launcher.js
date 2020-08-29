import { Settings } from "../settings.js";
import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Vector } from "../math/vector.js";
import { Input } from "../input.js";

export class Launcher {
    constructor(position) {
        this.body = new Body(null);
        this.body.shape = Shape.rectangle(position.x, position.y, 100, 25);
        this.body.position = position;
        this.body.bounciness = Settings.launcherBounciness;
        this.sprite = null;
        this.compression = 0;
    }

    update(delta) {
        if (Input.space) {
            if (this.compression <= Settings.launcherAmplitude) {
                const translation = Settings.launcherCompressingSpeed * delta;
                this.compression += translation;
                this.body.translate(new Vector(0, translation));
            }
        } else {
            if (this.compression > 0) {
                const translation = -Settings.launcherSpeed * delta;
                this.compression += translation;
                this.body.translate(new Vector(0, translation));
            }
        }
    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else {

        }
    }
}