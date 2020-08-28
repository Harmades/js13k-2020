import { Shape } from "../math/shape.js";
import { Vector } from "../math/vector.js";
import { Body } from "../physic/body.js";
import { Settings } from "../settings.js";
import { Assets } from "../assets.js";

export class Ball {
    constructor() {
        this.body = new Body(Settings.ballMass);
        this.body.shape = Shape.circle(50, 50, Settings.ballRadius);
        this.body.position = new Vector(50, 50);
        this.body.bounciness = Settings.ballBounciness;
        this.body.applyField(new Vector(0, this.body.mass * Settings.gravity));
        this.sprite = "ball";
    }

    update(delta) {
        this.body.update(delta);
    }

    render(context, delta) {
        if (Assets.ready) context.drawImage(Assets[this.sprite], this.body.position.x, this.body.position.y);
        this.draw(this.body.shape, context)
    }

    draw(shape, ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.moveTo(shape.vertices[0].x, shape.vertices[0].y);
        for (let i = 1; i < shape.vertices.length; i++) {
            const vertex = shape.vertices[i];
            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.fill();
        ctx.closePath();
    }
}