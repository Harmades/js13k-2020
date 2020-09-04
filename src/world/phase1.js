import { Settings } from "../settings.js";
import { Flipper } from "./flipper.js";
import { Ball } from "./ball.js";
import { StaticElement } from "./staticElement.js";
import { Vector } from "../math/vector.js";
import { Plunger } from "./plunger.js";
import { Tree } from "./tree.js";
import { Iron } from "./iron.js";
import { Gold } from "./gold.js";
import { CollisionEngine } from "../physic/collisionEngine.js"; 

export class Phase1Impl {
    constructor() {
        this.woodScore = 0;
        this.goldScore = 0;
        this.ironScore = 0;
    }

    load() {
        this.leftFlipper = new Flipper('left-flipper', 'left');
        this.leftKicker = new StaticElement('left-kicker', Settings.wallBounciness);
        this.leftKicker.body.speed = new Vector(0, -Settings.kickerImpulseSpeed);
        this.leftKicker.body.isStatic = false;
        this.rightFlipper = new Flipper('right-flipper', 'right');
        this.rightKicker = new StaticElement('right-kicker', Settings.wallBounciness);
        this.rightKicker.body.speed = new Vector(0, -Settings.kickerImpulseSpeed);
        this.rightKicker.body.isStatic = false;
        this.player = new Ball(); 
        this.plunger = new Plunger('plunger');
        this.wall1 = new StaticElement('wall-1', Settings.wallBounciness);
        this.wall2 = new StaticElement('wall-2', Settings.wallBounciness);
        this.wall3 = new StaticElement('wall-3', Settings.wallBounciness);
        this.wall4 = new StaticElement('wall-4', Settings.wallBounciness);
        this.wall5 = new StaticElement('wall-5', Settings.wallBounciness);
        this.wall6 = new StaticElement('wall-6', Settings.wallBounciness);
        this.wall7 = new StaticElement('wall-7', Settings.wallBounciness);
        this.wall8 = new StaticElement('wall-8', Settings.wallBounciness);
        this.wall9 = new StaticElement('wall-9', Settings.wallBounciness);
        this.wall10 = new StaticElement('wall-10', Settings.wallBounciness);
        this.wall11 = new StaticElement('wall-11', Settings.wallBounciness);
        this.wall12 = new StaticElement('wall-12', Settings.wallBounciness);
        this.wall13 = new StaticElement('wall-13', Settings.wallBounciness);
        this.wall14 = new StaticElement('wall-14', Settings.wallBounciness);
        this.wall15 = new StaticElement('wall-15', Settings.wallBounciness);
        this.wall16 = new StaticElement('wall-16', Settings.wallBounciness);
        this.wall17 = new StaticElement('wall-17', Settings.wallBounciness);
        // this.tree1 = new Tree('tree-1', Settings.wallBounciness);
        // this.tree2 = new Tree('tree-2', Settings.wallBounciness);
        // this.iron1 = new Iron('iron-1', Settings.wallBounciness);
        // this.iron2 = new Iron('iron-2', Settings.wallBounciness);
        // this.iron3 = new Iron('iron-3', Settings.wallBounciness);
        // this.iron4 = new Iron('iron-4', Settings.wallBounciness);
        // this.iron5 = new Iron('iron-5', Settings.wallBounciness);
        // this.gold1 = new Gold('gold-1', Settings.wallBounciness);
        // this.gold2 = new Gold('gold-2', Settings.wallBounciness);
        // this.gold3 = new Gold('gold-3', Settings.wallBounciness);
        this.bumper = new StaticElement('bumper', Settings.bumperBounciness);
        this.collisionEngine = new CollisionEngine();
    }

