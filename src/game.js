import { Settings } from "./settings.js";
import { World } from "./world/world.js";
import { CanvasContext } from "./canvasContext.js";

export class Game {

    constructor() {
        this.tickLength = Settings.engineTimeResolution;
        this.lastTick = performance.now();
        this.lastRender = this.lastTick;
        this.dynamicCanvas = document.getElementById("dynamic-canvas");
        this.hybridCanvas = document.getElementById("hybrid-canvas");
        this.staticCanvas = document.getElementById("static-canvas");
        this.context = new CanvasContext(
            this.staticCanvas.getContext("2d"),
            this.hybridCanvas.getContext("2d"),
            this.dynamicCanvas.getContext("2d")
        );
        this.world = new World();
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
        this.render();
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

    render() {
        this.world.render(this.context);
    }
}