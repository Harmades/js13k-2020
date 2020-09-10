import { Phase1 } from "./phase1.js";
import { Effects } from "../sounds.js";
import { DestroyableEntity } from "./destroyableEntity.js";
import { Vector } from "../math/vector.js";

export class Tree extends DestroyableEntity {
    constructor(position) {
        super('tree', position, 25);
    }

    onCollision() {
        super.onCollision();
        Phase1.woodScore++;
        Phase1.updateScore();
		Effects.impact_tree();
        this.life = 2;
    }

    update(delta) {
        if (this.life == 2 && this.scale.x > 0) {
            this.scale = this.scale.subtract(new Vector(5 * delta, 5 * delta));
        }
    }
}