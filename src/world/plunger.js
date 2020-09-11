import { Settings } from "../settings.js";
import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Vector } from "../math/vector.js";
import { Input } from "../input.js";
import { Assets } from "../assets.js";
import { Effects } from "../sounds.js";
import { Entity } from "./entity.js";

export class Plunger extends Entity {
    constructor() {
        super('plunger', new Vector(546.8, 663.3), Settings.launcherBounciness, Settings.ballMass);
        this.body.isStatic = false;
		this.compression = 0;
    }

    update(delta) {
        const posY = this.body.position.y;
		if (Input.space) {
			if (this.compression == 0) {
				Effects.launcher();
			}
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
				this.compression = posY - this.body.position.y;
            }
        }
        this.body.update(delta);
        this.compression += this.body.position.y - posY;
    }
}