import { Vector } from "../math/vector.js";
import { Body } from "../physic/body.js";
import { Paddle } from "../paddle.js";

export class CollisionResolver {
    resolve(body1, body2, mtv) {
        const normal = mtv.normalize();
        const speed = body1.speed.multiply(body1.bounciness * body2.bounciness);
        const reaction = normal.dot(speed);
        if (reaction < 0) {
            body1.applyImpulse(normal.multiply(-reaction));
            body1.translate(mtv);
        }
    }
}
