export class InputImpl {
    constructor() {
        document.addEventListener("keydown", e => this.keyDownHandler(e), false);
        document.addEventListener("keyup", e => this.keyUpHandler(e), false);
        this.right = false;
        this.left = false;
    }

    keyDownHandler(event) {
        if (event.key == "ArrowRight") this.right = true;
        if (event.key == "ArrowLeft") this.left = true;
    }

    keyUpHandler(event) {
        if (event.key == "ArrowRight") this.right = false;
        if (event.key == "ArrowLeft") this.left = false;
    }
}

export const Input = new InputImpl();