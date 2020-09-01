import { CollisionEngine } from "../physic/collisionEngine.js";
import { Settings } from "../settings.js";
import { Phase1 } from "./phase1.js";
import { Phase2 } from "./phase2.js";

export class World {
    constructor() {
        Phase2.load();
    }

    update(delta) {
        Phase2.update(delta);
    }

    render(delta, context) {
        context.clearRect(0, 0, Settings.width, Settings.height);
        Phase2.render(delta, context);
    }
}