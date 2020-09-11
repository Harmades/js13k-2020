class ScoreImpl {
    value: number;
    constructor() {
        this.value = 0;
        this.update();
    }

    score(amount: number) {
        this.value += amount;
        this.update();
    }

    update() {
        document.getElementById("score").innerText = this.value.toString();
    }
}

export const Score = new ScoreImpl();