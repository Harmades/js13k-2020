import { Phase1 } from "./phase1";
import { Effects } from "../sounds";
import { DestroyableEntity } from "./destroyableEntity";
import { Vector } from "../math/vector";

export class Iron extends DestroyableEntity {
    constructor(position: Vector) {
        super('iron', position, 50);
    }

    up(delta: number) {
        if (this.life == 2 && this.scale.x > 0) {
            this.scale = this.scale.s(new Vector(5 * delta, 5 * delta));
        }
    }

    onCollision() {
        super.onCollision();
        Phase1.ironScore++;
        Phase1.updateScore();
		Effects.impact_iron();
        this.life = 2;
    }
}