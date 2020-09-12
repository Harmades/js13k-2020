import { Shape } from './math/shape';

class AssetsImpl {
    atlas: HTMLImageElement;
    sprites: { [key: string]: SVGRect; } = {};
    colliders: { [key: string]: Shape; } = {};
    fxs: { [key: string]: Path2D; } = {};

    constructor(){
      this.atlas = null;
      this.sprites = {};
      this.colliders = {};
      this.fxs = {};
    }

    loadSvg(svg: SVGElement, onload: () => void) {
        const b64 = `data:image/svg+xml;base64,${btoa(svg.outerHTML)}`;
        const image = new Image();
        image.onload = () => {
            this.atlas = image;
            onload();
        };
        image.src = b64;
    }

    load(svg: SVGSVGElement, onload: () => void) {
        const layer2 = svg.getElementById("$l2") as SVGSVGElement;
        for (const element of layer2.querySelectorAll("*")) {
            const node = element as SVGSVGElement;
            const d = node.getAttribute("d");
            const atlas = svg.getElementById(node.id.replace(/(.[0-9])?.collider/g, "")) as SVGSVGElement;
            const bBox = atlas != undefined ? atlas.getBBox() : node.getBBox();
            this.colliders[node.id.substring(1)] = Shape.fromSvgData(d, bBox);
        }
        for (const element of svg.getElementById("$l1").querySelectorAll("*")) {
            const node = element as SVGSVGElement;
            if (node.getBBox) this.sprites[node.id.substring(1)] = node.getBBox();
            if (node.id.endsWith(".fx")) this.fxs[node.id.substring(1)] = new Path2D(node.getAttribute("d"));
        }
        layer2.style.display = "none";
        this.loadSvg(svg, () => {
            onload();
            svg.style.display = "none";
        });
    }
}

export const Assets = new AssetsImpl();
