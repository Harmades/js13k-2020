export class Kick {
    constructor(context) {
        this.context = context;
    }

    setup() {
        this.osc = this.context.createOscillator();
        this.gain = this.context.createGain();
        this.osc.connect(this.gain);
        this.gain.connect(this.context.destination);
    }

    trigger(time) {
        this.setup();
        this.osc.frequency.setValueAtTime(150, time);
        this.gain.gain.setValueAtTime(3, time);
        this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
        this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
        this.osc.start(time);
        this.osc.stop(time + 0.5);
    }
}

export class Snare {
    constructor(context) {
        this.context = context;
    }

    noiseBuffer() {
        var bufferSize = this.context.sampleRate;
        var buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        var output = buffer.getChannelData(0);
      
        for (var i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      
        return buffer;
    }

    setup() {
        this.noise = this.context.createBufferSource();
        this.noise.buffer = this.noiseBuffer();
      
        var noiseFilter = this.context.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;
        this.noise.connect(noiseFilter);
      
        this.noiseEnvelope = this.context.createGain();
        noiseFilter.connect(this.noiseEnvelope);
      
        this.noiseEnvelope.connect(this.context.destination);
      
        this.osc = this.context.createOscillator();
        this.osc.type = 'triangle';
      
        this.oscEnvelope = this.context.createGain();
        this.osc.connect(this.oscEnvelope);
        this.oscEnvelope.connect(this.context.destination);
    }

    trigger(time) {
        this.setup();

        this.noiseEnvelope.gain.setValueAtTime(1, time);
        this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
        this.noise.start(time)
      
        this.osc.frequency.setValueAtTime(100, time);
        this.oscEnvelope.gain.setValueAtTime(0.7, time);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        this.osc.start(time)
      
        this.osc.stop(time + 0.2);
        this.noise.stop(time + 0.2);
    }
}

export class Bell {
    constructor(context) {
        this.context = context;
    }

    setup() {
        const gainNode = this.context.createGain();
        gainNode.gain.value = 0;
        this.oscillator = this.context.createOscillator();
        this.oscillator.type = 'sine';
        this.oscillator.frequency.value = 880;
        this.oscillator.connect(gainNode);
        this.oscillator.start(this.context.currentTime);
        this.adsr = new Adsr();
        this.adsr.connect(gainNode.gain);
        gainNode.connect(this.context.destination);
    }

    trigger(time) {
        this.setup();
        this.adsr.play(time, 1);
    }
}

export class Adsr {
    constructor(attack = 0.05, decay = 0.02, sustain = 0.5, release = 0.02) {
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
    }

    connect(destination) {
        this.param = destination;
    }

    disconnect() {
        this.param = null;
    }

    play(now, duration) {
        this.param.cancelScheduledValues(now);
        this.param.setValueAtTime(0, now);
        this.param.linearRampToValueAtTime(1, now + this.attack);
        this.param.linearRampToValueAtTime(this.sustain, now + this.attack + this.decay);
        this.param.linearRampToValueAtTime(0, now + duration);
        setTimeout(this.disconnect(), duration);
    }
}