import { Vector } from "../math/vector.js";
import { Assets } from "../assets.js";
import { DestroyableEntity } from "./destroyableEntity.js";
import { Settings } from "../settings.js";
import { Effects } from "../sounds.js";

export class Enemy extends DestroyableEntity {
    constructor(position) {
        super('enemy', position, 50, Settings.wallBounciness, 1);
        this.armor = Assets.fxs['armor.fx'];
        this.body.speed = new Vector(0, 60);
        this.body.onCollision = () => this.onCollision();
        this.body.isRigid = false;
        this.score = 50;
    }

    onCollision() {
        super.onCollision();
		Effects.impact_foe();
    }

    update(delta) { this.body.update(delta); }

    render(context) {
        super.render(context);
        if (this.armor == null || Settings.debug || this.life == 0) return;
        context.save();
        context.globalAlpha = 0.7;
        context.fillStyle = "gray";
        context.translate(this.body.position.x - 657, this.body.position.y - 612);
        context.fill(this.armor);
        context.restore();
    }
}