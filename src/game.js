import { Vector } from "./math/vector.js";
import { Assets } from "./assets.js";
import { CollisionEngine } from "./physic/collisionEngine.js";
import { Input } from './input.js';
import { Paddle } from "./world/paddle.js";
import { Ball } from "./world/ball.js";
import { Settings } from "./settings.js";
import { Wall } from "./world/wall.js";
import { ball } from "./assets.gen/ball.js";

export class Game {

    constructor() {
        this.tickLength = Settings.engineTimeResolution;
        this.lastTick = performance.now();
        this.lastRender = this.lastTick;

        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        canvas.onmousemove = e => {
            document.getElementById("x").textContent = e.offsetX;
            document.getElementById("y").textContent = e.offsetY;
        }

        Assets.loadSvg("ball", ball);

        this.leftFlipper = new Paddle(new Vector(5, 460), 'right');
        this.rightFlipper = new Paddle(new Vector(315, 460), 'left');
        this.player = new Ball();
        this.leftWall = new Wall(new Vector(-100, 0), 100, 480);
        this.topWall = new Wall(new Vector(0, -100), 320, 100);
        this.rightWall = new Wall(new Vector(320, 0), 100, 480);

        this.collisionEngine = new CollisionEngine();
        this.input = new Input();
    }

    loop(tFrame) {
        window.requestAnimationFrame(t => this.loop(t));
        var nextTick = this.lastTick + this.tickLength;
        var numTicks = 0;

        if (tFrame > nextTick) {
            var elapsed = tFrame - this.lastTick;
            numTicks = Math.floor(elapsed / this.tickLength);
        }
        
        this.queueUpdates(numTicks);
        this.render(tFrame);
        this.lastRender = tFrame;
    }

    queueUpdates(numTicks) {
        for (var i = 0; i < numTicks; i++) {
            this.lastTick += this.tickLength;
            this.update(this.tickLength / 1000);
        }
    }

    update(delta) {
        if (this.input.left) this.leftFlipper.flip();
        if (this.input.right) this.rightFlipper.flip();
        this.leftFlipper.update(delta);
        this.rightFlipper.update(delta);
        this.collisionEngine.update(this.player.body, this.leftFlipper.body);
        this.collisionEngine.update(this.player.body, this.rightFlipper.body);
        this.collisionEngine.update(this.player.body, this.leftWall.body);
        this.collisionEngine.update(this.player.body, this.topWall.body);
        this.collisionEngine.update(this.player.body, this.rightWall.body);
        // this.player.update(delta);
    }

    render(tFrame) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.render(ctx, tFrame);
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        this.draw(this.leftFlipper.body.shape, ctx);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        this.draw(this.rightFlipper.body.shape, ctx);
        ctx.fill();
        ctx.closePath();
    }

    draw(shape, ctx) {
        ctx.moveTo(shape.vertices[0].x, shape.vertices[0].y);
        for (let i = 1; i < shape.vertices.length; i++) {
            const vertex = shape.vertices[i];
            ctx.lineTo(vertex.x, vertex.y);
        }
    }
}