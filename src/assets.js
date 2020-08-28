class AssetsImpl {
    ready;
    loadSvg(name, svg) {
        this.ready = false;
        const b64 = `data:image/svg+xml;base64,${btoa(svg)}`;
        const image = new Image();
        image.onload = () => { this[name] = image; this.ready = true; }
        image.src = b64;
    }
}

export const Assets = new AssetsImpl();