import { CollisionEngine } from "../physic/collisionEngine.js";
import { Enemy } from "./enemy.js"
import { Boss } from "./boss.js";
import { Vector } from "../math/vector.js";
import { Base } from "./base.js";
import { Fx } from "../fx/fx.js";

class Phase3Impl {
    constructor() {
        this.entities = [];
        this.year = '-413';
    }

    load(collisionEngine) {
        this.collisionEngine = collisionEngine;
        this.player = Base.player;
        this.enemies = [];
        for (let i = 0; i < 25; i++) {
            const quotient = Math.floor(i / 5);
            const remainder = i % 5;
            this.enemies.push(new Enemy(new Vector(50 + 100 * remainder, -100 -300 * quotient)))
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

    renderStatic(delta, context) {
        Base.renderStatic(delta, context);
    }

    renderHybrid(delta, context) {
        Base.renderHybrid(delta, context);
    }
    
    renderDynamic(delta, context) {
        Base.renderDynamic(delta, context);
        for (const enemy of this.enemies) enemy.render(delta, context);
        this.boss.render(delta, context);
        Fx.render(delta, context);
    }

    isComplete() { return false; }

    nextPhase() { return null; }
}

export const Phase3 = new Phase3Impl();