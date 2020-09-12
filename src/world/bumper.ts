import { Body } from "../physic/body";
import { Shape } from "../math/shape";
import { Settings } from "../settings";
import { Assets } from "../assets";
import { Vector } from "../math/vector";
import { Fx } from "../fx/fx"
import { Particle } from "../fx/particle"
import { Effects } from "../sounds";
import { Entity } from "./entity";

export class Bumper extends Entity {
    weaponSpriteBounds: Entity;
    bumperGlow: Particle;
    onCollision: () => void;
    sign: number;

    constructor(position: Vector, weaponId: string = null) {
        super('bumper', position, Settings.bumperBounciness);
        this.weaponSpriteBounds = new Entity(weaponId, position.a(new Vector(18 * this.scale.x, 10 * this.scale.y)));
		this.body.onCollision = () => this.onBodyCollision();
        this.bumperGlow = null;
        this.onCollision = null;
    }

    onBodyCollision() {
        const position = this.body.pos.s(new Vector(this.spriteBounds.x, this.spriteBounds.y));
        let path = new Path2D();
        path.arc(
            this.body.pos.x + this.spriteBounds.width / 2,
            this.body.pos.y + this.spriteBounds.height / 2,
            25,
            0,
            Math.PI * 2
        );
        this.bumperGlow = new Particle(path, position);
        this.bumperGlow.alphaSpeed = -5;
        this.bumperGlow.scaleSpeed = 0.1;
        this.bumperGlow.life = 1.5;
        this.bumperGlow.lineWidth = 2;
        this.bumperGlow.fill = true;
        this.bumperGlow.alpha = 0.6;
        Fx.particles.push(this.bumperGlow);
		Effects.impact_bumper();
        if (this.onCollision != null) this.onCollision();
    }

    up(delta: number) {
        if (this.bumperGlow != null) {
            if (this.bumperGlow.life > 1.45) {
                this.scale.x += 1 * delta;
                this.scale.y += 1 * delta;
            }
            if (this.bumperGlow.life < 1.40) {
                this.scale.x -= 1 * delta;
                this.scale.y -= 1 * delta;
            }
            if (this.bumperGlow.life < 1.35) {
                this.scale = new Vector(1, 1);
                this.bumperGlow = null;
            }
        }
    }

    render(context: CanvasRenderingContext2D) {
        super.render(context);
        if (this.weaponSpriteBounds != null) this.weaponSpriteBounds.render(context);
    }
}