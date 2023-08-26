export function calculatePoints(time: number) {
  const timeRatio = Math.min(time / 30, 1);
  return Math.round(200 * timeRatio);
}
