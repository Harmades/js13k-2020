import { Shape } from './math/shape.js';

class AssetsImpl {
    loading = null;

    loadSvg(name, svg, onload) {
        const wrappedSvg = `
        <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" height="800" width="600">
            ${svg}
        </svg>
        `;
        const b64 = `data:image/svg+xml;base64,${btoa(wrappedSvg)}`;
        const image = new Image();
        image.onload = () => { this[name] = image; onload(); };
        image.src = b64;
    }

    load(svg, ids, onload) {
        this.loading = ids.length;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(svg, "text/xml");
        for (const id of ids) {
            const colliderId = `${id}.collider`;
            this[colliderId] = Shape.fromSvgData(xmlDoc.getElementById(colliderId).getAttribute("d"));
            const element = xmlDoc.getElementById(id);
            if (element != null) {
                this.loadSvg(id, element.outerHTML, () => {
                    this.loading--;
                    if (this.loading == 0) onload();
                });
            } else {
                this.loading--;
            }
        }
    }
}

export const Assets = new AssetsImpl();