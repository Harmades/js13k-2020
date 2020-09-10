import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Assets } from "../assets.js";
import { Effects } from "../sounds.js";
import { Entity } from "./entity.js";

export class StaticElement extends Entity {
    constructor(id, position) {
        super(id, position);
        this.body.onCollisionResolved = (speed) => this.onCollisionResolved(speed);
    }


    onCollisionResolved(speed) {
        if (speed > Settings.minImpactSoundSpeed) {
            Effects.impact(speed);
        }
    }
}