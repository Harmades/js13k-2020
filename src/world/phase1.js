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
        this.entities = [];
    }

    load(collisionEngine) {
        this.updateScore();
        this.collisionEngine = collisionEngine;
        this.player = Base.player;
        this.entities = [
            new StaticElement('small-mine-wall', new Vector(0, 220)),
            new StaticElement('large-mine-wall', new Vector(160, 0)),
            new Tree(new Vector(140, 150)),
            new Tree(new Vector(373.4, 266)),
            new Iron(new Vector(10.91, 8.75)),
            new Iron(new Vector(114.4, 7.95)),
            new Iron(new Vector(115.6, 90.85)),
            new Iron(new Vector(75.95, 177.4)),
            new Iron(new Vector(11.40, 167)),
            new Gold(new Vector(77.51, 318)),
            new Gold(new Vector(281.9, 401.9)),
            new Gold(new Vector(310.1, 91.76)),
            new Bumper(new Vector(14.76, 83.63))
        ];
    }

    update(delta) {
        Base.update(delta);
        for (let entity of this.entities) {
            entity.update(delta);
            this.collisionEngine.update(this.player.body, entity.body);
        }
        if (this.entities[9].jackpot && this.entities[10].jackpot && this.entities[11].jackpot) {
            this.entities[9].jackpot = false;
            this.entities[10].jackpot = false;
            this.entities[11].jackpot = false;
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
        for (let i = 2; i < this.entities.length; i++) {
            this.entities[i].render(context);
        }
    }

    renderDynamic(context) {
        Base.renderDynamic(context);
        this.entities[0].render(context);
        this.entities[1].render(context);
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