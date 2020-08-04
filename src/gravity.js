export class Gravity {
    constructor(acceleration) {
        this.acceleration = acceleration;
    }

    applyGravity(entity) {
        entity.y += this.acceleration;
    }
}