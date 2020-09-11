import { CollisionDetector } from "./collisionDetector";
import { CollisionResolver } from "./collisionResolver";
import { Body } from "../physic/body";

export class CollisionEngine {
    detector: CollisionDetector;
    resolver: CollisionResolver;
    previousOverlap: { body1: any; body2: any; };

    constructor() {
        this.detector = new CollisionDetector();
        this.resolver = new CollisionResolver();
        this.previousOverlap = { body1: null, body2: null };
    }

    update(body1: Body, body2: Body) {
        if (body2.ignoreCollision) return;
        const normal = this.detector.satCollide(body1.getShape(), body2.getShape());
        if (normal != null) {
            if (body2.onCollision != undefined) body2.onCollision(normal);
            if (body2.isRigid) {
                const speed = this.resolver.resolve(body1, body2, normal);
				if (body2.onCollisionResolved != undefined) body2.onCollisionResolved(speed);
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