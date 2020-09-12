class GuiImpl {
    value: number;
    constructor() {
        this.value = 0;
        this.score(0);
    }

    score(amount: number) {
        this.value += amount;
        this.get("s").innerText = `Score: ${this.value.toString()}`;
    }

    objectives(text: string) {
        this.get("o").innerText = text;
    }

    dialog(text: string) {
        this.get("d").innerText = text;
    }

    toggleDialog() {
        const dialog = this.get("d");
        dialog.style.display = dialog.style.display == "none" ? "block" : "none";
    }

    private get(id: string) { return document.getElementById(id); }
}

export const Gui = new GuiImpl();