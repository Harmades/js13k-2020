import { Settings } from "../settings";
import { Body } from "../physic/body";
import { Shape } from "../math/shape";
import { Vector } from "../math/vector";
import { Input } from "../input";
import { Assets } from "../assets";
import { Effects } from "../sounds";
import { Entity } from "./entity";

export class Plunger extends Entity {
    compression: number;
    constructor() {
        super('plunger', new Vector(547, 663), Settings.launcherBounciness, Settings.ballMass);
        this.body.isStatic = false;
		this.compression = 0;
    }

    up(delta: number) {
        const posY = this.body.pos.y;
		if (Input.space) {
			if (this.compression == 0) {
				Effects.launcher();
			}
            if (this.compression <= Settings.launcherAmplitude) {
				this.body.speed = new Vector(0, Settings.launcherCompressingSpeed);
            } else {
                this.body.speed = Vector.z();
            }
        } else {
            if (this.compression > 0) {
                this.body.speed = new Vector(0, -Settings.launcherSpeed);
            } else {
				this.body.speed = Vector.z();
				this.compression = posY - this.body.pos.y;
            }
        }
        this.body.update(delta);
        this.compression += this.body.pos.y - posY;
    }
}