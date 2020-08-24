import { CollisionDetector } from "./collisionDetector.js";
import { CollisionResolver } from "./collisionResolver.js";

export class CollisionEngine {
    constructor() {
        this.detector = new CollisionDetector();
        this.resolver = new CollisionResolver();
    }

    update(entity1, entity2) {
        const normal = this.detector.satCollide(entity1.body.shape, entity2.body.shape);
        if (normal != null) {
            this.resolver.resolve(entity1, entity2, normal);
        }
    }
}