import { Settings } from "../settings.js";
import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Vector } from "../math/vector.js";
import { Input } from "../input.js";
import { Assets } from "../assets.js";

export class Plunger {
    constructor(id) {
        this.body = new Body(Settings.ballMass);
        this.body.shape = Assets[`${id}.collider`];
        this.body.position = this.body.shape.vertices[0];
        this.body.bounciness = Settings.launcherBounciness;
        this.sprite = Assets[id];
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
            Shape.debugDraw(this.body.shape, context);
            // context.drawImage(this.sprite, 0, 0);
        }
    }
}