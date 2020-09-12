import { Phase1 } from "./phase1";
import { Effects } from "../sounds";
import { DestroyableEntity } from "./destroyableEntity";
import { Vector } from "../math/vector";

export class Tree extends DestroyableEntity {
    constructor(position: Vector) {
        super('tree', position, 25);
    }

    onCollision() {
        super.onCollision();
        Phase1.woodScore++;
        Phase1.updateScore();
		Effects.impact_tree();
        this.life = 2;
    }

    up(delta: number) {
        if (this.life == 2 && this.scale.x > 0) {
            this.scale = this.scale.s(new Vector(5 * delta, 5 * delta));
        }
    }
}