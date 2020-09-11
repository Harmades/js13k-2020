export class CollisionDetector {
    getSeparatingAxes(shape) {
        let axes = [];
        for (let i = 0; i < shape.vertices.length; i++) {
            const v1 = shape.vertices[i];
            const v2 = shape.vertices[(i + 1) % (shape.vertices.length)];
            const edge = v2.subtract(v1).normalize();
            axes[i] = edge.perp();
        }
        return axes;
    }

    satCollide(shape1, shape2) {
        const axes = this.getSeparatingAxes(shape1).concat(this.getSeparatingAxes(shape2));
        let minVector = null;
        let minOverlap = null;
        for (let axe of axes) {
            const overlap = this.getOverlap(shape1.project(axe), shape2.project(axe));
            if (overlap != null) {
                if (minOverlap == null || Math.abs(overlap) < Math.abs(minOverlap)) {
                    minOverlap = overlap;
                    minVector = axe;
                }
            } else {
                return null;
            }
        }
        return minVector.multiply(minOverlap);
    }

    getOverlap(projection1, projection2) {
        if (projection1.max < projection2.min || projection2.max < projection1.min) return null;
        const min = Math.max(projection1.min, projection2.min);
        const max = Math.min(projection1.max, projection2.max);
        let sign = Math.sign(projection1.min - projection2.min);
        if (sign == 0) sign = Math.sign(projection1.max - projection2.max);
        return sign * (max - min);
    }
}
