import { Vector } from "./math/vector.js";
import { Shape } from "./math/shape.js";
import { Assets } from "./assets.js";
import { bg } from "./assets.gen/bg.js";
import { Body } from "./physic/body.js";
import { CollisionEngine } from "./physic/collisionEngine.js";

export class Game {
    lastTick = 0;
    tickLength = 10;
    lastRender = 0;

    right = false;
    left = false;

    canvas = document.getElementById("canvas");
    assets = new Assets();

    constructor() {
        this.lastTick = performance.now();
        this.lastRender = this.lastTick;
        this.ctx = this.canvas.getContext("2d");
        document.addEventListener("keydown", e => this.keyDownHandler(e), false);
        document.addEventListener("keyup", e => this.keyUpHandler(e), false);
        this.assets.loadSvg("bg", bg);

        this.ground = new Body(null);
        this.ground.shape = new Shape([new Vector(0, 480), new Vector(320, 480), new Vector(320, 450), new Vector(0, 400)]);
        this.ground.position = new Vector(0, 480);
        this.player = new Body(null);
        this.player.shape = Shape.circle(50, 50, 25);
        this.player.position = new Vector(50, 50);

        this.collisionEngine = new CollisionEngine();
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
            this.update(this.tickLength);
        }
    }

    update(tFrame) {
        if (this.right) this.player.applyImpulse(new Vector(1000, 0));
        if (this.left) this.player.applyImpulse(new Vector(-1000, 0));
        this.collisionEngine.update(this.player, this.ground);
        this.player.update(tFrame / 1000);
    }

    keyDownHandler(event) {
        if (event.key == "ArrowRight") this.right = true;
        if (event.key == "ArrowLeft") this.left = true;
    }

    keyUpHandler(event) {
        if (event.key == "ArrowRight") this.right = false;
        if (event.key == "ArrowLeft") this.left = false;
    }

    render(tFrame) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.assets.ready) ctx.drawImage(this.assets.bg, 0, 0);
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        this.draw(this.player.shape, ctx);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        this.draw(this.ground.shape, ctx);
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