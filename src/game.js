import { Settings } from "./settings.js";
import { World } from "./world/world.js";

export class Game {

    constructor() {
        this.tickLength = Settings.engineTimeResolution;
        this.lastTick = performance.now();
        this.lastRender = this.lastTick;
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.world = new World();
        canvas.onmousemove = e => {
            document.getElementById("x").textContent = e.offsetX;
            document.getElementById("y").textContent = e.offsetY;
        }
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
        this.render(tFrame - this.lastRender);
        this.lastRender = tFrame;
    }

    queueUpdates(numTicks) {
        for (var i = 0; i < numTicks; i++) {
            this.lastTick += this.tickLength;
            this.update(this.tickLength / 1000);
        }
    }

    update(delta) {
        this.world.update(delta);
    }

    render(delta) {
        this.world.render(delta, this.context);
    }
}