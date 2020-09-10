class ScoreImpl {
    constructor() {
        this.value = 0;
        this.update();
    }

    score(amount) {
        this.value += amount;
        this.update();
    }

    update() {
        document.getElementById("score").innerText = this.value;
    }
}

export const Score = new ScoreImpl();