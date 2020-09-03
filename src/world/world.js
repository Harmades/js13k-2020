import { CollisionEngine } from "../physic/collisionEngine.js";
import { Settings } from "../settings.js";
import { Phase1 } from "./phase1.js";
import { Phase2 } from "./phase2.js";
import { Phase3 } from "./phase3.js";

export class World {
    constructor() {
        Phase1.load();
    }

    update(delta) {
        Phase1.update(delta);
    }

    render(delta, context) {
        context.clearRect(0, 0, Settings.width, Settings.height);
        Phase1.render(delta, context);
    }
}