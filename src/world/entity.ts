import { Body } from "../physic/body";
import { Vector } from "../math/vector";
import { Assets } from "../assets";
import { Settings } from "../settings";
import { Shape } from "../math/shape";

export class Entity {
    body: Body;
    spriteBounds: SVGRect;
    scale: Vector;
    angle: number;
    center: Vector;
    offset: Vector;

    constructor(id: string, position: Vector, bounciness = Settings.wallBounciness, mass: number = null) {
        let body = new Body(mass);
        body.pos = position;
        body.shape = Assets.colliders[`${id}.collider`];
        body.bounciness = bounciness;
        this.body = body;
        this.spriteBounds = Assets.sprites[id];
        this.scale = new Vector(1, 1);
        this.angle = 0;
        this.center = Vector.z();
        this.offset = new Vector(0, 0);
    }

    hFlip() {
        if (this.spriteBounds == undefined) return;
        this.scale = new Vector(-1, 1);
        this.body.hFlip(this.spriteBounds.width / 2);
        this.offset.x -= this.spriteBounds.width;
    }

    up(delta: number) { }

    render(context: CanvasRenderingContext2D) {
        // if (Settings.debug && this.body.shape) {
        //     Shape.debugDraw(this.body, context);
        // } else 
        if (this.spriteBounds) {
            context.save();
            context.scale(this.scale.x, this.scale.y);
            context.translate(this.scale.x * this.center.x,  this.scale.y * this.center.y);
            context.rotate(Math.sign(this.scale.x) * this.angle);
            context.drawImage(
                Assets.atlas,
                this.spriteBounds.x,
                this.spriteBounds.y,
                this.spriteBounds.width,
                this.spriteBounds.height,
                (this.body.pos.x - this.center.x) / this.scale.x + this.offset.x,
                (this.body.pos.y - this.center.y) / this.scale.y + this.offset.y,
                this.spriteBounds.width,
                this.spriteBounds.height 
            );
            context.restore();
        }
    }
}