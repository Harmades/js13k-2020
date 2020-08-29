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
        const leftKickerShape = Shape.fromSvgData("m 82.76,487.2 v 99.6 l 85.14,23 z");
        this.leftKicker = new StaticElement(leftKickerShape[0], leftKickerShape, Settings.wallBounciness);
        this.rightFlipper = new Paddle(new Vector(Settings.width - 200, Settings.height - 200), 'right');
        const rightKickerShape = Shape.fromSvgData("m 444.6,487.2 v 99.2 l -85.1,23.1 z");
        this.rightKicker = new StaticElement(rightKickerShape[0], rightKickerShape, Settings.wallBounciness);
        this.player = new Ball(new Vector(Settings.width - 55, 60)); 
        this.leftWall = new StaticElement(new Vector(-100, 0), Shape.rectangle(-100, 0, 100, Settings.height), Settings.wallBounciness);
        this.topWall = new StaticElement(new Vector(0, -100), Shape.rectangle(0, -100, Settings.width, 100), Settings.wallBounciness);
        this.rightWall = new StaticElement(new Vector(Settings.width, 0), Shape.rectangle(Settings.width, 0, 100, Settings.height, Settings.wallBounciness));
        const deflectorShape = Shape.fromSvgData("M 608.5,59.85 549.4,-9.938 639.4,-26.2 Z");
        this.topRightDeflector = new StaticElement(deflectorShape[0], deflectorShape, Settings.wallBounciness);
        this.launcher = new Launcher(new Vector(Settings.width - 60, Settings.height - 150));
        const launcherWallShape = Shape.fromSvgData("m 520.5,114.2 h 7.6 v 685.4 h -7.6 z");
        this.launcherWall = new StaticElement(launcherWallShape[0], launcherWallShape, Settings.wallBounciness);
        this.bumper = new StaticElement(new Vector(200, 100), Shape.circle(200, 100, 35), Settings.wallBounciness);
        const leftGutterShape = Shape.fromSvgData("m 0,671.4 207.4,58.4 v 69.9 H 0 Z");
        this.leftGutter = new StaticElement(leftGutterShape[0], leftGutterShape, Settings.wallBounciness);
        const rightGutterShape = Shape.fromSvgData("m 520.5,671.7 -207.3,58.1 v 69.9 h 207.3 z");
        this.rightGutter = new StaticElement(rightGutterShape[0], rightGutterShape, Settings.wallBounciness);
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
        this.rightKicker.render(delta, context);
        this.bumper.render(delta, context);
        this.leftGutter.render(delta, context);
        this.rightGutter.render(delta, context);
    }
}