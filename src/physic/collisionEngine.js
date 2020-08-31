import { CollisionDetector } from "./collisionDetector.js";
import { CollisionResolver } from "./collisionResolver.js";

export class CollisionEngine {
    constructor() {
        this.detector = new CollisionDetector();
        this.resolver = new CollisionResolver();
        this.previousOverlap = { body1: null, body2: null };
    }

    update(body1, body2) {
        const normal = this.detector.satCollide(body1.shape, body2.shape);
        if (normal != null) {
            if (body2.onCollision != undefined) body2.onCollision(normal);
            if (body2.isRigid) {
                this.resolver.resolve(body1, body2, normal);
                if (body2.onCollisionResolved != undefined) body2.onCollisionResolved();
            } else {
                if (this.previousOverlap.body1 == null && this.previousOverlap.body2 == null && body2.onAreaEnter) {
                    body2.onAreaEnter();
                }
                this.previousOverlap.body1 = body1;
                this.previousOverlap.body2 = body2;
            }
        }
        if (normal == null && this.previousOverlap.body1 == body1 && this.previousOverlap.body2 == body2) {
            if (body2.onAreaExit) body2.onAreaExit();
            this.previousOverlap.body1 = null;
            this.previousOverlap.body2 = null;
        }
    }
}