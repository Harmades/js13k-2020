export class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    d(vector: Vector) { return this.x * vector.x + this.y * vector.y; }

    p() { return new Vector(this.y, -this.x); }

    s(vector: Vector) { return new Vector(this.x - vector.x, this.y - vector.y); }

    l() { return Math.sqrt(this.x ** 2 + this.y ** 2); }

    m(scalar: number) { return new Vector(this.x * scalar, this.y * scalar); }

    n() { return new Vector(this.x / this.l(), this.y / this.l()); }

    a(vector: Vector) { return new Vector(this.x + vector.x, this.y + vector.y); }

    static z() { return new Vector(0, 0); }
}