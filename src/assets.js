import { Shape } from './math/shape.js';

class AssetsImpl {
    loadSvg(name, svg, onload) {
        const b64 = `data:image/svg+xml;base64,${btoa(svg)}`;
        const image = new Image();
        image.onload = () => { this[name] = image; onload(); };
        image.src = b64;
    }

    loadColliders(svg, ids) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(svg, "text/xml");
        for (const id of ids) {
            this[id] = Shape.fromSvgData(xmlDoc.getElementById(id).getAttribute("d"));
        }
    }
}

export const Assets = new AssetsImpl();