import { Settings } from "../settings.js";
import { Flipper } from "./flipper.js";
import { Ball } from "./ball.js";
import { StaticElement } from "./staticElement.js";
import { Vector } from "../math/vector.js";
import { Plunger } from "./plunger.js";
import { Assets } from "../assets.js";
import { CollisionEngine } from "../physic/collisionEngine.js";
import { Base } from "./base.js";
import { Phase1 } from "./phase1.js"

class Phase2Impl {
    constructor() {
        this.weapons = ['sword', 'axe', 'lance'];
        this.rollWeapon();
        this.playerWeapon = null;
        this.fightResults = [null, null, null];
        this.currentRound = 0;
        this.collisionEngine = new CollisionEngine();
        this.base = new Base(this.collisionEngine);
    }

    load() {
        this.base.load();
        this.player = this.base.player;
        this.lanceBumper = new StaticElement('bumper', new Vector(19.64, 163), Settings.bumperBounciness);
        this.lanceBumper.body.onCollision = () => {
            this.playerWeapon = 'lance';
            this.resolveFight();
        }
        this.lance = new StaticElement('lance', this.lanceBumper.body.position.add(new Vector(18, 10)));
        this.lance.body.ignoreCollision = true;

        this.axeBumper = new StaticElement('bumper', new Vector(222, 11.03), Settings.bumperBounciness);
        this.axeBumper.body.onCollision = () => {
            this.playerWeapon = 'axe';
            this.resolveFight();
        }
        this.axe = new StaticElement('axe', this.axeBumper.body.position.add(new Vector(18, 10)));
        this.axe.body.ignoreCollision = true;

        this.swordBumper = new StaticElement('bumper', new Vector(413.4, 163), Settings.bumperBounciness);
        this.swordBumper.body.onCollision = () => {
            this.playerWeapon = 'sword';
            this.resolveFight();
        }
        this.sword = new StaticElement('sword', this.swordBumper.body.position.add(new Vector(18, 10)));
        this.sword.body.ignoreCollision = true;
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
        this.base.update(delta);
        this.collisionEngine.update(this.player.body, this.axeBumper.body);
        this.collisionEngine.update(this.player.body, this.swordBumper.body);
        this.collisionEngine.update(this.player.body, this.lanceBumper.body);

        document.getElementById("enemyWeapon").textContent = this.enemyWeapon;
        document.getElementById("round").textContent = this.currentRound;
    }

    renderStatic(delta, context) {
        this.base.renderStatic(delta, context);

        this.axeBumper.render(delta, context);
        this.axe.render(delta, context);
        this.swordBumper.render(delta, context);
        this.sword.render(delta, context);
        this.lanceBumper.render(delta, context);
        this.lance.render(delta, context);
    }

    renderHybrid(delta, context) {
        this.base.renderHybrid(delta, context);
    }

    renderDynamic(delta, context) {
        this.base.renderDynamic(delta, context);
    }

    isComplete() { return this.fightResults.filter(r => r == true).length == 3; }

    nextPhase() { return Phase1; }
}

export const Phase2 = new Phase2Impl();