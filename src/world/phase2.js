import { Settings } from "../settings.js";
import { StaticElement } from "./staticElement.js";
import { Vector } from "../math/vector.js";
import { Phase3 } from "./phase3.js";
import { Base } from "./base.js";
import { Bumper } from "./bumper.js";
import { Assets } from "../assets.js";
import { Fx } from "../fx/fx.js";
import { Songs } from "../sounds.js";

class Phase2Impl {
    constructor() {
        this.weapons = ['sword', 'axe', 'lance'];
        this.rollWeapon();
        this.playerWeapon = null;
        this.fightResults = [null, null, null];
        this.currentRound = 0;
        this.year = '-421';
        this.text = `(421 BC) Excellent job, commander. We have all the resources we need to build and equip an army!
        
        Let's show soldiers some strategy. Your enemy's weapon is shown in blue, and you have to hit the right bumper to win the round. Choose your weapon bumper with care:

        🗡️ > 🪓
        🪓 > 🔱
        🔱 > 🗡️
        `;
    }

    load(collisionEngine) {
        this.collisionEngine = collisionEngine;
        this.player = Base.player;
        this.lanceBumper = new Bumper(new Vector(19.64, 163), 'lance');
        this.lanceBumper.onCollision = () => {
            this.playerWeapon = 'lance';
            this.resolveFight();
        }

        this.axeBumper = new Bumper(new Vector(222, 11.03), 'axe');
        this.axeBumper.onCollision = () => {
            this.playerWeapon = 'axe';
            this.resolveFight();
        }

        this.swordBumper = new Bumper(new Vector(413.4, 163), 'sword');
        this.swordBumper.onCollision = () => {
            this.playerWeapon = 'sword';
            this.resolveFight();
        }

        this.crossSpriteBounds = Assets.sprites['cross'];
        this.checkSpriteBounds = Assets.sprites['check'];
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
        this.axeBumper.update(delta);
        this.swordBumper.update(delta);
        this.lanceBumper.update(delta);
        this.collisionEngine.update(this.player.body, this.axeBumper.body);
        this.collisionEngine.update(this.player.body, this.swordBumper.body);
        this.collisionEngine.update(this.player.body, this.lanceBumper.body);
        Fx.update(delta);
    }

    renderStatic(delta, context) {
        Base.renderStatic(delta, context);
    }

    renderHybrid(delta, context) {
        Base.renderHybrid(delta, context);
        
        context.fillStyle = "#0d5eaf";
        context.strokeStyle = "white";
        context.rect(365, 300, 60, 77);
        context.fill();
        context.stroke();

        const spriteBounds = Assets.sprites[this.enemyWeapon];
        context.drawImage(
            Assets.atlas,
            spriteBounds.x,
            spriteBounds.y,
            spriteBounds.width,
            spriteBounds.height,
            375,
            321,
            spriteBounds.width * 2.5,
            spriteBounds.height * 2.5
        );
        
        let result = this.fightResults[this.currentRound];
        if (result == null && this.currentRound != 0 && this.fightResults[this.currentRound - 1]) result = this.fightResults[this.currentRound - 1];
        let sprite = result == null ? null : result ? this.checkSpriteBounds : this.crossSpriteBounds;

        if (sprite != null) {
            context.drawImage(
                Assets.atlas,
                sprite.x,
                sprite.y,
                sprite.width,
                sprite.height,
                150,
                310,
                sprite.width,
                sprite.height
            );
        }

        this.axeBumper.render(delta, context);
        this.swordBumper.render(delta, context);
        this.lanceBumper.render(delta, context);
    }

    renderDynamic(delta, context) {
        Base.renderDynamic(delta, context);
        Fx.render(delta, context);
    }

    isComplete() { return this.fightResults.filter(r => r == true).length == 3; }

	playSong() {
		Songs.play_ptwo();
	}

	nextPhase() {
		Songs.stop_song();
        this.year = '-404'
        return Phase3;
    }
}

export const Phase2 = new Phase2Impl();