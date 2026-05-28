const promos = [
  {
    brand: 'Amazon México',
    icon: '📦',
    bg: '#131921',
    accent: '#FF9900',
    msi: '18 MSI',
    headline: 'Millones de productos con meses sin intereses',
    sub: 'Aplica con tarjetas de crédito participantes.',
  },
  {
    brand: 'Liverpool',
    icon: '🛍️',
    bg: '#E8001C',
    accent: '#fff',
    msi: '12 MSI',
    headline: 'Moda, muebles y electro sin intereses',
    sub: 'Válido en tienda y en liverpool.com.mx.',
  },
  {
    brand: 'Apple México',
    icon: '',
    bg: '#1d1d1f',
    accent: '#fff',
    msi: '24 MSI',
    headline: 'iPhone y Mac desde $659/mes',
    sub: 'Financiamiento disponible en apple.com/mx.',
  },
];

export default function AdSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Promociones con meses sin intereses</h2>
        <span className="text-[11px] text-gray-300 uppercase tracking-widest font-medium">Publicidad</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {promos.map((p) => (
          <div
            key={p.brand}
            className="rounded-2xl overflow-hidden flex flex-col cursor-pointer group"
            style={{ backgroundColor: p.bg }}
          >
            <div className="flex-1 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{p.icon}</span>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: p.accent, color: p.bg }}
                >
                  {p.msi}
                </span>
              </div>
              <div>
                <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-1">{p.brand}</p>
                <p className="text-white font-bold text-sm leading-snug">{p.headline}</p>
                <p className="text-white/50 text-xs mt-1 leading-snug">{p.sub}</p>
              </div>
            </div>
            <div
              className="px-5 py-3 text-xs font-semibold flex items-center justify-between transition-opacity group-hover:opacity-80"
              style={{ backgroundColor: p.accent, color: p.bg }}
            >
              <span>Ver promoción</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
