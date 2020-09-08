import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Assets } from "../assets.js";
import { Vector } from "../math/vector.js";
import { Fx } from "../fx/fx.js"
import { Particle } from "../fx/particle.js"

export class Bumper {
    constructor(position) {
        this.body = new Body(null);
        this.body.shape = Assets.colliders[`bumper.collider`];
        this.body.bounciness = Settings.bumperBounciness;
        this.body.isStatic = true;
        this.body.position = position;
        this.spriteBounds = Assets.sprites['bumper'];
        this.scale = 1;
        this.body.onCollision = () => this.onCollision();
        this.bumperGlow = null;
    }

    onCollision() {
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
    }

    update(delta) {
        if (this.bumperGlow != null) {
            if (this.bumperGlow.life > 1.45) this.scale += 1 * delta;
            if (this.bumperGlow.life < 1.40) this.scale -= 1 * delta;
            if (this.bumperGlow.life < 1.35) {
                this.scale = 1;
                this.bumperGlow = null;
            }
        }
    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body, context);
        } else {
            context.drawImage(
                Assets.atlas,
                this.spriteBounds.x,
                this.spriteBounds.y,
                this.spriteBounds.width,
                this.spriteBounds.height,
                this.body.position.x,
                this.body.position.y,
                this.spriteBounds.width * this.scale,
                this.spriteBounds.height * this.scale
            );
        }
    }
}