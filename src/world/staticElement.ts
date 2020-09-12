import { Body } from "../physic/body";
import { Shape } from "../math/shape";
import { Settings } from "../settings";
import { Assets } from "../assets";
import { Effects } from "../sounds";
import { Entity } from "./entity";
import { Vector } from "../math/vector";

export class StaticElement extends Entity {
    constructor(id: string, position: Vector) {
        super(id, position);
        this.body.onCollisionResolved = (speed) => this.onCollisionResolved(speed);
    }


    onCollisionResolved(speed: number) {
        if (speed > Settings.minImpactSoundSpeed) {
            Effects.impact(speed);
        }
    }
}