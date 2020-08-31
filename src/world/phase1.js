import { Settings } from "../settings.js";

class Phase1Impl {
    constructor() {
        this.woodScore = 0;
        this.goldScore = 0;
        this.ironScore = 0;
    }

    isComplete() {
        this.woodScore >= Settings.treeScoreGoal;
        this.goldScore >= Settings.goldScoreGoal;
        this.ironScore >= Settings.rockScoreGoal;
    }
}

export const Phase1 = new Phase1Impl();