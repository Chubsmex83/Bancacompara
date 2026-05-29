function darken(hex: string, factor = 0.6): string {
  const h = hex.replace('#', '');
  const r = Math.round(parseInt(h.slice(0, 2), 16) * factor);
  const g = Math.round(parseInt(h.slice(2, 4), 16) * factor);
  const b = Math.round(parseInt(h.slice(4, 6), 16) * factor);
  return `rgb(${r},${g},${b})`;
}

interface Props {
  banco: string;
  nombre: string;
  color: string;
  tipo: 'credito' | 'debito' | 'ahorro';
}

export default function CardArt({ banco, nombre, color, tipo }: Props) {
  const dark = darken(color);

  return (
    <div
      className="w-full rounded-2xl overflow-hidden relative"
      style={{
        aspectRatio: '1.586 / 1',
        background: `linear-gradient(135deg, ${color} 0%, ${dark} 100%)`,
      }}
    >
      {/* Círculos decorativos */}
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 right-8 w-28 h-28 rounded-full bg-white/10" />
      <div className="absolute top-1/2 -left-6 w-20 h-20 rounded-full bg-black/10" />

      {/* Contenido */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">

        {/* Fila superior */}
        <div className="flex items-start justify-between">
          <p className="text-white font-bold text-sm leading-tight drop-shadow">{banco}</p>
          {/* Chip */}
          <div className="w-9 h-7 rounded-md bg-yellow-300/80 grid grid-cols-3 gap-px p-1 shadow-inner">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-yellow-500/40 rounded-[1px]" />
            ))}
          </div>
        </div>

        {/* Nombre del producto */}
        <p className="text-white/60 text-[11px] font-medium tracking-wide truncate">{nombre}</p>

        {/* Fila inferior */}
        <div className="flex items-end justify-between">
          <p className="text-white/40 text-xs font-mono tracking-widest">●●●● ●●●● ●●●●</p>
          {/* Indicador de red (genérico) */}
          <div className="flex items-center -space-x-2">
            <div className="w-6 h-6 rounded-full bg-white/30" />
            <div className="w-6 h-6 rounded-full bg-white/20" />
          </div>
        </div>

      </div>
    </div>
  );
}
