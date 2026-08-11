// Web Audio API sound effects synthesizer with mobile touch & haptic vibration support

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
    this.initialized = false;
    this.setupTouchUnlock();
  }

  setupTouchUnlock() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      this.init();
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('click', unlock);
    };
    window.addEventListener('touchstart', unlock, { passive: true, once: true });
    window.addEventListener('pointerdown', unlock, { passive: true, once: true });
    window.addEventListener('click', unlock, { passive: true, once: true });
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  // Trigger mobile haptic vibration
  triggerHaptic(ms = 15) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(ms);
      } catch (e) {}
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    this.triggerHaptic(12);

    if (!this.audioCtx) return;

    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1300, this.audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    this.triggerHaptic([20, 30, 40]);

    if (!this.audioCtx) return;

    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;
      
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, index) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.05);

        gain.gain.setValueAtTime(0.12, now + index * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.05 + 0.18);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + index * 0.05);
        osc.stop(now + index * 0.05 + 0.18);
      });
    } catch (e) {}
  }

  playRandomize() {
    if (!this.enabled) return;
    this.init();
    this.triggerHaptic(18);

    if (!this.audioCtx) return;

    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(950, this.audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {}
  }
}

export const sounds = new SoundManager();
