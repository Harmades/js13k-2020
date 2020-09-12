import { CollisionEngine } from "../physic/collisionEngine";
import { Settings } from "../settings";
import { Phase1, Phase1Impl } from "./phase1";
import { Phase2, Phase2Impl } from "./phase2";
import { Phase3, Phase3Impl } from "./phase3";
import { Phase4, Phase4Impl } from "./phase4";
import { Base } from "./base";
import { Input } from "../input";
import { Songs } from "../sounds";
import { Gui } from "./gui";


export class World {
    collisionEngine: CollisionEngine;
    currentPhase: Phase1Impl | Phase2Impl | Phase3Impl | Phase4Impl;
    staticDrawn: boolean;
    started: boolean;
    constructor() {
        this.collisionEngine = new CollisionEngine();
		this.currentPhase = Phase1;
		if(this.currentPhase == Phase1) {
		  Songs.play_intro();
		} else {
		  this.currentPhase.playSong();
		}
        Base.load(this.collisionEngine);
        this.currentPhase.load(this.collisionEngine);
        this.staticDrawn = false;
        Base.year = this.currentPhase.year;
        this.started = false;
        Gui.dialog(this.currentPhase.text);
    }

    update(delta: number) {
        if (!this.started) {
			if (Input.space && this.currentPhase != Phase4) {
			  if (this.currentPhase == Phase1) {
				  Songs.stop_song();
				  Songs.play_pone();
				}
                this.started = true;
                Gui.toggleDialog();
            }
            return;
        }
        this.currentPhase.update(delta);
        if (this.currentPhase.isComplete()) {
            this.currentPhase = this.currentPhase.nextPhase();
            Base.invisibleWall.isRigid = false;
            this.currentPhase.load(this.collisionEngine);
			this.currentPhase.playSong();
            this.staticDrawn = false;
            Base.year = this.currentPhase.year;
            this.started = false;
            Gui.toggleDialog();
            Gui.dialog(this.currentPhase.text.replace("{score}", Gui.value.toString()));
        }
    }

    render(context: any) {
        if (!this.staticDrawn) {
            context.staticContext.clearRect(0, 0, Settings.width, Settings.height);
            this.currentPhase.renderStatic(context.staticContext);
            this.staticDrawn = true;
        }
        context.hybridContext.clearRect(0, 0, Settings.width, Settings.height);
        this.currentPhase.renderHybrid(context.hybridContext);
        context.dynamicContext.clearRect(0, 0, Settings.width, Settings.height);
        this.currentPhase.renderDynamic(context.dynamicContext);
    }
}