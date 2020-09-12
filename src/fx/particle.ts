import { Vector } from "../math/vector";

export class Particle {
    position: any;
    path2d: any;
    scale: number;
    scaleSpeed: number;
    life: number;
    color: string;
    alpha: number;
    alphaSpeed: number;
    lineWidth: number;
    fill: boolean;
    hFlip: number;

    constructor(path2d: Path2D, position: Vector) {
        this.position = position;
        this.path2d = path2d;
        this.scale = 1;
        this.scaleSpeed = 0;
        this.life = 500;
        this.color = "white";
        this.alpha = 1;
        this.alphaSpeed = 0;
        this.lineWidth = 1;
        this.fill = false;
        this.hFlip = 1;
    }

    update(delta: number) {
        this.scale += this.scaleSpeed * delta;
        this.alpha += this.alphaSpeed * delta;
        if (this.alpha < 0) this.alpha = 0;
        if (this.alpha > 1) this.alpha = 1;
        this.life -= delta;
    }

    render(context: CanvasRenderingContext2D) {
        context.save();
        context.globalAlpha = this.alpha;
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.lineWidth = this.lineWidth;
        if (this.hFlip) context.scale(this.hFlip, 1);
        context.translate(this.hFlip * this.position.x, this.position.y);
        if (this.fill) context.fill(this.path2d);
        else context.stroke(this.path2d);
        context.restore();
    }
}