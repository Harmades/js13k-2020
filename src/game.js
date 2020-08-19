import { CollisionEngine } from "./collisionEngine.js";
import { Shape, Vector } from "./math.js";
import { Assets } from "./assets.js";
import { bg } from "./assets.gen/bg.js";

export class Game {
    lastTick = 0;
    tickLength = 10;
    lastRender = 0;

    right = false;
    left = false;

    canvas = document.getElementById("canvas");
    ctx;

    collisionEngine = new CollisionEngine();
    assets = new Assets();

    playerShape = Shape.circle(50, 50, 20);
    speed = new Vector(0, 0);
    testShape = new Shape([new Vector(75, 50), new Vector(100, 75), new Vector(100, 25)]);
    groundShape = new Shape([new Vector(0, 480), new Vector(320, 480), new Vector(320, 450), new Vector(0, 400)]);

    constructor() {
        this.lastTick = performance.now();
        this.lastRender = this.lastTick;
        this.ctx = this.canvas.getContext("2d");
        document.addEventListener("keydown", e => this.keyDownHandler(e), false);
        document.addEventListener("keyup", e => this.keyUpHandler(e), false);
        this.assets.loadSvg("bg", bg);
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
            this.update(this.lastTick);
        }
    }

    update(tFrame) {
        const factor = 0.0001;
        if (this.right) this.speed.x += factor;
        if (this.left) this.speed.x -= factor;
        this.speed.y += 0.0001;
        const collision = this.collisionEngine.satCollide(this.playerShape, this.testShape);
        if (collision != null) {
        }
        const collision2 = this.collisionEngine.satCollide(this.playerShape, this.groundShape);
        if (collision2 != null) {
            const reaction = -0.5 * collision2.dot(this.speed);
            if (reaction < 0) {
                this.speed.x = collision2.x * reaction;
                this.speed.y = collision2.y * reaction;
            }
        }
        this.translateX(this.speed.x * tFrame);
        this.translateY(this.speed.y * tFrame);
    }

    translateX(value) {
        for (const vertex of this.playerShape.vertices) {
            vertex.x += value; 
        }
    }

    translateY(value) {
        for (const vertex of this.playerShape.vertices) {
            vertex.y += value; 
        }
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
        this.draw(this.playerShape, ctx);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        this.draw(this.testShape, ctx);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        this.draw(this.groundShape, ctx);
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