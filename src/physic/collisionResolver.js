import { Vector } from "../math/vector.js";
import { Body } from "../physic/body.js";
import { Paddle } from "../paddle.js";

export class CollisionResolver {
    resolve(entity1, entity2, mtv) {
        const normal = mtv.normalize();
        const speed = entity2.tag == 'paddle' && entity2.flipping ? entity1.body.speed.multiply(1.5) : entity1.body.speed;
        const reaction = normal.dot(speed);
        if (reaction < 0) {
            entity1.body.applyImpulse(normal.multiply(-reaction * 1600));
            entity1.body.translate(mtv);
        }
    }
}
