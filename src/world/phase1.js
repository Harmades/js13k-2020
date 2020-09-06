import { Settings } from "../settings.js";
import { Flipper } from "./flipper.js";
import { Ball } from "./ball.js";
import { StaticElement } from "./staticElement.js";
import { Vector } from "../math/vector.js";
import { Plunger } from "./plunger.js";
import { Tree } from "./tree.js";
import { Iron } from "./iron.js";
import { Gold } from "./gold.js";
import { Kicker } from "./kicker.js";
import { CollisionEngine } from "../physic/collisionEngine.js"; 
import { Assets } from "../assets.js";

export class Phase1Impl {
    constructor() {
        this.woodScore = 0;
        this.goldScore = 0;
        this.ironScore = 0;
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
        this.sMineWall = new StaticElement('small-mine-wall', new Vector(-11.67, 190.5));
        this.lMineWall = new StaticElement('large-mine-wall', new Vector(138.2, -81.93));
        this.lWall = new StaticElement('left-wall', new Vector(-100, 0));
        this.tWall = new StaticElement('top-wall', new Vector(-100, -100));
        this.rWall = new StaticElement('right-wall', new Vector(600, 0));
        this.tree1 = new Tree(new Vector(129.7, 193.2));
        this.tree2 = new Tree(new Vector(373.4, 266));
        this.iron1 = new Iron(new Vector(10.91, 8.75));
        this.iron2 = new Iron(new Vector(114.4, 7.95));
        this.iron3 = new Iron(new Vector(115.6, 90.85));
        this.iron4 = new Iron(new Vector(75.95, 177.4));
        this.iron5 = new Iron(new Vector(11.40, 167));
        this.gold1 = new Gold(new Vector(77.51, 318));
        this.gold2 = new Gold(new Vector(281.9, 401.9));
        this.gold3 = new Gold(new Vector(310.1, 91.76));
        this.bumper = new StaticElement('bumper', new Vector(14.76, 83.63), Settings.bumperBounciness);
        this.collisionEngine = new CollisionEngine();
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
        this.collisionEngine.update(this.player.body, this.sMineWall.body);
        this.collisionEngine.update(this.player.body, this.lMineWall.body);
        this.collisionEngine.update(this.player.body, this.lWall.body);
        this.collisionEngine.update(this.player.body, this.tWall.body);
        this.collisionEngine.update(this.player.body, this.rWall.body);
        this.collisionEngine.update(this.player.body, this.tree1.body);
        this.collisionEngine.update(this.player.body, this.tree2.body);
        this.collisionEngine.update(this.player.body, this.gold1.body);
        this.collisionEngine.update(this.player.body, this.gold2.body);
        this.collisionEngine.update(this.player.body, this.gold3.body);
        this.collisionEngine.update(this.player.body, this.iron1.body);
        this.collisionEngine.update(this.player.body, this.iron2.body);
        this.collisionEngine.update(this.player.body, this.iron3.body);
        this.collisionEngine.update(this.player.body, this.iron4.body);
        this.collisionEngine.update(this.player.body, this.iron5.body);
        this.collisionEngine.update(this.player.body, this.bumper.body);

        document.getElementById("gold-score").textContent = Phase1.goldScore;
        document.getElementById("iron-score").textContent = Phase1.ironScore;
        document.getElementById("wood-score").textContent = Phase1.woodScore;
    }

    render(delta, context) {
        this.player.render(delta, context);
        this.lBend1.render(delta, context);
        this.lBend2.render(delta, context);
        this.rBend1.render(delta, context);
        this.rBend2.render(delta, context);
        this.leftFlipper.render(delta, context);
        this.leftKicker.render(delta, context);
        this.rightKicker.render(delta, context);
        this.plunger.render(delta, context);
        this.lGutter.render(delta, context);
        this.rGutter.render(delta, context);
        this.fence.render(delta, context);
        this.deflector.render(delta, context);
        this.lWall.render(delta, context);
        this.tWall.render(delta, context);
        this.rWall.render(delta, context);
        this.tree1.render(delta, context);
        this.tree2.render(delta, context);
        this.gold1.render(delta, context);
        this.gold2.render(delta, context);
        this.gold3.render(delta, context);
        this.iron1.render(delta, context);
        this.iron2.render(delta, context);
        this.iron3.render(delta, context);
        this.iron4.render(delta, context);
        this.iron5.render(delta, context);
        this.bumper.render(delta, context);
        this.sMineWall.render(delta, context);
        this.lMineWall.render(delta, context);
        this.rightFlipper.render(delta, context);
    }

    isComplete() {
        this.woodScore >= Settings.treeScoreGoal;
        this.goldScore >= Settings.goldScoreGoal;
        this.ironScore >= Settings.rockScoreGoal;
    }
}

export const Phase1 = new Phase1Impl();