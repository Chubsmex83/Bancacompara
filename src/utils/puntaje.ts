export function colorPuntaje(puntaje: number): string {
  // Rango esperado: 5.0 (rojo) → 10.0 (verde)
  const t = Math.max(0, Math.min(1, (puntaje - 5) / 5));
  const hue = Math.round(t * 120); // 0 = rojo, 120 = verde
  return `hsl(${hue}, 80%, 40%)`;
}

export function colorBgPuntaje(puntaje: number): string {
  const t = Math.max(0, Math.min(1, (puntaje - 5) / 5));
  const hue = Math.round(t * 120);
  return `hsl(${hue}, 70%, 94%)`;
}
