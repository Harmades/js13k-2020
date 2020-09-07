import { Settings } from "../settings.js";
import { StaticElement } from "./staticElement.js";
import { Vector } from "../math/vector.js";
import { Phase3 } from "./phase3.js";
import { Base } from "./base.js";
import { Assets } from "../assets.js";

class Phase2Impl {
    constructor() {
        this.weapons = ['sword', 'axe', 'lance'];
        this.rollWeapon();
        this.playerWeapon = null;
        this.fightResults = [null, null, null];
        this.currentRound = 0;
        this.year = '-421';
    }

    load(collisionEngine) {
        this.collisionEngine = collisionEngine;
        this.player = Base.player;
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
        Base.update(delta);
        this.collisionEngine.update(this.player.body, this.axeBumper.body);
        this.collisionEngine.update(this.player.body, this.swordBumper.body);
        this.collisionEngine.update(this.player.body, this.lanceBumper.body);

        document.getElementById("enemyWeapon").textContent = this.enemyWeapon;
        document.getElementById("round").textContent = this.currentRound;
    }

    renderStatic(delta, context) {
        Base.renderStatic(delta, context);

        this.axeBumper.render(delta, context);
        this.axe.render(delta, context);
        this.swordBumper.render(delta, context);
        this.sword.render(delta, context);
        this.lanceBumper.render(delta, context);
        this.lance.render(delta, context);
    }

    renderHybrid(delta, context) {
        Base.renderHybrid(delta, context);
        
        const spriteBounds = Assets.sprites[this.enemyWeapon];
        context.drawImage(
            Assets.atlas,
            spriteBounds.x,
            spriteBounds.y,
            spriteBounds.width,
            spriteBounds.height,
            330,
            330,
            spriteBounds.width,
            spriteBounds.height
        );
    }

    renderDynamic(delta, context) {
        Base.renderDynamic(delta, context);
    }

    isComplete() { return this.fightResults.filter(r => r == true).length == 3; }

    nextPhase() {
        this.year = '-404'
        return Phase3;
    }
}

export const Phase2 = new Phase2Impl();