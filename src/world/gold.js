import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Phase1 } from "./phase1.js";
import { Assets } from "../assets.js";
import { Effects } from "../sounds.js";

export class Gold {
    constructor(position) {
        this.body = new Body(null);
        this.body.shape = Assets.colliders['gold.collider'];
        this.body.bounciness = Settings.wallBounciness;
        this.body.isStatic = true;
        this.body.isRigid = false;
        this.body.position = position;
        this.body.onAreaEnter = () => this.onAreaEnter();
        this.spriteBounds = Assets.sprites.gold;
        this.jackpot = false;
    }

    update(delta) {

    }

    onAreaEnter() {
        Phase1.goldScore++;
		this.jackpot = !this.jackpot;
		Effects.coin();
    }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body, context);
        } else {
            context.drawImage(
                Assets.atlas,
                this.spriteBounds.x,
                this.spriteBounds.y,
                this.spriteBounds.width,
                this.spriteBounds.height,
                this.body.position.x,
                this.body.position.y,
                this.spriteBounds.width,
                this.spriteBounds.height
            );
            if (!this.jackpot) {
                context.fillStyle = "rgba(0, 0, 0, 0.5)";
                context.fillRect(this.body.position.x, this.body.position.y, this.spriteBounds.width, this.spriteBounds.height);
            }
        }
    }
}