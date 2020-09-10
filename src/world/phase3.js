import { CollisionEngine } from "../physic/collisionEngine.js";
import { Enemy } from "./enemy.js"
import { Boss } from "./boss.js";
import { Vector } from "../math/vector.js";
import { Base } from "./base.js";
import { Fx } from "../fx/fx.js";
import { Phase4 } from "./phase4.js";
import { Songs } from "../sounds.js";

class Phase3Impl {
    constructor() {
        this.entities = [];
        this.year = '-413';
        this.text = `(413 BC) Victory is near, commander. Now is time for war ⚔️. Defeat all incoming Delian soldiers!

        Hit as many Delian soldiers as possible, and defeat their commander: if he dies, they will most likely surrender to our superiority.

        Charge!
        `;
    }

    load(collisionEngine) {
        document.getElementById("objectives").innerText = '';
        this.collisionEngine = collisionEngine;
        this.player = Base.player;
        this.player.reset();
        this.enemies = [];
        for (let i = 0; i < 25; i++) {
            const quotient = Math.floor(i / 5);
            const remainder = i % 5;
			this.enemies.push(new Enemy(new Vector(50 + 100 * remainder, -100 -300 * quotient)));
        }
        this.boss = new Boss(new Vector(225, -2000));
    }

    update(delta) {
        Base.update(delta);
        Fx.update(delta);
        for (const enemy of this.enemies) {
            enemy.update(delta);
            if (enemy.body.position.y > -enemy.spriteBounds.height) this.collisionEngine.update(this.player.body, enemy.body);
        }
        this.boss.update(delta);
        this.collisionEngine.update(this.player.body, this.boss.body);
    }

    renderStatic(context) {
        Base.renderStatic(context);
    }

    renderHybrid(context) {
        Base.renderHybrid(context);
    }
    
    renderDynamic(context) {
        Base.renderDynamic(context);
        for (const enemy of this.enemies) enemy.render(context);
        this.boss.render(context);
        Fx.render(context);
    }

	playSong() {
	  Songs.play_pthree();
	}

    isComplete() { return this.boss.healthPoint == 0; }
    
	nextPhase() {
	  Songs.stop_song();
	  Songs.play_win_vf();
	  return Phase4;
	}
}

export const Phase3 = new Phase3Impl();