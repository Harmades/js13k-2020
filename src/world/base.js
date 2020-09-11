import { Flipper } from "./flipper.js";
import { Ball } from "./ball.js";
import { StaticElement } from "./staticElement.js";
import { Vector } from "../math/vector.js";
import { Plunger } from "./plunger.js";
import { Kicker } from "./kicker.js";
import { Assets } from "../assets.js";
import { Settings } from "../settings.js";
import { Body } from "../physic/body.js";
import { Shape } from "../math/shape.js";

class BaseImpl {
    load(collisionEngine) {
        this.collisionEngine = collisionEngine;
        this.player = new Ball();
        this.leftFlipper = new Flipper(1, this.player);
        this.leftKicker = new Kicker(1);
        this.rightFlipper = new Flipper(-1, this.player);
        this.rightKicker = new Kicker(-1),
        this.plunger = new Plunger('plunger');
        this.lBend1 = new StaticElement('bend.1', new Vector(44.68, 415.1));
        this.lBend1.spriteBounds = Assets.sprites['bend'];
        this.lBend2 = new StaticElement('bend.2', new Vector(44.68, 415.1));
        this.rBend1 = new StaticElement('bend.1', new Vector(334.3, 414.4));
        this.rBend1.spriteBounds = Assets.sprites['bend'];
        this.rBend1.hFlip();
        this.rBend2 = new StaticElement('bend.2', new Vector(474.9, 415.5));
        this.lGutter = new StaticElement('gutter', new Vector(0, 653));
        this.rGutter = new StaticElement('gutter', new Vector(319.5, 653));
        this.rGutter.hFlip();
        this.fence = new StaticElement('fence', new Vector(530.8, 107.1));
        this.deflector = new StaticElement('deflector', new Vector(539, 0));
        this.lWall = new StaticElement('left-wall', new Vector(-100, 0));
        this.tWall = new StaticElement('top-wall', new Vector(-100, -100));
        this.rWall = new StaticElement('right-wall', new Vector(600, 0));
        this.sign = new StaticElement('sign', new Vector(220, 300));
        this.invisibleWall = new Body(1);
        this.invisibleWall.position = new Vector(540, 120);
        this.invisibleWall.shape = new Shape([new Vector(0, 0),new Vector(0, 100),new Vector(60, 100),new Vector(60, -50)]);
        this.invisibleWall.isRigid = false;
        this.invisibleWall.onAreaExit = () => {if (this.player.body.position.y < 200) this.invisibleWall.isRigid = true;}
        this.invisibleWall.bounciness = Settings.wallBounciness;
        this.year = 0;
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
        this.collisionEngine.update(this.player.body, this.invisibleWall);
        if (this.player.body.position.y > Settings.height) {
            this.player.body.translate(this.player.initialPosition.subtract(this.player.body.position));
            this.invisibleWall.isRigid = false;
        }
    }

    renderStatic(context) {
        const gradient = context.createLinearGradient(300, 0, 300, 800);
        gradient.addColorStop(0, "#9BD077");
        gradient.addColorStop(1 , "#71c837")
        context.fillStyle = gradient;
        context.fillRect(0, 0, Settings.width, Settings.height);

        context.fillStyle = "white";
        this.sign.render(context);
        context.font = '48px serif';
        context.fillText(this.year, 235, 355);

        this.lBend1.render(context);
        this.lBend2.render(context);
        this.rBend1.render(context);
        this.rBend2.render(context);
        this.leftKicker.render(context);
        this.rightKicker.render(context);
        this.lGutter.render(context);
        this.rGutter.render(context);
        this.deflector.render(context);
        this.lWall.render(context);
        this.tWall.render(context);
        this.rWall.render(context);
    }

    renderHybrid(context) {
        this.leftFlipper.render(context);
        this.rightFlipper.render(context);
        this.plunger.render(context);
    }

    renderDynamic(context) {
        this.player.render(context);
        this.fence.render(context);
    }
}

export const Base = new BaseImpl()