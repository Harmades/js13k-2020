import { Shape } from './math/shape.js';

class AssetsImpl {

    svg = null;

    loadSvg(svg, onload) {
        const b64 = `data:image/svg+xml;base64,${btoa(svg.outerHTML)}`;
        const image = new Image(600, 800);
        image.onload = () => {
            this.svg = image;
            onload();
        };
        image.src = b64;
    }

    load(svg, ids, onload) {
        for (const id of ids) {
            const colliderId = `${id}.collider`;
            this[colliderId] = Shape.fromSvgData(svg.getElementById(colliderId).getAttribute("d"));
            const element = svg.getElementById(id);
            if (element != null) {
                this[id] = element.getBBox();
            }
        }
        this.loadSvg(svg, () => onload());
    }
}

export const Assets = new AssetsImpl();