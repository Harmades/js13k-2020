export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dot(vector) { return this.x * vector.x + this.y * vector.y; }

    perp() { return new Vector(this.y, -this.x); }

    subtract(vector) { return new Vector(this.x - vector.x, this.y - vector.y); }

    length() { return Math.sqrt(this.x ** 2 + this.y ** 2); }

    multiply(scalar) { return new Vector(this.x * scalar, this.y * scalar); }

    normalize() { return new Vector(this.x / this.length(), this.y / this.length()); }

    add(vector) { return new Vector(this.x + vector.x, this.y + vector.y); }

    static zero() { return new Vector(0, 0); }
}