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

    rotate(center, angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.vertices = this.vertices.map(vertex =>
            new Vector(
                c * (vertex.x - center.x) - s * (vertex.y - center.y) + center.x,
                s * (vertex.x - center.x) + c * (vertex.y - center.y) + center.y
            ));
    }

    static circle(x, y, radius) {
        const vertices = [];
        const sides = 26;
        const angle = 2 * Math.PI / sides;
        for (let i = 0; i < sides; i++) {
            vertices[i] = new Vector(x + radius * (1 +Math.cos(i * angle)), y + radius * (1 + Math.sin(i * angle)));
        }
        return new Shape(vertices);
    }

    static rectangle(x, y, width, height) {
        return new Shape([new Vector(x, y), new Vector(x, y + height), new Vector(x + width, y + height), new Vector(x + width, y)]);
    }

    static debugDraw(shape, context) {
        context.beginPath();
        context.fillStyle = "#FF0000";
        context.moveTo(shape.vertices[0].x, shape.vertices[0].y);
        for (let i = 1; i < shape.vertices.length; i++) {
            const vertex = shape.vertices[i];
            context.lineTo(vertex.x, vertex.y);
        }
        context.fill();
        context.closePath();
    }

    static fromSvgData(data) {
        let lastPosition = new Vector(0, 0);
        let lastCommand = null;
        const sequence = data.split(" ");
        const vertices = [];
        for (const element of sequence) {
            switch (element) {
                case 'm':
                case 'M':
                case 'v':
                case 'V':
                case 'h':
                case 'H':
                case 'l':
                case 'L':
                case 'z':
                case 'Z':
                    lastCommand = element;
                    break;
                default:
                    const coordinates = element.split(",").map(c => Number.parseFloat(c));
                    switch (lastCommand) {
                        case 'm':
                            vertices.push(lastPosition.add(new Vector(coordinates[0], coordinates[1])));
                            break;
                        case 'M':
                            vertices.push(new Vector(coordinates[0], coordinates[1]));
                            break;
                        case 'v':
                            vertices.push(lastPosition.add(new Vector(0, coordinates[0])));
                            break;
                        case 'V':
                            vertices.push(new Vector(lastPosition.x, coordinates[0]));
                            break;
                        case 'h':
                            vertices.push(lastPosition.add(new Vector(coordinates[0], 0)));
                            break;
                        case 'H':
                            vertices.push(new Vector(coordinates[0], lastPosition.y));
                            break;
                        case 'l':
                            vertices.push(lastPosition.add(new Vector(coordinates[0], coordinates[1])));
                            break;
                        case 'L':
                            vertices.push(new Vector(coordinates[0], coordinates[1]));
                            break;
                        case 'z':
                        case 'Z':
                            break;
                    }
                    lastPosition = vertices[vertices.length - 1];
                    break;
            }
        }
        return new Shape(vertices);
    }
}
