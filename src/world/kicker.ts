import { Body } from "../physic/body";
import { Settings } from "../settings";
import { Shape } from "../math/shape";
import { Vector } from "../math/vector";
import { Assets } from "../assets";
import { Fx } from "../fx/fx";
import { Particle } from "../fx/particle";
import { Effects } from "../sounds";
import { Base } from "./base";

export class Kicker {
    side: number;
    body1: Body;
    body2: Body;
    spriteBounds: SVGRect;
    body: Body;
    constructor(side: number) {
        this.side = side;

        this.body1 = new Body(null);
        this.body1.pos = new Vector(101, 455);
        this.body1.shape = Assets.colliders['kicker.collider.1'];
        this.body1.bounciness = Settings.wallBounciness;
        this.body1.isStatic = false;

        this.body2 = new Body(null);
        this.body2.pos = new Vector(101, 530);
        this.body2.shape = Assets.colliders['kicker.collider.2'];
        this.body2.bounciness = Settings.wallBounciness;
        this.body2.isStatic = false;

        this.spriteBounds = Assets.sprites['kicker'];
        this.body = new Body(null);
        this.body.shape = Assets.colliders['kicker.collider.3'];
        if (side == -1) {
            this.body.pos = new Vector(344, 455);
            this.body1.pos = new Vector(417, 454);
            this.body2.pos = new Vector(348, 530);
            this.body2.hFlip(this.spriteBounds.width / 2);
            this.body.hFlip(this.spriteBounds.width / 2);
        }
        if (side == 1) {
            this.body.pos = new Vector(105, 455);
        }
        const factor = this.side == -1 ? 0.90 : 1.05;

        this.body.bounciness = Settings.wallBounciness * factor;
        this.body.isStatic = false;
		this.body.onCollision = () => this.onCollision()
    }

    onCollision() {
        const offset = this.side == -1 ? new Vector(17, -15) : new Vector(-1, 0);
        const position = this.body1.pos
            .s(new Vector(this.side * this.spriteBounds.x, this.side * this.spriteBounds.y))
            .a(offset);
        const kickerGlow = new Particle(Assets.fxs['kicker.fx'], position);
        kickerGlow.alphaSpeed = -0.7;
        kickerGlow.scaleSpeed = 0.1;
        kickerGlow.life = 1.5;
        kickerGlow.hFlip = this.side;
        kickerGlow.lineWidth = 2;
        Fx.particles.push(kickerGlow);
        const helmetGlow = new Particle(Assets.fxs['helmet.fx'], position);
        helmetGlow.alphaSpeed = -0.7;
        helmetGlow.scaleSpeed = 0.1;
        helmetGlow.life = 1.5;
        helmetGlow.hFlip = this.side;
		Fx.particles.push(helmetGlow);
		Effects.impact_bumper();
    }

    update(delta: number) {
        if (Base.player.body.pos.y + Base.player.spriteBounds.height > this.body.pos.y + 10) {
            if (this.body.speed.y == 0) this.body.speed = new Vector(0, -Settings.kickerImpulseSpeed);
        }
        else {
            this.body.speed = Vector.z();
        }
    }

    render(context: CanvasRenderingContext2D) {
        // if (Settings.debug) {
        //     Shape.debugDraw(this.body, context);
        //     Shape.debugDraw(this.body1, context);
        //     Shape.debugDraw(this.body2, context);
        // } else 

        context.save();
        context.scale(this.side, 1);
        const offset = this.side == -1 ? -this.spriteBounds.width -5 : -5;
        context.drawImage(
            Assets.atlas,
            this.spriteBounds.x,
            this.spriteBounds.y,
            this.spriteBounds.width,
            this.spriteBounds.height,
            this.side * this.body.pos.x + offset,
            this.body.pos.y,
            this.spriteBounds.width,
            this.spriteBounds.height
        );
        context.restore();
    }
}