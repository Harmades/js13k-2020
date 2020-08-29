class AssetsImpl {
    loadSvg(name, svg, onload) {
        const b64 = `data:image/svg+xml;base64,${btoa(svg)}`;
        const image = new Image();
        image.onload = () => { this[name] = image; onload(); };
        image.src = b64;
    }
}

export const Assets = new AssetsImpl();