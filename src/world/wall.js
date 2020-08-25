import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";

export class Wall {
    constructor(position, width, height) {
        this.body = new Body(null);
        this.body.shape = Shape.rectangle(position.x, position.y, width, height);
        this.body.bounciness = Settings.wallBounciness;
        this.body.isStatic = true;
        this.body.position = position;
    }
}