export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dot(vector) { return this.x * vector.x + this.y * vector.y; }

    perp() { return new Vector(this.y, -this.x); }

    subtract(vector) { return new Vector(this.x - vector.x, this.y - vector.y); }
}

export class Shape {
    constructor(vertices) {
        this.vertices = vertices;
    }

    project(vector) {
        return this.vertices.reduce(
            (minMax, vertice) => {
                const value = vertice.dot(vector);
                if (value < minMax.min) minMax.min = value;
                if (value > minMax.max) minMax.max = value;
                return minMax;
            },
            { min: this.vertices[0].dot(vector), max: this.vertices[0].dot(vector) }
        );
    }

    static circle(x, y, radius) {
        const vertices = [];
        const sides = 26;
        const angle = 2 * Math.PI / sides;
        for (let i = 0; i < sides; i++) {
            vertices[i] = new Vector(x + radius * Math.cos(i * angle), y + radius * Math.sin(i * angle));
        }
        return new Shape(vertices);
    }
}