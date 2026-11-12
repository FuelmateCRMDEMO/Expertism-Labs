import confetti from 'canvas-confetti';

/**
 * Fires an elegant, subtle confetti burst customized with the Expertism emerald & teal brand colors
 */
export function fireSuccessConfetti() {
  const brandColors = ['#10b981', '#14b8a6', '#06b6d4', '#34d399', '#a7f3d0'];

  // Left & right gentle cannons for a refined celebratory feel
  confetti({
    particleCount: 40,
    angle: 60,
    spread: 55,
    origin: { x: 0.2, y: 0.6 },
    colors: brandColors,
    ticks: 180,
    gravity: 0.85,
    scalar: 0.85,
    disableForReducedMotion: true,
  });

  confetti({
    particleCount: 40,
    angle: 120,
    spread: 55,
    origin: { x: 0.8, y: 0.6 },
    colors: brandColors,
    ticks: 180,
    gravity: 0.85,
    scalar: 0.85,
    disableForReducedMotion: true,
  });
}
