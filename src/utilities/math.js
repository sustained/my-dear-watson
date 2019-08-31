export function degreesToRadians(angleDegrees) {
  const { radius } = this;

  const angleRadians = -angleDegrees * Math.PI / 180.0;
  const x = radius + radius * Math.cos(angleRadians);
  const y = radius + radius * Math.sin(angleRadians);

  return [x, y];
}