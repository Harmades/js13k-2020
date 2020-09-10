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
import { Songs } from "../sounds.js";
import { Score } from "./score.js";

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
        this.updateScore();
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
        if (this.gold1.jackpot && this.gold2.jackpot && this.gold3.jackpot) {
            this.gold1.jackpot = false;
            this.gold2.jackpot = false;
            this.gold3.jackpot = false;
            this.goldScore += 5;
            Score.score(100);
            this.updateScore();
        }
        Fx.update(delta);
    }
    
    renderStatic(context) {
        Base.renderStatic(context);
    }

    renderHybrid(context) {
        Base.renderHybrid(context);
        this.tree1.render(context);
        this.tree2.render(context);
        this.gold1.render(context);
        this.gold2.render(context);
        this.gold3.render(context);
        this.iron1.render(context);
        this.iron2.render(context);
        this.iron3.render(context);
        this.iron4.render(context);
        this.iron5.render(context);
        this.bumper.render(context);
    }

    renderDynamic(context) {
        Base.renderDynamic(context);
        this.sMineWall.render(context);
        this.lMineWall.render(context);
        Fx.render(context);
    }

    isComplete() {
        return this.woodScore >= Settings.treeScoreGoal
            && this.goldScore >= Settings.goldScoreGoal
            && this.ironScore >= Settings.rockScoreGoal;
    }

	playSong() {
		Songs.play_pone();
    }

    updateScore() {
        document.getElementById("objectives").innerText = `🌲: ${this.woodScore} | ⛏️: ${this.ironScore} | 📀: ${this.goldScore}`;
    }
    
	nextPhase() {
	  Songs.stop_song();
	  Songs.play_win();
	  return Phase2;
	}
}

export const Phase1 = new Phase1Impl();