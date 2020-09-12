import { Vector } from "../math/vector";
import { Phase3 } from "./phase3";
import { Base } from "./base";
import { Bumper } from "./bumper";
import { Assets } from "../assets";
import { Fx } from "../fx/fx";
import { Songs } from "../sounds";
import { Gui } from "./gui";
import { Ball } from "./ball";
import { CollisionEngine } from "../physic/collisionEngine";

export class Phase2Impl {
    weapons: string[];
    playerWeapon: string;
    fightResults: boolean[];
    currentRound: number;
    year: string;
    text: string;
    collisionEngine: CollisionEngine;
    player: Ball;
    lanceBumper: Bumper;
    axeBumper: Bumper;
    swordBumper: Bumper;
    crossSpriteBounds: SVGRect;
    checkSpriteBounds: SVGRect;
    enemyWeapon: string;

    constructor() {
        this.weapons = ['sword', 'axe', 'lance'];
        this.rollWeapon();
        this.playerWeapon = null;
        this.fightResults = [null, null, null];
        this.currentRound = 0;
        this.year = '-421';
        this.text = "(421 BC) Excellent job, commander. We have all the resources we need to build and equip an army!\n\nLet's show soldiers some strategy. Your enemy's weapon is shown in blue, and you have to hit the right bumper to win the round. Choose your weapon bumper with care:\n\n🗡️ > 🪓\n🪓 > 🔱\n🔱 > 🗡️\n";
    }

    load(collisionEngine: CollisionEngine) {
        this.updateScore();
        this.collisionEngine = collisionEngine;
        this.player = Base.player;
        this.player.reset();
        this.lanceBumper = new Bumper(new Vector(19.6, 163), 'lance');
        this.lanceBumper.onCollision = () => {
            this.playerWeapon = 'lance';
            this.resolveFight();
        }

        this.axeBumper = new Bumper(new Vector(222, 11), 'axe');
        this.axeBumper.onCollision = () => {
            this.playerWeapon = 'axe';
            this.resolveFight();
        }

        this.swordBumper = new Bumper(new Vector(413, 163), 'sword');
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
            this.updateScore();
            Gui.score(100);
            this.rollWeapon();
        } else {
            this.fightResults[this.currentRound] = false;    
            Gui.score(-10);
        }
    }

    update(delta: number) {
        Base.update(delta);
        this.axeBumper.update(delta);
        this.swordBumper.update(delta);
        this.lanceBumper.update(delta);
        this.collisionEngine.update(this.player.body, this.axeBumper.body);
        this.collisionEngine.update(this.player.body, this.swordBumper.body);
        this.collisionEngine.update(this.player.body, this.lanceBumper.body);
        Fx.update(delta);
    }

    renderStatic(context: CanvasRenderingContext2D) {
        Base.renderStatic(context);
        context.fillStyle = "#0d5eaf";
        context.strokeStyle = "white";
        context.rect(365, 300, 60, 77);
        context.fill();
        context.stroke();
    }

    renderHybrid(context: CanvasRenderingContext2D) {
        Base.renderHybrid(context);

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

        this.axeBumper.render(context);
        this.swordBumper.render(context);
        this.lanceBumper.render(context);
    }

    renderDynamic(context: CanvasRenderingContext2D) {
        Base.renderDynamic(context);
        Fx.render(context);
    }

    isComplete() { return this.fightResults.filter(r => r == true).length == 3; }

    updateScore() {
        Gui.objectives(`Win: ${this.currentRound} / 3`);
    }

	playSong() {
		Songs.play_ptwo();
	}

	nextPhase() {
		Songs.stop_song();
		Songs.play_win();
        this.year = '-404'
        return Phase3;
    }
}

export const Phase2 = new Phase2Impl();