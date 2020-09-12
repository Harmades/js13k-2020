import { CollisionEngine } from "../physic/collisionEngine";
import { Enemy } from "./enemy"
import { Boss } from "./boss";
import { Vector } from "../math/vector";
import { Base } from "./base";
import { Fx } from "../fx/fx";
import { Phase4 } from "./phase4";
import { Songs } from "../sounds";
import { Ball } from "./ball";
import { Entity } from "./entity";
import { Gui } from "./gui";

export class Phase3Impl {
    year: string;
    text: string;
    collisionEngine: CollisionEngine;
    player: Ball;
    entities: any[];

    constructor() {
        this.year = '-413';
        this.text = "(413 BC) Victory is near, commander. Now is time for war ⚔️. Defeat all incoming Delian soldiers!\n\nHit as many Delian soldiers as possible, and defeat their commander: if he dies, they will most likely surrender to our superiority.\n\nCharge!";
    }

    load(collisionEngine: CollisionEngine) {
        Gui.objectives('');
        this.collisionEngine = collisionEngine;
        this.player = Base.player;
        this.player.reset();
        this.entities = [];
        for (let i = 0; i < 40; i++) {
            const quotient = Math.floor(i / 5);
            const remainder = i % 5;
			this.entities.push(new Enemy(new Vector(50 + 100 * remainder, -100 -300 * quotient)));
        }
        this.entities.push(new Boss(new Vector(225, -2500)));
    }

    update(delta: number) {
        Base.update(delta);
        Fx.update(delta);
        for (const enemy of this.entities) {
            enemy.up(delta);
            if (enemy.body.pos.y > -enemy.spriteBounds.height) {
                this.collisionEngine.update(this.player.body, enemy.body);
            }
        }
    }

    renderStatic(context: CanvasRenderingContext2D) {
        Base.renderStatic(context);
    }

    renderHybrid(context: CanvasRenderingContext2D) {
        Base.renderHybrid(context);
    }
    
    renderDynamic(context: CanvasRenderingContext2D) {
        Base.renderDynamic(context);
        for (const enemy of this.entities) if (enemy.body.pos.y > -enemy.spriteBounds.height) enemy.render(context);
        Fx.render(context);
    }

	playSong() {
	  Songs.play_pthree();
	}

    isComplete() { return (this.entities[this.entities.length - 1] as Boss).life == 0; }
    
	nextPhase() {
	  Songs.stop_song();
	  Songs.play_win_vf();
	  return Phase4;
	}
}

export const Phase3 = new Phase3Impl();