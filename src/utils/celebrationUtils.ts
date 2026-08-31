import confetti from 'canvas-confetti';

export function triggerGrandCelebration() {
  // 1. Fireworks burst
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'],
  });

  fire(0.2, {
    spread: 60,
    colors: ['#ef4444', '#06b6d4', '#84cc16', '#a855f7'],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#fbbf24', '#f43f5e', '#38bdf8', '#4ade80'],
  });

  // 2. Continuous side cannons for 2.5 seconds
  const end = Date.now() + 2500;
  const interval: any = setInterval(function () {
    if (Date.now() > end) {
      return clearInterval(interval);
    }

    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ['#e11d48', '#2563eb', '#16a34a', '#d97706', '#9333ea', '#059669'],
    });
  }, 250);
}

export function triggerGentleCheer() {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.8 },
    zIndex: 9999,
  });
}
