import { Phase1 } from "./phase1.js";
import { Effects } from "../sounds.js";
import { DestroyableEntity } from "./destroyableEntity.js";
import { Vector } from "../math/vector.js";

export class Iron extends DestroyableEntity {
    constructor(position) {
        super('iron', position);
        this.score = 50;
    }

    update(delta) {
        if (this.life == 2 && this.scale.x > 0) {
            this.scale = this.scale.subtract(new Vector(5 * delta, 5 * delta));
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