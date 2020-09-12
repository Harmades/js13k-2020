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
import { Settings } from "../settings";
import { Entity } from "./entity";

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
    entities: Entity[];

    constructor() {
        this.weapons = ['sword', 'axe', 'lance'];
        this.rollWeapon();
        this.playerWeapon = null;
        this.fightResults = Array(Settings.p2Rounds).fill(null);
        this.currentRound = 0;
        this.year = '-421';
        this.text = "(421 BC) Excellent job, commander. We have all the resources we need to build and equip an army!\n\nLet's show soldiers some strategy. Your enemy's weapon is shown in blue, and you have to hit the right bumper to win the round. Choose your weapon bumper with care:\n\n🗡️ > 🪓\n🪓 > 🔱\n🔱 > 🗡️\n";
    }

    load(collisionEngine: CollisionEngine) {
        this.updateScore();
        this.collisionEngine = collisionEngine;
        this.player = Base.player;
        this.player.reset();
        const lanceBumper = new Bumper(new Vector(20, 250), 'lance');
        lanceBumper.onCollision = () => {
            this.playerWeapon = 'lance';
            this.resolveFight();
        }

        const axeBumper = new Bumper(new Vector(100, 50), 'axe');
        axeBumper.onCollision = () => {
            this.playerWeapon = 'axe';
            this.resolveFight();
        }

        const swordBumper = new Bumper(new Vector(413, 193), 'sword');
        swordBumper.onCollision = () => {
            this.playerWeapon = 'sword';
            this.resolveFight();
        }
        this.entities = [ lanceBumper, axeBumper, swordBumper ];

        this.crossSpriteBounds = Assets.sprites['cross'];
        this.checkSpriteBounds = Assets.sprites['check'];
    }

    rollWeapon() {
        const randomIndex = Math.floor(Math.random() * 3);
        this.enemyWeapon = this.weapons[randomIndex];
    }

    resolveFight() {
        if (this.currentRound == this.fightResults.length) return;
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
        for (let entity of this.entities) {
            entity.up(delta);
            this.collisionEngine.update(this.player.body, entity.body);
        }
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

        for (let entity of this.entities) entity.render(context);
    }

    renderDynamic(context: CanvasRenderingContext2D) {
        Base.renderDynamic(context);
        Fx.render(context);
    }

    isComplete() { return this.fightResults.filter(r => r == true).length == Settings.p2Rounds; }

    updateScore() {
        Gui.objectives(`Win: ${this.currentRound} / ${Settings.p2Rounds}`);
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