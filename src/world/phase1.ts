import { Settings } from "../settings";
import { StaticElement } from "./staticElement";
import { Vector } from "../math/vector";
import { Tree } from "./tree";
import { Iron } from "./iron";
import { Gold } from "./gold";
import { Bumper } from "./bumper";
import { Phase2 } from "./phase2";
import { Base } from "./base";
import { Fx } from "../fx/fx";
import { Songs } from "../sounds";
import { Gui } from "./gui";
import { Ball } from "./ball";
import { CollisionEngine } from "../physic/collisionEngine";

export class Phase1Impl {
    goldScore: any;
    woodScore: number;
    ironScore: number;
    year: string;
    text: string;
    entities: any[];
    collisionEngine: any;
    player: Ball;

    constructor() {
        this.woodScore = 0;
        this.goldScore = 0;
        this.ironScore = 0;
        this.year = '-431';
        this.text = `(431 BC) Welcome, commander. The Spartan assembly voted war ⚔️ against our forever enemy, Athens and its Delian League. Commander, you must lead Sparta and the Peloponnesian League to victory!\nWe need to be ready as soon as possible, but we're missing resources, strategy and soldiers.\n\nWe first need to collect some resources for our army:\n\n🌲 ${Settings.treeScoreGoal} wood\n⛏️ ${Settings.rockScoreGoal} iron\n💰 ${Settings.goldScoreGoal} gold\n`;
        this.entities = [];
    }

    load(collisionEngine: CollisionEngine) {
        this.updateScore();
        this.collisionEngine = collisionEngine;
        this.player = Base.player;
        this.entities = [
            new StaticElement('smw', new Vector(0, 220)),
            new Tree(new Vector(175, 0)),
            new Tree(new Vector(150, 150)),
            new Tree(new Vector(373, 266)),
            new Iron(new Vector(10.9, 8.75)),
            new Iron(new Vector(114, 7.95)),
            new Iron(new Vector(116, 90.9)),
            new Iron(new Vector(75.9, 177)),
            new Iron(new Vector(11.4, 167)),
            new Gold(new Vector(77.5, 318)),
            new Gold(new Vector(282, 402)),
            new Gold(new Vector(310, 91.8)),
            new Bumper(new Vector(14.8, 83.6))
        ];
    }

    update(delta: number) {
        Base.update(delta);
        for (let entity of this.entities) {
            entity.up(delta);
            this.collisionEngine.update(this.player.body, entity.body);
        }
        if (this.entities[9].jackpot && this.entities[10].jackpot && this.entities[11].jackpot) {
            this.entities[9].jackpot = false;
            this.entities[10].jackpot = false;
            this.entities[11].jackpot = false;
            this.goldScore += 5;
            Gui.score(100);
            this.updateScore();
        }
        Fx.update(delta);
    }
    
    renderStatic(context: CanvasRenderingContext2D) {
        Base.renderStatic(context);
    }

    renderHybrid(context: CanvasRenderingContext2D) {
        Base.renderHybrid(context);
        for (let i = 2; i < this.entities.length; i++) {
            this.entities[i].render(context);
        }
    }

    renderDynamic(context: CanvasRenderingContext2D) {
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
        Gui.objectives(`🌲: ${this.woodScore} / ${Settings.treeScoreGoal} | ⛏️: ${this.ironScore} / ${Settings.rockScoreGoal} | 💰: ${this.goldScore} / ${Settings.goldScoreGoal}`);
    }
    
	nextPhase() {
	  Songs.stop_song();
	  Songs.play_win();
	  return Phase2;
	}
}

export const Phase1 = new Phase1Impl();