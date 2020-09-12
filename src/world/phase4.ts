import { Base } from "./base";
import { Songs } from "../sounds";
import { Entity } from "./entity";
import { CollisionEngine } from "../physic/collisionEngine";
import { Gui } from "./gui";

export class Phase4Impl {
    entities: Entity[];
    year: string;
    text: string;
    
    constructor() {
        this.entities = [];
        this.year = '-404';
        this.text = "(404 BC) Victory is ours! The Delian League and Athens surrendered. The Peloponnesian War will be remembered as a great victory of Sparta.\n\nScore: {score}\n\nCredits:\n\nBarthélémy Renucci\nAdrian Lissot\nDavid Sebaoun\nFlorent Perez";
    }

    load(collisionEngine: CollisionEngine) {

    }

    update(delta: number) {

    }

    renderStatic(context: CanvasRenderingContext2D) {
        Base.renderStatic(context);
    }

    renderHybrid(context: CanvasRenderingContext2D) {
    }
    
    renderDynamic(context: CanvasRenderingContext2D) {
    }

	playSong() {
	  setTimeout(() => Songs.play_intro(), 2500);
	}

    isComplete() { return false; }

    nextPhase(): any { return null; }
}

export const Phase4 = new Phase4Impl();