import { CollisionEngine } from "../physic/collisionEngine.js";
import { Settings } from "../settings.js";
import { Phase1 } from "./phase1.js";
import { Phase2 } from "./phase2.js";
import { Phase3 } from "./phase3.js";
import { Phase4 } from "./phase4.js";
import { Assets } from "../assets.js";
import { Base } from "./base.js";
import { Input } from "../input.js";

export class World {
    constructor() {
        this.collisionEngine = new CollisionEngine();
        this.currentPhase = Phase4;
        Base.load(this.collisionEngine);
        this.currentPhase.load(this.collisionEngine);
        this.staticDrawn = false;
        Base.year = this.currentPhase.year;
        this.started = false;
        document.getElementById("dialog").innerText = this.currentPhase.text;
    }

    update(delta) {
        if (!this.started) {
            if (Input.space) {
                this.started = true;
                document.getElementById("dialog").style.display = "none";
            }
            return;
        }
        this.currentPhase.update(delta);
        if (this.currentPhase.isComplete()) {
            this.currentPhase = this.currentPhase.nextPhase();
            this.currentPhase.load(this.collisionEngine);
            this.staticDrawn = false;
            Base.year = this.currentPhase.year;
            this.started = false;
            document.getElementById("dialog").style.display = "block";
            document.getElementById("dialog").innerText = this.currentPhase.text;
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