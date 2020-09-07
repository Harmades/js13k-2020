import { CollisionEngine } from "../physic/collisionEngine.js";
import { Enemy } from "./enemy.js"
import { Boss } from "./boss.js";
import { Base } from "./base.js";
import { Vector } from "../math/vector.js";

class Phase3Impl {
    constructor() {
        this.entities = [];
        this.collisionEngine = new CollisionEngine();
        this.base = new Base(this.collisionEngine);
    }

    load() {
        this.base.load();
        this.player = this.base.player;
        this.enemy1 = new Enemy(new Vector(50, -100));
        this.enemy2 = new Enemy(new Vector(150, -100));
        this.enemy3 = new Enemy(new Vector(250, -100));
        this.enemy4 = new Enemy(new Vector(350, -100));
        this.enemy5 = new Enemy(new Vector(450, -100));
        this.boss = new Boss(new Vector(300, -300));
    }

    update(delta) {
        this.base.update(delta);
        this.enemy1.update(delta);
        this.enemy2.update(delta);
        this.enemy3.update(delta);
        this.enemy4.update(delta);
        this.enemy5.update(delta);
        this.boss.update(delta);
        this.collisionEngine.update(this.player.body, this.enemy1.body);
        this.collisionEngine.update(this.player.body, this.enemy2.body);
        this.collisionEngine.update(this.player.body, this.enemy3.body);
        this.collisionEngine.update(this.player.body, this.enemy4.body);
        this.collisionEngine.update(this.player.body, this.enemy5.body);
        this.collisionEngine.update(this.player.body, this.boss.body);
    }

    renderStatic(delta, context) {
        this.base.renderStatic(delta, context);
    }

    renderHybrid(delta, context) {
        this.base.renderHybrid(delta, context);
    }
    
    renderDynamic(delta, context) {
        this.base.renderDynamic(delta, context);
        this.enemy1.render(delta, context);
        this.enemy2.render(delta, context);
        this.enemy3.render(delta, context);
        this.enemy4.render(delta, context);
        this.enemy5.render(delta, context);
        this.boss.render(delta, context);
    }

    isComplete() { return false; }

    nextPhase() { return null; }
}

export const Phase3 = new Phase3Impl();