import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Assets } from "../assets.js";

export class StaticElement {
    constructor(id, bounciness) {
        this.body = new Body(null);
        this.body.shape = Assets[`${id}.collider`];
        this.body.bounciness = bounciness;
        this.body.isStatic = true;
        this.body.position = this.body.shape.vertices[0];
        this.sprite = Assets[id];
        this.rendered = false;
    }

    update(delta) { }

    render(delta, context) {
        if (Settings.debug) {
            Shape.debugDraw(this.body.shape, context);
        } else if (this.sprite !== undefined && !this.rendered) {
            context.drawImage(this.sprite, 0, 0);
        }
    }
}