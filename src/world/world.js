import { CollisionEngine } from "../physic/collisionEngine.js";
import { Settings } from "../settings.js";
import { Phase1 } from "./phase1.js";
import { Phase2 } from "./phase2.js";
import { Phase3 } from "./phase3.js";
import { Assets } from "../assets.js";

export class World {
    constructor() {
        Phase1.load();
        this.staticDrawn = false;
    }

    update(delta) {
        Phase1.update(delta);
    }

    render(delta, context) {
        if (!this.staticDrawn) {
            Phase1.renderStatic(delta, context.staticContext);
            this.staticDrawn = true;
        }
        context.hybridContext.clearRect(0, 0, Settings.width, Settings.height);
        Phase1.renderHybrid(delta, context.hybridContext);
        context.dynamicContext.clearRect(0, 0, Settings.width, Settings.height);
        Phase1.renderDynamic(delta, context.dynamicContext);
    }
}