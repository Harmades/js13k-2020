class FxImpl {

    constructor() {
        this.particles = [];
    }

    update(delta) {
        for (const particle of this.particles) {
            particle.update(delta);
        }
        this.particles = this.particles.filter(p => p.life > 0);
    }

    render(delta, context) {
        for (const particle of this.particles) {
            particle.render(delta, context);
        }
    }
}

export const Fx = new FxImpl();