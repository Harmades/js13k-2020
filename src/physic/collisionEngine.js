import { CollisionDetector } from "./collisionDetector.js";
import { CollisionResolver } from "./collisionResolver.js";

export class CollisionEngine {
    constructor() {
        this.detector = new CollisionDetector();
        this.resolver = new CollisionResolver();
    }

    update(body1, body2) {
        const normal = this.detector.satCollide(body1.shape, body2.shape);
        if (normal != null) {
            if (body2.onCollision != undefined) body2.onCollision(normal);
            if (body2.isRigid) {
                this.resolver.resolve(body1, body2, normal);
            }
            if (body2.onCollisionResolved != undefined) body2.onCollisionResolved();
        }
    }
}