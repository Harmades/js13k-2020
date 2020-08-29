import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import { Wall } from "./wall.js";
import { CollisionEngine } from "../physic/collisionEngine.js";
import { Vector } from "../math/vector.js";
import { Settings } from "../settings.js";
import { Launcher } from "./launcher.js";

export class World {
    constructor() {
        this.leftFlipper = new Paddle(new Vector(5, 460), 'left');
        this.rightFlipper = new Paddle(new Vector(315, 460), 'right');
        this.player = new Ball(new Vector(Settings.width - 55, 60)); 
        this.leftWall = new Wall(new Vector(-100, 0), 100, Settings.height);
        this.topWall = new Wall(new Vector(0, -100), Settings.width, 100);
        this.rightWall = new Wall(new Vector(Settings.width, 0), 100, Settings.height);
        this.topRightDeflector = new Wall(new Vector(Settings.width - 75, -30), 150, 25, Math.PI / 4);
        this.launcher = new Launcher(new Vector(Settings.width - 55, Settings.height - 150));
        this.launcherWall = new Wall(new Vector(Settings.width - 75, 100), 15, Settings.height -10);
        this.collisionEngine = new CollisionEngine();
    }

    update(delta) {
        this.leftFlipper.update(delta);
        this.rightFlipper.update(delta);
        this.player.update(delta);
        this.launcher.update(delta);
        this.collisionEngine.update(this.player.body, this.leftFlipper.body);
        this.collisionEngine.update(this.player.body, this.rightFlipper.body);
        this.collisionEngine.update(this.player.body, this.leftWall.body);
        this.collisionEngine.update(this.player.body, this.topWall.body);
        this.collisionEngine.update(this.player.body, this.rightWall.body);
        this.collisionEngine.update(this.player.body, this.topRightDeflector.body);
        this.collisionEngine.update(this.player.body, this.launcher.body);
    }

    render(delta, context) {
        context.clearRect(0, 0, Settings.width, Settings.height);
        this.player.render(delta, context);
        this.leftFlipper.render(delta, context);
        this.rightFlipper.render(delta, context);
        this.launcher.render(delta, context);
        this.topRightDeflector.render(delta, context);
        this.topWall.render(delta, context);
        this.launcherWall.render(delta, context);
    }
}