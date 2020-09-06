import { CollisionEngine } from "../physic/collisionEngine.js";
import { Settings } from "../settings.js";
import { Phase1 } from "./phase1.js";
import { Phase2 } from "./phase2.js";
import { Phase3 } from "./phase3.js";
import { Assets } from "../assets.js";

export class World {
    constructor() {
        Phase1.load();
    }

    update(delta) {
        Phase1.update(delta);
    }

    render(delta, context) {
        context.clearRect(0, 0, Settings.width, Settings.height);
        const spriteBounds = Assets.sprites.background;
        context.drawImage(
            Assets.atlas,
            spriteBounds.x,
            spriteBounds.y,
            spriteBounds.width,
            spriteBounds.height,
            0,
            0,
            spriteBounds.width,
            spriteBounds.height
        );
        Phase1.render(delta, context);
    }
}