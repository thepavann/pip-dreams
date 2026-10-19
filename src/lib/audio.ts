// Single shared audio manager. Starts muted; only creates an AudioContext after a user gesture.
type Ctor = typeof AudioContext;

// C-major pentatonic lullaby (0 = rest)
const C5 = 523.25, D5 = 587.33, E5 = 659.25, G5 = 783.99, A5 = 880, G4 = 392, A4 = 440;
export const LULLABY = [E5, D5, C5, D5, E5, E5, E5, 0, D5, D5, D5, 0, E5, G5, G5, 0, A4, C5, D5, E5, G5, E5, D5, C5, G4, A4, C5, 0];

class AudioManager {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  muted = true;

  get supported() {
    if (typeof window === "undefined") return false;
    return !!(window.AudioContext || (window as unknown as { webkitAudioContext?: Ctor }).webkitAudioContext);
  }

  private ensure() {
    if (!this.supported) return null;
    try {
      if (!this.ctx) {
        const C = (window.AudioContext ||
          (window as unknown as { webkitAudioContext: Ctor }).webkitAudioContext) as Ctor;
        this.ctx = new C();
        this.master = this.ctx.createGain();
        this.master.gain.value = this.muted ? 0 : 0.7;
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === "suspended") void this.ctx.resume().catch(() => {});
      return this.ctx;
    } catch {
      return null;
    }
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (this.ctx && this.master) {
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setTargetAtTime(m ? 0 : 0.7, t, 0.06);
    }
    if (!m) this.ensure();
  }

  private tone(freq: number, start: number, dur: number, vol: number, dest: AudioNode, type: OscillatorType = "sine") {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(vol, start + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(g).connect(dest);
    osc.start(start);
    osc.stop(start + dur + 0.05);
    osc.onended = () => {
      osc.disconnect();
      g.disconnect();
    };
  }

  /** Short gentle chime for button presses. Silent (and no context created) while muted. */
  chime(high = false) {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime + 0.01;
    this.tone(high ? 1318.5 : 1046.5, t, 0.5, 0.08, this.master);
    this.tone(high ? 1975.5 : 1568, t + 0.07, 0.6, 0.05, this.master, "triangle");
  }

  /** Music-box pluck with soft bell overtones for the playable star keys. */
  pluck(freq: number) {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime + 0.005;
    this.tone(freq, t, 1.6, 0.14, this.master);
    this.tone(freq * 2, t, 0.9, 0.04, this.master, "triangle");
    this.tone(freq * 3.01, t, 0.5, 0.015, this.master);
  }

  sparkleRun() {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    [C5, E5, G5, A5, C5 * 2].forEach((f, i) => this.tone(f * 2, ctx.currentTime + i * 0.09, 0.6, 0.05, this.master!, "triangle"));
  }

  /** Starts the lullaby, scheduled on the audio clock. Returns a stop function, or null if unsupported. */
  startLullaby(onNote: (index: number) => void): (() => void) | null {
    const ctx = this.ensure();
    if (!ctx || !this.master) return null;
    const bus = ctx.createGain();
    bus.gain.setValueAtTime(0, ctx.currentTime);
    bus.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.4);
    bus.connect(this.master);
    const step = 0.42;
    let next = ctx.currentTime + 0.12;
    let i = 0;
    const timers = new Set<number>();
    const tick = () => {
      while (next < ctx.currentTime + 0.3) {
        const idx = i % LULLABY.length;
        const f = LULLABY[idx];
        if (f) {
          this.tone(f, next, step * 2.2, 0.16, bus);
          this.tone(f * 2, next, step * 1.2, 0.025, bus, "triangle");
          this.tone(f * 3.01, next, step * 0.7, 0.008, bus);
        }
        const id = window.setTimeout(() => {
          timers.delete(id);
          onNote(idx);
        }, Math.max(0, (next - ctx.currentTime) * 1000));
        timers.add(id);
        next += step;
        i++;
      }
    };
    tick();
    const interval = window.setInterval(tick, 90);
    return () => {
      window.clearInterval(interval);
      timers.forEach((t) => window.clearTimeout(t));
      timers.clear();
      const t = ctx.currentTime;
      bus.gain.cancelScheduledValues(t);
      bus.gain.setValueAtTime(bus.gain.value, t);
      bus.gain.linearRampToValueAtTime(0, t + 0.3);
      window.setTimeout(() => bus.disconnect(), 500);
    };
  }
}

export const audio = new AudioManager();
