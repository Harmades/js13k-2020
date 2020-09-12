import { Vector } from "../math/vector";
import { Assets } from "../assets";
import { DestroyableEntity } from "./destroyableEntity";
import { Settings } from "../settings";
import { Effects } from "../sounds";

export class Enemy extends DestroyableEntity {
    armor: Path2D;
    constructor(position: Vector) {
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

    up(delta: number) { this.body.update(delta); }

    render(context: CanvasRenderingContext2D) {
        super.render(context);
        if (this.armor == null || Settings.debug || this.life == 0) return;
        context.save();
        context.globalAlpha = 0.7;
        context.fillStyle = "gray";
        context.translate(this.body.pos.x - 657, this.body.pos.y - 612);
        context.fill(this.armor);
        context.restore();
    }
}