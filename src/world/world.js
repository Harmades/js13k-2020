import { Paddle } from "./flipper.js";
import { Ball } from "./ball.js";
import { StaticElement } from "./staticElement.js";
import { CollisionEngine } from "../physic/collisionEngine.js";
import { Vector } from "../math/vector.js";
import { Shape } from "../math/shape.js";
import { Settings } from "../settings.js";
import { Launcher } from "./plunger.js";

export class World {
    constructor() {
        this.leftFlipper = new Paddle(new Vector(100, Settings.height - 200), 'left');
        this.leftKicker = new StaticElement(new Vector(100, Settings.height - 350), new Shape([new Vector(100, Settings.height - 350), new Vector(125, Settings.height - 270), new Vector(200, Settings.height - 250)]), Settings.wallBounciness);
        this.rightFlipper = new Paddle(new Vector(Settings.width - 200, Settings.height - 200), 'right');
        this.player = new Ball(new Vector(Settings.width - 55, 60)); 
        this.leftWall = new StaticElement(new Vector(-100, 0), Shape.rectangle(-100, 0, 100, Settings.height), Settings.wallBounciness);
        this.topWall = new StaticElement(new Vector(0, -100), Shape.rectangle(0, -100, Settings.width, 100), Settings.wallBounciness);
        this.rightWall = new StaticElement(new Vector(Settings.width, 0), Shape.rectangle(Settings.width, 0, 100, Settings.height, Settings.wallBounciness));
        const deflectorShape = Shape.rectangle(Settings.width - 75, 3-30, 150, 25);
        deflectorShape.rotate(deflectorShape.vertices[0], Math.PI / 4);
        this.topRightDeflector = new StaticElement(new Vector(Settings.width - 75, -30), deflectorShape, Settings.wallBounciness);
        this.launcher = new Launcher(new Vector(Settings.width - 60, Settings.height - 150));
        this.launcherWall = new StaticElement(new Vector(Settings.width - 75, 100), Shape.rectangle(Settings.width - 75, 100, 15, Settings.height - 100));
        this.bumper = new StaticElement(new Vector(200, 100), Shape.circle(200, 100, 35), Settings.wallBounciness);
        this.leftGutter = new StaticElement(new Vector(0, Settings.height - 100), new Shape([new Vector(0, Settings.height - 100), new Vector(0, Settings.height), new Vector(200, Settings.height), new Vector(200, Settings.height - 50)]), Settings.wallBounciness);
        this.rightGutter = new StaticElement(new Vector(250, Settings.height - 50), new Shape([new Vector(300, Settings.height - 50), new Vector(300, Settings.height), new Vector(500, Settings.height), new Vector(500, Settings.height - 100)]), Settings.wallBounciness);
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
        this.collisionEngine.update(this.player.body, this.launcherWall.body);
        this.collisionEngine.update(this.player.body, this.leftKicker.body);
        this.collisionEngine.update(this.player.body, this.bumper.body);
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
        this.leftKicker.render(delta, context);
        this.bumper.render(delta, context);
        this.leftGutter.render(delta, context);
        this.rightGutter.render(delta, context);
    }
}