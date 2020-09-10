import { Settings } from "../settings.js";
import { StaticElement } from "./staticElement.js";
import { Vector } from "../math/vector.js";
import { Tree } from "./tree.js";
import { Iron } from "./iron.js";
import { Gold } from "./gold.js";
import { Bumper } from "./bumper.js";
import { Phase2 } from "./phase2.js";
import { Base } from "./base.js";
import { Fx } from "../fx/fx.js";

export class Phase1Impl {
    constructor() {
        this.woodScore = 0;
        this.goldScore = 0;
        this.ironScore = 0;
        this.year = '-431';
        this.text = `(431 BC) Welcome, commander. The Spartan assembly voted war ⚔️ against our forever enemy, Athens and its Delian League. Commander, you must to lead Sparta and the Peloponnesian League to victory!
        We need to be ready as soon as possible, but we're missing resources, strategy and soldiers.

        We first need to collect some resources for our army:

        🌲 ${Settings.treeScoreGoal} units of wood
        ⛏️ ${Settings.rockScoreGoal} units of iron
        📀 ${Settings.goldScoreGoal} gold
        `;
    }

    load(collisionEngine) {
        this.collisionEngine = collisionEngine;
        this.player = Base.player;
        this.sMineWall = new StaticElement('small-mine-wall', new Vector(0, 220));
        this.lMineWall = new StaticElement('large-mine-wall', new Vector(160, 0));
        this.tree1 = new Tree(new Vector(140, 150));
        this.tree2 = new Tree(new Vector(373.4, 266));
        this.iron1 = new Iron(new Vector(10.91, 8.75));
        this.iron2 = new Iron(new Vector(114.4, 7.95));
        this.iron3 = new Iron(new Vector(115.6, 90.85));
        this.iron4 = new Iron(new Vector(75.95, 177.4));
        this.iron5 = new Iron(new Vector(11.40, 167));
        this.gold1 = new Gold(new Vector(77.51, 318));
        this.gold2 = new Gold(new Vector(281.9, 401.9));
        this.gold3 = new Gold(new Vector(310.1, 91.76));
        this.bumper = new Bumper(new Vector(14.76, 83.63));
    }

    update(delta) {
        Base.update(delta);
        this.tree1.update(delta);
        this.tree2.update(delta);
        this.iron1.update(delta);
        this.iron2.update(delta);
        this.iron3.update(delta);
        this.iron4.update(delta);
        this.iron5.update(delta);
        this.bumper.update(delta);
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
        Fx.update(delta);
    }
    
    renderStatic(delta, context) {
        Base.renderStatic(delta, context);
    }

    renderHybrid(delta, context) {
        Base.renderHybrid(delta, context);
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
    }

    renderDynamic(delta, context) {
        Base.renderDynamic(delta, context);
        this.sMineWall.render(delta, context);
        this.lMineWall.render(delta, context);
        Fx.render(delta, context);
    }

    isComplete() {
        return this.woodScore >= Settings.treeScoreGoal
            && this.goldScore >= Settings.goldScoreGoal
            && this.ironScore >= Settings.rockScoreGoal;
    }

    nextPhase() { return Phase2; }
}

export const Phase1 = new Phase1Impl();