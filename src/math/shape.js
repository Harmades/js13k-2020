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

    hFlip(axe) {
        const vertices = [];
        for (const vertex of this.vertices) {
            vertices.push(new Vector(vertex.x + 2 * (axe - vertex.x), vertex.y));
        }
        return new Shape(vertices);
    }

    static circle(x, y, radius) {
        const vertices = [];
        const sides = 26;
        const angle = 2 * Math.PI / sides;
        for (let i = 0; i < sides; i++) {
            vertices[i] = new Vector(x + radius * (1 + Math.cos(i * angle)), y + radius * (1 + Math.sin(i * angle)));
        }
        return new Shape(vertices);
    }

    static rectangle(x, y, width, height) {
        return new Shape([new Vector(x, y), new Vector(x, y + height), new Vector(x + width, y + height), new Vector(x + width, y)]);
    }

    static debugDraw(body, context) {
        context.beginPath();
        context.save();
        context.fillStyle = "#FF0000";
        context.translate(body.position.x, body.position.y);
        for (let i = 0; i < body.shape.vertices.length; i++) {
            const vertex = body.shape.vertices[i];
            context.lineTo(vertex.x, vertex.y);
        }
        context.fill();
        context.restore();
        context.closePath();
    }

    static fromSvgData(data, bBox) {
        let dataArray = data.split('');
        // let res = "";
        // const one_numb = ['v','h','V','H','z'];
        // const two_numb = ['m','M','l','L','c','z'];
        // let type_data = 0;
        // let count = 0;
        // let coords = ["",""];
        // for (const i in dataArray){
        //   let force_print = false;
        //   const c = dataArray[i];
        //   if(one_numb.includes(c) || two_numb.includes(c)){
        //     force_print = true;
        //   } else if (c === '-') {
        //     if(coords[0] !== ""){
        //       count += 1;
        //       if (count < 2){
        //         coords[count] = coords[count] + c;
        //       }
        //     }else{
        //       coords[count] = c;
        //     }
        //   } else if (c !== " ") {
        //     coords[count] = coords[count] + c;
        //   }else{
        //     count +=1;
        //   }
        //   if(count === type_data || force_print){
        //     if(type_data === 2 && coords[0] !== ""){
        //       res = res + coords[0] + "," + coords[1] + " ";
        //     }else if(type_data === 1 && coords[0] !== ""){
        //       res = res + coords[0] + " ";
        //     }
        //     if(force_print){
        //       if(one_numb.includes(c)){
        //         type_data = 1;
        //       } else if (two_numb.includes(c)) {
        //         type_data = 2;
        //       }
        //       res = res + c;
        //       if(c !== "z"){
        //         res = res + " ";
        //       }
        //     }
        //     coords = ["",""];
        //     if(c === "-"){
        //       coords[0] = "-";
        //     }
        //     count = 0;
        //   }
        // }
        // console.log(data);
        // console.log(res);
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
        for (const vertex of vertices) {
            vertex.x -= bBox.x;
            vertex.y -= bBox.y;
        }

        console.log(vertices);
        return new Shape(vertices);
    }
}
