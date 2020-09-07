import { Flipper } from "./flipper.js";
import { Ball } from "./ball.js";
import { StaticElement } from "./staticElement.js";
import { Vector } from "../math/vector.js";
import { Plunger } from "./plunger.js";
import { Kicker } from "./kicker.js";
import { Assets } from "../assets.js";

export class Base {
    constructor(collisionEngine) {
        this.collisionEngine = collisionEngine;
    }

    load() {
        this.leftFlipper = new Flipper('flipper', 'left');
        this.leftKicker = new Kicker('left');
        this.rightFlipper = new Flipper('flipper', 'right');
        this.rightKicker = new Kicker('right'),
        this.player = new Ball(); 
        this.plunger = new Plunger('plunger');
        this.lBend1 = new StaticElement('bend.1', new Vector(48.68, 415.1));
        this.lBend1.spriteBounds = Assets.sprites['bend'];
        this.lBend2 = new StaticElement('bend.2', new Vector(48.68, 415.1));
        this.rBend1 = new StaticElement('bend.1', new Vector(349.4, 414.4));
        this.rBend1.spriteBounds = Assets.sprites['bend'];
        this.rBend1.hFlip();
        this.rBend2 = new StaticElement('bend.2', new Vector(470.9, 415.5));
        this.lGutter = new StaticElement('gutter', new Vector(0, 653));
        this.rGutter = new StaticElement('gutter', new Vector(319.5, 653));
        this.rGutter.hFlip();
        this.fence = new StaticElement('fence', new Vector(530.8, 107.1));
        this.deflector = new StaticElement('deflector', new Vector(512.3, -79.2));
        this.lWall = new StaticElement('left-wall', new Vector(-100, 0));
        this.tWall = new StaticElement('top-wall', new Vector(-100, -100));
        this.rWall = new StaticElement('right-wall', new Vector(600, 0));
    }

    update(delta) {
        this.leftFlipper.update(delta);
        this.rightFlipper.update(delta);
        this.player.update(delta);
        this.plunger.update(delta);
        this.collisionEngine.update(this.player.body, this.leftFlipper.body);
        this.collisionEngine.update(this.player.body, this.leftKicker.body);
        this.collisionEngine.update(this.player.body, this.leftKicker.body1);
        this.collisionEngine.update(this.player.body, this.leftKicker.body2);
        this.collisionEngine.update(this.player.body, this.rightFlipper.body);
        this.collisionEngine.update(this.player.body, this.rightKicker.body);
        this.collisionEngine.update(this.player.body, this.rightKicker.body1);
        this.collisionEngine.update(this.player.body, this.rightKicker.body2);
        this.collisionEngine.update(this.player.body, this.plunger.body);
        this.collisionEngine.update(this.player.body, this.lBend1.body);
        this.collisionEngine.update(this.player.body, this.lBend2.body);
        this.collisionEngine.update(this.player.body, this.rBend1.body);
        this.collisionEngine.update(this.player.body, this.rBend2.body);
        this.collisionEngine.update(this.player.body, this.lGutter.body);
        this.collisionEngine.update(this.player.body, this.rGutter.body);
        this.collisionEngine.update(this.player.body, this.fence.body);
        this.collisionEngine.update(this.player.body, this.deflector.body);
        this.collisionEngine.update(this.player.body, this.lWall.body);
        this.collisionEngine.update(this.player.body, this.tWall.body);
        this.collisionEngine.update(this.player.body, this.rWall.body);
    }

    renderStatic(delta, context) {
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
        this.lBend1.render(delta, context);
        this.lBend2.render(delta, context);
        this.rBend1.render(delta, context);
        this.rBend2.render(delta, context);
        this.leftKicker.render(delta, context);
        this.rightKicker.render(delta, context);
        this.lGutter.render(delta, context);
        this.rGutter.render(delta, context);
        this.fence.render(delta, context);
        this.deflector.render(delta, context);
        this.lWall.render(delta, context);
        this.tWall.render(delta, context);
        this.rWall.render(delta, context);
    }

    renderHybrid(delta, context) {
        this.leftFlipper.render(delta, context);
        this.rightFlipper.render(delta, context);
        this.plunger.render(delta, context);
    }

    renderDynamic(delta, context) {
        this.player.render(delta, context);
    }
}