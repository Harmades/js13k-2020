import { Settings } from "../settings.js";
import { Flipper } from "./flipper.js";
import { Ball } from "./ball.js";
import { StaticElement } from "./staticElement.js";
import { Assets } from "../assets.js";
import { CollisionEngine } from "../physic/collisionEngine.js";
import { Enemy } from "./enemy.js"
import { Kicker } from "./kicker.js";
import { Boss } from "./boss.js";

class Phase3Impl {
    constructor() {
        this.entities = [];
    }

    load() {
        this.entities = [
            new Ball(Assets['ball.collider']),
            new Flipper(Assets['left-flipper.collider'], 'left'),
            new Kicker(Assets['left-kicker.collider']),
            new Flipper(Assets['right-flipper.collider'], 'right'),
            new Kicker(Assets['right-kicker.collider']),
            new StaticElement(Assets['wall-3.collider'], Settings.wallBounciness),
            new StaticElement(Assets['wall-6.collider'], Settings.wallBounciness),
            new StaticElement(Assets['wall-9.collider'], Settings.wallBounciness),
            new StaticElement(Assets['wall-10.collider'], Settings.wallBounciness),
            new StaticElement(Assets['wall-11.collider'], Settings.wallBounciness),
            new StaticElement(Assets['wall-12.collider'], Settings.wallBounciness),
            new StaticElement(Assets['wall-13.collider'], Settings.wallBounciness),
            new StaticElement(Assets['wall-14.collider'], Settings.wallBounciness),
            new StaticElement(Assets['wall-15.collider'], Settings.wallBounciness),
            new Enemy(Assets['enemy-1.collider']),
            new Enemy(Assets['enemy-2.collider']),
            new Enemy(Assets['enemy-3.collider']),
            new Enemy(Assets['enemy-4.collider']),
            new Enemy(Assets['enemy-5.collider']),
            new Boss(Assets['boss.collider'])
        ];
        this.collisionEngine = new CollisionEngine();
    }

    update(delta) {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            entity.update(delta);
            if (i != 0) {
                this.collisionEngine.update(this.entities[0].body, entity.body);
            }
        }
    }

    render(delta, context) {
        for (const entity of this.entities) {
            entity.render(delta, context);
        }
    }
}

export const Phase3 = new Phase3Impl();