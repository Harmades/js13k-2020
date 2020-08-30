import { Settings } from "../settings.js";

export class Phase1 {
    constructor() {
        this.treeScore = 0;
        this.goldScore = 0;
        this.rockScore = 0;
    }

    isComplete() {
        this.treeScore >= Settings.treeScoreGoal;
        this.goldScore >= Settings.goldScoreGoal;
        this.rockScore >= Settings.rockScoreGoal;
    }
}