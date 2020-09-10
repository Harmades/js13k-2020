import { Base } from "./base.js";

class Phase4Impl {
    constructor() {
        this.entities = [];
        this.year = '-404';
        this.text = `(404 BC) You did it! The Delian League and Athens surrendered.
        Our allies demand that the city of Athens to be destroyed, but you know that would be a mistake. Let the Spartan Empire grow with a new city!

        Well done.
        `;
    }

    load(collisionEngine) {

    }

    update(delta) {

    }

    renderStatic(delta, context) {
        Base.renderStatic(delta, context);
    }

    renderHybrid(delta, context) {
    }
    
    renderDynamic(delta, context) {
    }

    isComplete() { return false; }

    nextPhase() { return null; }
}

export const Phase4 = new Phase4Impl();