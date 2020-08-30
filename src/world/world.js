import { Paddle } from "./flipper.js";
import { Ball } from "./ball.js";
import { StaticElement } from "./staticElement.js";
import { CollisionEngine } from "../physic/collisionEngine.js";
import { Vector } from "../math/vector.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Plunger } from "./plunger.js";
import { Assets } from "../assets.js";

export class World {
    constructor() {
        this.leftFlipper = new Paddle(Assets['left-flipper.collider'], 'left');
        this.leftKicker = new StaticElement(Assets['left-kicker.collider'], Settings.wallBounciness);
        this.rightFlipper = new Paddle(Assets['right-flipper.collider'], 'right');
        this.rightKicker = new StaticElement(Assets['right-kicker.collider'], Settings.wallBounciness);
        this.player = new Ball(Assets['ball.collider']); 
        this.plunger = new Plunger(Assets['plunger.collider']);
        this.wall1 = new StaticElement(Assets['wall-1.collider'], Settings.wallBounciness);
        this.wall2 = new StaticElement(Assets['wall-2.collider'], Settings.wallBounciness);
        this.wall3 = new StaticElement(Assets['wall-3.collider'], Settings.wallBounciness);
        this.wall4 = new StaticElement(Assets['wall-4.collider'], Settings.wallBounciness);
        this.wall5 = new StaticElement(Assets['wall-5.collider'], Settings.wallBounciness);
        this.wall6 = new StaticElement(Assets['wall-6.collider'], Settings.wallBounciness);
        this.wall7 = new StaticElement(Assets['wall-7.collider'], Settings.wallBounciness);
        this.wall8 = new StaticElement(Assets['wall-8.collider'], Settings.wallBounciness);
        this.wall9 = new StaticElement(Assets['wall-9.collider'], Settings.wallBounciness);
        this.wall10 = new StaticElement(Assets['wall-10.collider'], Settings.wallBounciness);
        this.wall11 = new StaticElement(Assets['wall-11.collider'], Settings.wallBounciness);
        this.collisionEngine = new CollisionEngine();
    }

    update(delta) {
        this.leftFlipper.update(delta);
        this.rightFlipper.update(delta);
        this.player.update(delta);
        this.plunger.update(delta);
        this.collisionEngine.update(this.player.body, this.leftFlipper.body);
        this.collisionEngine.update(this.player.body, this.leftKicker.body);
        this.collisionEngine.update(this.player.body, this.rightFlipper.body);
        this.collisionEngine.update(this.player.body, this.rightKicker.body);
        this.collisionEngine.update(this.player.body, this.plunger.body);
        this.collisionEngine.update(this.player.body, this.wall1.body);
        this.collisionEngine.update(this.player.body, this.wall2.body);
        this.collisionEngine.update(this.player.body, this.wall3.body);
        this.collisionEngine.update(this.player.body, this.wall4.body);
        this.collisionEngine.update(this.player.body, this.wall5.body);
        this.collisionEngine.update(this.player.body, this.wall6.body);
        this.collisionEngine.update(this.player.body, this.wall7.body);
        this.collisionEngine.update(this.player.body, this.wall8.body);
        this.collisionEngine.update(this.player.body, this.wall9.body);
        this.collisionEngine.update(this.player.body, this.wall10.body);
        this.collisionEngine.update(this.player.body, this.wall11.body);
    }

    render(delta, context) {
        context.clearRect(0, 0, Settings.width, Settings.height);
        this.player.render(delta, context);
        this.leftFlipper.render(delta, context);
        this.leftKicker.render(delta, context);
        this.rightFlipper.render(delta, context);
        this.rightKicker.render(delta, context);
        this.plunger.render(delta, context);
        this.wall1.render(delta, context);
        this.wall2.render(delta, context);
        this.wall3.render(delta, context);
        this.wall4.render(delta, context);
        this.wall5.render(delta, context);
        this.wall6.render(delta, context);
        this.wall7.render(delta, context);
        this.wall8.render(delta, context);
        this.wall9.render(delta, context);
        this.wall10.render(delta, context);
        this.wall11.render(delta, context);
    }
}