import { CollisionEngine } from "../physic/collisionEngine.js";
import { Settings } from "../settings.js";
import { Phase1 } from "./phase1.js";
import { Phase2 } from "./phase2.js";
import { Phase3 } from "./phase3.js";
import { Assets } from "../assets.js";
import { Base } from "./base.js";

export class World {
    constructor() {
        this.collisionEngine = new CollisionEngine();
        this.currentPhase = Phase1;
        Base.load(this.collisionEngine);
        this.currentPhase.load(this.collisionEngine);
        this.staticDrawn = false;
    }

    update(delta) {
        this.currentPhase.update(delta);
        if (this.currentPhase.isComplete()) {
            this.currentPhase = this.currentPhase.nextPhase();
            this.currentPhase.load(this.collisionEngine);
            this.staticDrawn = false;
        }
    }

    render(delta, context) {
        if (!this.staticDrawn) {
            context.staticContext.clearRect(0, 0, Settings.width, Settings.height);
            this.currentPhase.renderStatic(delta, context.staticContext);
            this.staticDrawn = true;
        }
        context.hybridContext.clearRect(0, 0, Settings.width, Settings.height);
        this.currentPhase.renderHybrid(delta, context.hybridContext);
        context.dynamicContext.clearRect(0, 0, Settings.width, Settings.height);
        this.currentPhase.renderDynamic(delta, context.dynamicContext);
    }
}