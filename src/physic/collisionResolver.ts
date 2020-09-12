import { Vector } from "../math/vector";
import { Body } from "../physic/body";

export class CollisionResolver {
    resolve(body1: Body, body2: Body, mtv: Vector) {
        const normal = mtv.n();
        const reaction1 = normal.d(body1.speed.m(body1.bounciness * body2.bounciness));
        const reaction2 = body2.isStatic ? 0 : normal.d(body2.speed.m(body1.bounciness * body2.bounciness));
        const reaction = reaction1 - reaction2;
        if (reaction < 0) {
            body1.applyImpulse(normal.m(-reaction));
            body1.translate(mtv);
        }
		return mtv.l();
    }
}