    update(delta) {
        this.leftFlipper.update(delta);
        this.rightFlipper.update(delta);
        this.player.update(delta);
        this.plunger.update(delta);
        this.collisionEngine.update(this.player.body, this.leftFlipper.body);
        this.collisionEngine.update(this.player.body, this.leftKicker.body);
        this.collisionEngine.update(this.player.body, this.rightFlipper.body);
        this.collisionEngine.update(this.player.body, this.rightKicker.body);
        this.collisionEngine.update(this.player.body, this.plunger.body);
        this.collisionEngine.update(this.player.body, this.wall1.body);
        this.collisionEngine.update(this.player.body, this.wall2.body);
        this.collisionEngine.update(this.player.body, this.wall3.body);
        this.collisionEngine.update(this.player.body, this.wall4.body);
        this.collisionEngine.update(this.player.body, this.wall5.body);
        this.collisionEngine.update(this.player.body, this.wall6.body);
        this.collisionEngine.update(this.player.body, this.wall7.body);
        this.collisionEngine.update(this.player.body, this.wall8.body);
        this.collisionEngine.update(this.player.body, this.wall9.body);
        this.collisionEngine.update(this.player.body, this.wall10.body);
        this.collisionEngine.update(this.player.body, this.wall11.body);
        this.collisionEngine.update(this.player.body, this.wall12.body);
        this.collisionEngine.update(this.player.body, this.wall13.body);
        this.collisionEngine.update(this.player.body, this.wall14.body);
        this.collisionEngine.update(this.player.body, this.wall15.body);
        this.collisionEngine.update(this.player.body, this.wall16.body);
        this.collisionEngine.update(this.player.body, this.wall17.body);
        // this.collisionEngine.update(this.player.body, this.gold1.body);
        // this.collisionEngine.update(this.player.body, this.gold2.body);
        // this.collisionEngine.update(this.player.body, this.gold3.body);
        this.collisionEngine.update(this.player.body, this.bumper.body);
        // if (this.tree1.healthPoint > 0) this.collisionEngine.update(this.player.body, this.tree1.body);
        // if (this.tree2.healthPoint > 0) this.collisionEngine.update(this.player.body, this.tree2.body);
        // if (this.iron1.healthPoint > 0) this.collisionEngine.update(this.player.body, this.iron1.body);
        // if (this.iron2.healthPoint > 0) this.collisionEngine.update(this.player.body, this.iron2.body);
        // if (this.iron3.healthPoint > 0) this.collisionEngine.update(this.player.body, this.iron3.body);
        // if (this.iron4.healthPoint > 0) this.collisionEngine.update(this.player.body, this.iron4.body);
        // if (this.iron5.healthPoint > 0) this.collisionEngine.update(this.player.body, this.iron5.body);

        document.getElementById("gold").textContent = Phase1.goldScore;
        document.getElementById("iron").textContent = Phase1.ironScore;
        document.getElementById("wood").textContent = Phase1.woodScore;
    }

    render(delta, context) {
        this.player.render(delta, context);
        this.leftFlipper.render(delta, context);
        this.leftKicker.render(delta, context);
        this.rightFlipper.render(delta, context);
        this.rightKicker.render(delta, context);
        this.plunger.render(delta, context);
        this.wall1.render(delta, context);
        this.wall2.render(delta, context);
        this.wall3.render(delta, context);
        this.wall4.render(delta, context);
        this.wall5.render(delta, context);
        this.wall6.render(delta, context);
        this.wall7.render(delta, context);
        this.wall8.render(delta, context);
        this.wall9.render(delta, context);
        this.wall10.render(delta, context);
        this.wall11.render(delta, context);
        this.wall12.render(delta, context);
        this.wall13.render(delta, context);
        this.wall14.render(delta, context);
        this.wall15.render(delta, context);
        this.wall16.render(delta, context);
        this.wall17.render(delta, context);
        // this.gold1.render(delta, context);
        // this.gold2.render(delta, context);
        // this.gold3.render(delta, context);
        this.bumper.render(delta, context);
        // if (this.tree1.healthPoint > 0) this.tree1.render(delta, context);
        // if (this.tree2.healthPoint > 0) this.tree2.render(delta, context);
        // if (this.iron1.healthPoint > 0) this.iron1.render(delta, context);
        // if (this.iron2.healthPoint > 0) this.iron2.render(delta, context);
        // if (this.iron3.healthPoint > 0) this.iron3.render(delta, context);
        // if (this.iron4.healthPoint > 0) this.iron4.render(delta, context);
        // if (this.iron5.healthPoint > 0) this.iron5.render(delta, context);
    }

    isComplete() {
        this.woodScore >= Settings.treeScoreGoal;
        this.goldScore >= Settings.goldScoreGoal;
        this.ironScore >= Settings.rockScoreGoal;
    }
}

export const Phase1 = new Phase1Impl();