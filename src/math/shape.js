import { Vector } from "./vector.js";

export class Shape {
    constructor(vertices) {
        this.vertices = vertices;
    }

    project(vector) {
        return this.vertices.reduce(
            (minMax, vertice) => {
                const value = vertice.dot(vector);
                if (value < minMax.min)
                    minMax.min = value;
                if (value > minMax.max)
                    minMax.max = value;
                return minMax;
            },
            { min: this.vertices[0].dot(vector), max: this.vertices[0].dot(vector) }
        );
    }

    translate(vector) {
        this.vertices = this.vertices.map(vertex => vertex.add(vector));
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

    static rectangle(x, y, width, height) {
        return new Shape([new Vector(x, y), new Vector(x, y + height), new Vector(x + width, y + height), new Vector(x + width, y)]);
    }
}
