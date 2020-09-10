import { Vector } from "../math/vector.js";
import { Body } from "../physic/body.js";

export class CollisionResolver {
    resolve(body1, body2, mtv) {
        const normal = mtv.normalize();
        const reaction1 = normal.dot(body1.speed.multiply(body1.bounciness * body2.bounciness));
        const reaction2 = body2.isStatic ? 0 : normal.dot(body2.speed.multiply(body1.bounciness * body2.bounciness));
        const reaction = reaction1 - reaction2;
        if (reaction < 0) {
            body1.applyImpulse(normal.multiply(-reaction));
            body1.translate(mtv);
        }
		return mtv.length();
    }
}
