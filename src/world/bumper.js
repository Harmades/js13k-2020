import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Assets } from "../assets.js";
import { Vector } from "../math/vector.js";
import { Fx } from "../fx/fx.js"
import { Particle } from "../fx/particle.js"
import { Effects } from "../sounds.js";
import { Entity } from "./entity.js";

export class Bumper extends Entity {
    constructor(position, weaponId) {
        super('bumper', position, Settings.bumperBounciness);
        this.weaponSpriteBounds = new Entity(weaponId, position.add(new Vector(18 * this.scale.x, 10 * this.scale.y)));
		this.body.onCollision = () => this.onBodyCollision();
        this.bumperGlow = null;
        this.onCollision = null;
    }

    onBodyCollision() {
        const position = this.body.position.subtract(new Vector(this.spriteBounds.x, this.spriteBounds.y));
        let path = new Path2D();
        path.arc(
            this.body.position.x + this.spriteBounds.width / 2,
            this.body.position.y + this.spriteBounds.height / 2,
            25,
            0,
            Math.PI * 2
        );
        this.bumperGlow = new Particle(path, position);
        this.bumperGlow.alphaSpeed = -5;
        this.bumperGlow.scaleSpeed = 0.1;
        this.bumperGlow.life = 1.5;
        this.bumperGlow.hFlip = this.sign;
        this.bumperGlow.lineWidth = 2;
        this.bumperGlow.fill = true;
        this.bumperGlow.alpha = 0.6;
        Fx.particles.push(this.bumperGlow);
		Effects.impact_bumper();
        if (this.onCollision != null) this.onCollision();
    }

    update(delta) {
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

    render(context) {
        super.render(context);
        if (this.weaponSpriteBounds != undefined) this.weaponSpriteBounds.render(context);
    }
}