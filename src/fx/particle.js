export class Particle {
    constructor(path2d, position) {
        this.position = position;
        this.path2d = path2d;
        this.scale = 1;
        this.scaleSpeed = 0;
        this.life = 500;
        this.color = "white";
        this.alpha = 1;
        this.alphaSpeed = 0;
        this.lineWidth = 1;
        this.hFlip = false;
    }

    update(delta) {
        this.scale += this.scaleSpeed * delta;
        this.alpha += this.alphaSpeed * delta;
        if (this.alpha < 0) this.alpha = 0;
        if (this.alpha > 1) this.alpha = 1;
        this.life -= delta;
    }

    render(delta, context) {
        context.save();
        context.globalAlpha = this.alpha;
        context.strokeStyle = this.color;
        context.lineWidth = this.lineWidth;
        if (this.hFlip) context.scale(this.hFlip, 1);
        context.translate(this.hFlip * this.position.x, this.position.y);
        context.stroke(this.path2d);
        context.restore();
    }
}