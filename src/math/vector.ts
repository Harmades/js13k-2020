export class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    dot(vector: Vector) { return this.x * vector.x + this.y * vector.y; }

    perp() { return new Vector(this.y, -this.x); }

    subtract(vector: Vector) { return new Vector(this.x - vector.x, this.y - vector.y); }

    length() { return Math.sqrt(this.x ** 2 + this.y ** 2); }

    multiply(scalar: number) { return new Vector(this.x * scalar, this.y * scalar); }

    normalize() { return new Vector(this.x / this.length(), this.y / this.length()); }

    add(vector: Vector) { return new Vector(this.x + vector.x, this.y + vector.y); }

    static zero() { return new Vector(0, 0); }
}