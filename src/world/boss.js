import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Vector } from "../math/vector.js";
import { Enemy } from "./enemy.js";
import { Effects } from "../sounds.js";

export class Boss extends Enemy {
    constructor(position) {
        super(position);
        this.body.shape = new Shape(this.body.shape.vertices.map(v => v.multiply(2)));
        this.body.isRigid = true;
        this.body.onCollision = () => this.onCollision();
        this.score = 500;
        this.life = 3;
        this.scale = new Vector(2, 2);
        this.armor = null;
    }

    onCollision() {
        super.onCollision();
        Effects.impact_boss();
    }

    update(delta) {
        if (this.body.position.y > Settings.height) this.body.position.y = -this.spriteBounds.height;
        super.update(delta);
    }
}