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
import { Base } from "./base.js";
import { Phase2 } from "./phase2.js";

export class Phase1Impl {
    constructor() {
        this.woodScore = 0;
        this.goldScore = 0;
        this.ironScore = 0;
        this.collisionEngine = new CollisionEngine();
        this.base = new Base(this.collisionEngine);
    }

    load() {
        this.base.load();
        this.player = this.base.player;
        this.sMineWall = new StaticElement('small-mine-wall', new Vector(-11.67, 190.5));
        this.lMineWall = new StaticElement('large-mine-wall', new Vector(138.2, -81.93));
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
    }

    update(delta) {
        this.base.update(delta);
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
        this.collisionEngine.update(this.player.body, this.sMineWall.body);
        this.collisionEngine.update(this.player.body, this.lMineWall.body);

        document.getElementById("gold-score").textContent = Phase1.goldScore;
        document.getElementById("iron-score").textContent = Phase1.ironScore;
        document.getElementById("wood-score").textContent = Phase1.woodScore;
    }
    
    renderStatic(delta, context) {
        this.base.renderStatic(delta, context);
        this.bumper.render(delta, context);
        this.sMineWall.render(delta, context);
        this.lMineWall.render(delta, context);
    }

    renderHybrid(delta, context) {
        this.base.renderHybrid(delta, context);
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
    }

    renderDynamic(delta, context) {
        this.base.renderDynamic(delta, context);
    }

    isComplete() {
        return this.woodScore >= Settings.treeScoreGoal
            && this.goldScore >= Settings.goldScoreGoal
            && this.ironScore >= Settings.rockScoreGoal;
    }

    nextPhase() { return Phase2; }
}

export const Phase1 = new Phase1Impl();