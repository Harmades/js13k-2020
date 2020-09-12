import { Settings } from "./settings";
import { World } from "./world/world";

export class Game {
    tickLength: number;
    lastTick: number;
    lastRender: number;
    dynamicCanvas: HTMLCanvasElement;
    hybridCanvas: HTMLCanvasElement;
    staticCanvas: HTMLCanvasElement;
    world: World;
    context: any;

    constructor() {
        this.tickLength = Settings.engineTimeResolution;
        this.lastTick = performance.now();
        this.lastRender = this.lastTick;
        this.dynamicCanvas = document.getElementById("dc") as HTMLCanvasElement;
        this.hybridCanvas = document.getElementById("hc") as HTMLCanvasElement;
        this.staticCanvas = document.getElementById("sc") as HTMLCanvasElement;
        this.context = {
            staticContext: this.staticCanvas.getContext("2d"),
            hybridContext: this.hybridCanvas.getContext("2d"),
            dynamicContext: this.dynamicCanvas.getContext("2d")
        };
        this.world = new World();
    }

    loop(tFrame: number) {
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

    queueUpdates(numTicks: number) {
        for (var i = 0; i < numTicks; i++) {
            this.lastTick += this.tickLength;
            this.update(this.tickLength / 1000);
        }
    }

    update(delta: number) {
        this.world.update(delta);
    }

    render() {
        this.world.render(this.context);
    }
}