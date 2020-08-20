import { Vector } from "../math/vector.js";
import { Body } from "../physic/body.js";

export class CollisionResolver {
    resolve(body1, body2, mtv) {
        const normal = mtv.normalize();
        const reaction = normal.dot(body1.speed);
        if (reaction < 0) {
            body1.applyImpulse(normal.multiply(-reaction * 1600));
            body1.translate(mtv);
        }
    }
}
