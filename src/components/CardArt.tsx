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
  nameOffset?: boolean;
}

export default function CardArt({ banco, nombre, color, tipo, nameOffset }: Props) {
  const dark = darken(color);

  return (
    <div
      className="w-full h-36 rounded-2xl overflow-hidden relative flex flex-col justify-between p-4"
      style={{ background: `linear-gradient(135deg, ${color} 0%, ${dark} 100%)` }}
    >
      {/* Círculos decorativos */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full translate-x-8 -translate-y-8 bg-white opacity-10" />
      <div className="absolute bottom-0 right-4 w-20 h-20 rounded-full translate-y-6 bg-white opacity-10" />

      {/* Fila superior */}
      <div className={`flex items-start justify-between relative z-10 ${nameOffset ? 'mt-3' : ''}`}>
        <p className="text-white font-bold text-sm leading-tight">{banco}</p>
        {/* Chip */}
        <div className="w-8 h-6 rounded-md grid grid-cols-3 gap-px p-1" style={{ backgroundColor: 'rgba(255,215,0,0.75)' }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="rounded-[1px] bg-yellow-700 opacity-40" />
          ))}
        </div>
      </div>

      {/* Nombre del producto */}
      <p className="text-white text-xs font-medium relative z-10 truncate opacity-70">{nombre}</p>

      {/* Fila inferior */}
      <div className="flex items-center justify-between relative z-10">
        <p className="text-white text-xs font-mono opacity-40 tracking-widest">●●●● ●●●●</p>
        <div className="flex -space-x-2">
          <div className="w-5 h-5 rounded-full bg-white opacity-30" />
          <div className="w-5 h-5 rounded-full bg-white opacity-20" />
        </div>
      </div>
    </div>
  );
}
