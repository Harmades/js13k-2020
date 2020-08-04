import { CollisionEngine } from "./collisionEngine.js";
import { Shape, Vector } from "./math.js";

export class Game {
    lastTick = 0;
    tickLength = 10;
    lastRender = 0;

    right = false;
    left = false;
    down = false;
    up = false;

    canvas = document.getElementById("canvas");
    ctx;

    collisionEngine = new CollisionEngine();

    playerShape = new Shape([new Vector(0, 0), new Vector(0, 50), new Vector(50, 50), new Vector(50, 0)]);
    testShape = new Shape([new Vector(75, 50), new Vector(100, 75), new Vector(100, 25)])
    testShape2 = new Shape([new Vector(150, 150), new Vector(150, 200), new Vector(200, 200), new Vector(200, 150)]);

    constructor() {
        this.lastTick = performance.now();
        this.lastRender = this.lastTick;
        this.ctx = canvas.getContext("2d");
        document.addEventListener("keydown", e => this.keyDownHandler(e), false);
        document.addEventListener("keyup", e => this.keyUpHandler(e), false);
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
        const factor = 1;
        if (this.right) this.translateX(factor);
        if (this.left) this.translateX(-factor);
        if (this.up) this.translateY(-factor);
        if (this.down) this.translateY(factor);
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
        if (event.key == "ArrowUp") this.up = true;
        if (event.key == "ArrowDown") this.down = true;
    }

    keyUpHandler(event) {
        if (event.key == "ArrowRight") this.right = false;
        if (event.key == "ArrowLeft") this.left = false;
        if (event.key == "ArrowUp") this.up = false;
        if (event.key == "ArrowDown") this.down = false;
    }

    render(tFrame) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.beginPath();
        const collide = this.collisionEngine.satCollide(this.playerShape, this.testShape);
        if (collide != null) {
            this.translateX(collide.x);
            this.translateY(collide.y);
        }
        const collide2 = this.collisionEngine.satCollide(this.playerShape, this.testShape2);
        if (collide2 != null) {
            this.translateX(collide2.x);
            this.translateY(collide2.y);
        }
        ctx.rect(this.playerShape.vertices[0].x, this.playerShape.vertices[0].y, 50, 50);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(this.testShape.vertices[0].x, this.testShape.vertices[0].y);
        ctx.lineTo(this.testShape.vertices[1].x, this.testShape.vertices[1].y);
        ctx.lineTo(this.testShape.vertices[2].x, this.testShape.vertices[2].y);
        ctx.fillStyle = collide2 != null ? "#FF0000" : "#000000";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(this.testShape2.vertices[0].x, this.testShape2.vertices[0].y, 50, 50);
        ctx.fillStyle = collide2 != null ? "#FF0000" : "#000000";
        ctx.fill();
        ctx.closePath();
    }
}