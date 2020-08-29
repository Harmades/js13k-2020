import { Settings } from "../settings.js";
import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Vector } from "../math/vector.js";
import { Input } from "../input.js";

export class Launcher {
    constructor(position) {
        this.body = new Body(Settings.ballMass);
        this.body.shape = Shape.rectangle(position.x, position.y, 80, 25);
        this.body.position = position;
        this.body.bounciness = Settings.launcherBounciness;
        this.sprite = null;
        this.compression = 0;
    }

    update(delta) {
        const posY = this.body.position.y;
        if (Input.space) {
            if (this.compression <= Settings.launcherAmplitude) {
                this.body.speed = new Vector(0, Settings.launcherCompressingSpeed);
            } else {
                this.body.speed = Vector.zero();
            }
        } else {
            if (this.compression > 0) {
                this.body.speed = new Vector(0, -Settings.launcherSpeed);
            } else {
                this.body.speed = Vector.zero();
            }
        }
        this.body.update(delta);
        this.compression += this.body.position.y - posY;
    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else {

        }
    }
}