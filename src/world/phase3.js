import { Settings } from "../settings.js";
import { Paddle } from "./flipper.js";
import { Ball } from "./ball.js";
import { StaticElement } from "./staticElement.js";
import { Vector } from "../math/vector.js";
import { Plunger } from "./plunger.js";
import { Assets } from "../assets.js";
import { CollisionEngine } from "../physic/collisionEngine.js";
import { Enemy } from "./enemy.js"

class Phase3Impl {
    constructor() {
    }

    load() {
        this.leftFlipper = new Paddle(Assets['left-flipper.collider'], 'left');
        this.leftKicker = new StaticElement(Assets['left-kicker.collider'], Settings.wallBounciness);
        this.leftKicker.body.speed = new Vector(0, -Settings.kickerImpulseSpeed);
        this.leftKicker.body.isStatic = false;
        this.rightFlipper = new Paddle(Assets['right-flipper.collider'], 'right');
        this.rightKicker = new StaticElement(Assets['right-kicker.collider'], Settings.wallBounciness);
        this.rightKicker.body.speed = new Vector(0, -Settings.kickerImpulseSpeed);
        this.rightKicker.body.isStatic = false;
        this.player = new Ball(Assets['ball.collider']); 
        this.wall3 = new StaticElement(Assets['wall-3.collider'], Settings.wallBounciness);
        this.wall6 = new StaticElement(Assets['wall-6.collider'], Settings.wallBounciness);
        this.wall9 = new StaticElement(Assets['wall-9.collider'], Settings.wallBounciness);
        this.wall10 = new StaticElement(Assets['wall-10.collider'], Settings.wallBounciness);
        this.wall11 = new StaticElement(Assets['wall-11.collider'], Settings.wallBounciness);
        this.wall12 = new StaticElement(Assets['wall-12.collider'], Settings.wallBounciness);
        this.wall13 = new StaticElement(Assets['wall-13.collider'], Settings.wallBounciness);
        this.wall14 = new StaticElement(Assets['wall-14.collider'], Settings.wallBounciness);
        this.wall15 = new StaticElement(Assets['wall-15.collider'], Settings.wallBounciness);
        this.enemy1 = new Enemy(Assets['enemy-1.collider'], Settings.wallBounciness);
        this.enemy2 = new Enemy(Assets['enemy-2.collider'], Settings.wallBounciness);
        this.enemy3 = new Enemy(Assets['enemy-3.collider'], Settings.wallBounciness);
        this.enemy4 = new Enemy(Assets['enemy-4.collider'], Settings.wallBounciness);
        this.enemy5 = new Enemy(Assets['enemy-5.collider'], Settings.wallBounciness);
        this.collisionEngine = new CollisionEngine();
    }

    update(delta) {
        this.leftFlipper.update(delta);
        this.rightFlipper.update(delta);
        this.player.update(delta);
        this.enemy1.update(delta);
        this.enemy2.update(delta);
        this.enemy3.update(delta);
        this.enemy4.update(delta);
        this.enemy5.update(delta);
        this.collisionEngine.update(this.player.body, this.leftFlipper.body);
        this.collisionEngine.update(this.player.body, this.leftKicker.body);
        this.collisionEngine.update(this.player.body, this.rightFlipper.body);
        this.collisionEngine.update(this.player.body, this.rightKicker.body);
        this.collisionEngine.update(this.player.body, this.wall3.body);
        this.collisionEngine.update(this.player.body, this.wall6.body);
        this.collisionEngine.update(this.player.body, this.wall9.body);
        this.collisionEngine.update(this.player.body, this.wall10.body);
        this.collisionEngine.update(this.player.body, this.wall11.body);
        this.collisionEngine.update(this.player.body, this.wall12.body);
        this.collisionEngine.update(this.player.body, this.wall13.body);
        this.collisionEngine.update(this.player.body, this.wall14.body);
        this.collisionEngine.update(this.player.body, this.wall15.body);
        this.collisionEngine.update(this.player.body, this.enemy1.body);
        this.collisionEngine.update(this.player.body, this.enemy2.body);
        this.collisionEngine.update(this.player.body, this.enemy3.body);
        this.collisionEngine.update(this.player.body, this.enemy4.body);
        this.collisionEngine.update(this.player.body, this.enemy5.body);
    }

    render(delta, context) {
        this.player.render(delta, context);
        this.leftFlipper.render(delta, context);
        this.leftKicker.render(delta, context);
        this.rightFlipper.render(delta, context);
        this.rightKicker.render(delta, context);
        this.wall3.render(delta, context);
        this.wall6.render(delta, context);
        this.wall9.render(delta, context);
        this.wall10.render(delta, context);
        this.wall11.render(delta, context);
        this.wall12.render(delta, context);
        this.wall13.render(delta, context);
        this.wall14.render(delta, context);
        this.wall15.render(delta, context);
        this.enemy1.render(delta, context);
        this.enemy2.render(delta, context);
        this.enemy3.render(delta, context);
        this.enemy4.render(delta, context);
        this.enemy5.render(delta, context);
    }
}

export const Phase3 = new Phase3Impl();