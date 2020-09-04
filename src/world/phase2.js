import { Settings } from "../settings.js";
import { Flipper } from "./flipper.js";
import { Ball } from "./ball.js";
import { StaticElement } from "./staticElement.js";
import { Vector } from "../math/vector.js";
import { Plunger } from "./plunger.js";
import { Assets } from "../assets.js";
import { CollisionEngine } from "../physic/collisionEngine.js";

class Phase2Impl {
    constructor() {
        this.weapons = ['sword', 'axe', 'lance'];
        this.rollWeapon();
        this.playerWeapon = null;
        this.fightResults = [null, null, null];
        this.currentRound = 0;
    }

    load() {
        this.leftFlipper = new Flipper(Assets['left-flipper.collider'], 'left');
        this.leftKicker = new StaticElement(Assets['left-kicker.collider'], Settings.wallBounciness);
        this.leftKicker.body.speed = new Vector(0, -Settings.kickerImpulseSpeed);
        this.leftKicker.body.isStatic = false;
        this.rightFlipper = new Flipper(Assets['right-flipper.collider'], 'right');
        this.rightKicker = new StaticElement(Assets['right-kicker.collider'], Settings.wallBounciness);
        this.rightKicker.body.speed = new Vector(0, -Settings.kickerImpulseSpeed);
        this.rightKicker.body.isStatic = false;
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
        this.wall12 = new StaticElement(Assets['wall-12.collider'], Settings.wallBounciness);
        this.wall13 = new StaticElement(Assets['wall-13.collider'], Settings.wallBounciness);
        this.wall14 = new StaticElement(Assets['wall-14.collider'], Settings.wallBounciness);
        this.wall15 = new StaticElement(Assets['wall-15.collider'], Settings.wallBounciness);
        this.axeBumper = new StaticElement(Assets['axe-bumper.collider'], Settings.bumperBounciness);
        this.axeBumper.body.onCollision = () => {
            this.playerWeapon = 'axe';
            this.resolveFight();
        }
        this.swordBumper = new StaticElement(Assets['sword-bumper.collider'], Settings.bumperBounciness);
        this.swordBumper.body.onCollision = () => {
            this.playerWeapon = 'sword';
            this.resolveFight();
        }
        this.lanceBumper = new StaticElement(Assets['lance-bumper.collider'], Settings.bumperBounciness);
        this.lanceBumper.body.onCollision = () => {
            this.playerWeapon = 'lance';
            this.resolveFight();
        }
        this.collisionEngine = new CollisionEngine();
    }

    rollWeapon() {
        const randomIndex = Math.floor(Math.random() * 3);
        this.enemyWeapon = this.weapons[randomIndex];
    }

    resolveFight() {
        if (this.currentRound == 3) return;
        if (this.enemyWeapon == 'sword' && this.playerWeapon == 'lance'
            || this.enemyWeapon == 'axe' && this.playerWeapon == 'sword'
            || this.enemyWeapon == 'lance' && this.playerWeapon == 'axe') {
            this.fightResults[this.currentRound] = true;    
            this.currentRound++;
            this.rollWeapon();
        } else {
            this.fightResults[this.currentRound] = false;    
        }
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
        this.collisionEngine.update(this.player.body, this.wall12.body);
        this.collisionEngine.update(this.player.body, this.wall13.body);
        this.collisionEngine.update(this.player.body, this.wall14.body);
        this.collisionEngine.update(this.player.body, this.wall15.body);
        this.collisionEngine.update(this.player.body, this.axeBumper.body);
        this.collisionEngine.update(this.player.body, this.swordBumper.body);
        this.collisionEngine.update(this.player.body, this.lanceBumper.body);

        document.getElementById("enemyWeapon").textContent = this.enemyWeapon;
        document.getElementById("round").textContent = this.currentRound;
    }

    render(delta, context) {
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
        this.wall12.render(delta, context);
        this.wall13.render(delta, context);
        this.wall14.render(delta, context);
        this.wall15.render(delta, context);
        this.axeBumper.render(delta, context);
        this.swordBumper.render(delta, context);
        this.lanceBumper.render(delta, context);
    }

    isComplete() { return this.fightResults.filter(r => r == true).length == 3; }
}

export const Phase2 = new Phase2Impl();