import { Particle } from "./particle";

class FxImpl {
    particles: Particle[] = [];

    update(delta: number) {
        for (const particle of this.particles) {
            particle.update(delta);
        }
        this.particles = this.particles.filter(p => p.life > 0);
    }

    render(context: CanvasRenderingContext2D) {
        for (const particle of this.particles) {
            particle.render(context);
        }
    }
}

export const Fx = new FxImpl();