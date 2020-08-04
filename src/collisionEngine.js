import { Vector, Shape } from './math.js';

export class CollisionEngine {
    constructor() { }


    run(entities) {
        
    }

    detect(entities) {

    }

    resolve(collisions) {
        
    }

    getSeparatingAxes(shape) {
        let axes = [];
        for (let i = 0; i < shape.vertices.length; i++) {
            const v1 = shape.vertices[i];
            const v2 = shape.vertices[(i + 1) % (shape.vertices.length)];
            const edge = v2.subtract(v1);
            const length = Math.sqrt(edge.x ** 2 + edge.y ** 2);
            edge.x = edge.x / length;
            edge.y = edge.y / length;
            axes[i] = edge.perp();
        }
        return axes;
    }

    satCollide(shape1, shape2) {
        const axes1 = this.getSeparatingAxes(shape1);
        const axes2 = this.getSeparatingAxes(shape2);
        let minVector = null;
        let minOverlap = null;
        for (let i = 0; i < axes1.length; i++) {
            const axe = axes1[i];
            const projection1 = shape1.project(axe);
            const projection2 = shape2.project(axe);
            const overlap = this.getOverlap(projection1, projection2);
            if (overlap != null) {
                if (minOverlap == null || Math.abs(overlap) < Math.abs(minOverlap)) {
                    minOverlap = overlap;
                    minVector = axe;
                }
            } else {
                return null;
            }
        }

        for (let i = 0; i < axes2.length; i++) {
            const axe = axes2[i];
            const projection1 = shape1.project(axe);
            const projection2 = shape2.project(axe);
            const overlap = this.getOverlap(projection1, projection2);
            if (overlap != null) {
                if (minOverlap == null || Math.abs(overlap) < Math.abs(minOverlap)) {
                    minOverlap = overlap;
                    minVector = axe;
                }
            }
            else {
                return null;
            }
        }

        minVector.x = minOverlap * minVector.x;
        minVector.y = minOverlap * minVector.y;
        return minVector;
    }

    getOverlap(projection1, projection2) {
        if (projection1.max < projection2.min || projection2.max < projection1.min) return null;
        const min = Math.max(projection1.min, projection2.min);
        const max = Math.min(projection1.max, projection2.max);
        return Math.sign(projection1.min - projection2.min) * (max - min);
    }
}

export class Collision {
    constructor(entity1, entity2, translationVector) {
        this.entity1 = entity1;
        this.entity2 = entity2;
        this.translationVector = translationVector;
    }
}