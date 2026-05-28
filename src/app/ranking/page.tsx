import type { Metadata } from 'next';
import tarjetasCredito from '@/data/tarjetas-credito.json';
import tarjetasDebito from '@/data/tarjetas-debito.json';
import cuentasAhorro from '@/data/cuentas-ahorro.json';
import Link from 'next/link';
import BancoLogo from '@/components/BancoLogo';
import { TarjetaCredito, TarjetaDebito, CuentaAhorro } from '@/types';
import { colorPuntaje } from '@/utils/puntaje';

export const metadata: Metadata = {
  title: 'Ranking de tarjetas y cuentas bancarias en México | BancaCompara',
  description: 'Las mejores tarjetas de crédito, débito y cuentas de ahorro por categoría: sin anualidad, menor CAT, mayor rendimiento, premium y más.',
  openGraph: {
    title: 'Ranking de tarjetas bancarias en México',
    description: 'Las mejores tarjetas y cuentas por perfil de usuario.',
    url: 'https://bancacompara.mx/ranking',
  },
};

const categorias = [
  {
    titulo: 'Mejor sin anualidad',
    descripcion: 'Tarjetas de crédito sin costo anual',
    datos: (tarjetasCredito as TarjetaCredito[]).filter((t) => t.anualidad === 0).sort((a, b) => b.puntaje - a.puntaje).slice(0, 5),
    tipo: 'credito',
    campo: (t: TarjetaCredito) => 'Sin anualidad',
    colorCampo: 'text-green-600',
  },
  {
    titulo: 'Menor CAT',
    descripcion: 'Paga menos intereses',
    datos: (tarjetasCredito as TarjetaCredito[]).sort((a, b) => a.cat - b.cat).slice(0, 5),
    tipo: 'credito',
    campo: (t: TarjetaCredito) => `CAT ${t.cat}%`,
    colorCampo: 'text-blue-600',
  },
  {
    titulo: 'Premium / Viajeros',
    descripcion: 'Salas VIP, millas y seguros',
    datos: (tarjetasCredito as TarjetaCredito[]).filter((t) => t.accesoSalaVip || t.millas).sort((a, b) => b.puntaje - a.puntaje).slice(0, 5),
    tipo: 'credito',
    campo: (t: TarjetaCredito) => `★ ${t.puntaje}`,
    colorCampo: 'text-yellow-600',
  },
  {
    titulo: 'Mejor rendimiento débito',
    descripcion: 'Tu dinero genera más',
    datos: (tarjetasDebito as TarjetaDebito[]).filter((t) => t.rendimientoAnual).sort((a, b) => (b.rendimientoAnual ?? 0) - (a.rendimientoAnual ?? 0)).slice(0, 5),
    tipo: 'debito',
    campo: (t: TarjetaDebito) => `${t.rendimientoAnual}% anual`,
    colorCampo: 'text-green-600',
  },
  {
    titulo: 'Mejor tasa de ahorro',
    descripcion: 'Invierte con la tasa más alta',
    datos: (cuentasAhorro as CuentaAhorro[]).sort((a, b) => b.tasaAnual - a.tasaAnual).slice(0, 5),
    tipo: 'ahorro',
    campo: (t: CuentaAhorro) => `${t.tasaAnual}% anual`,
    colorCampo: 'text-green-600',
  },
  {
    titulo: 'Para principiantes',
    descripcion: 'Sin historial crediticio',
    datos: (tarjetasCredito as TarjetaCredito[]).filter((t) => t.categorias.includes('principiantes') || t.categorias.includes('sin-historial')).sort((a, b) => b.puntaje - a.puntaje).slice(0, 5),
    tipo: 'credito',
    campo: (t: TarjetaCredito) => `★ ${t.puntaje}`,
    colorCampo: 'text-yellow-600',
  },
];

export default function RankingPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rankings por categoría</h1>
        <p className="text-gray-500 mt-1">Las mejores tarjetas y cuentas por cada perfil de usuario</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {categorias.map((cat) => (
          <div key={cat.titulo} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h2 className="font-bold text-gray-900">{cat.titulo}</h2>
              <p className="text-sm text-gray-500">{cat.descripcion}</p>
            </div>
            <div className="divide-y divide-gray-50">
              {cat.datos.map((item, i) => (
                <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                  <span className="text-xl font-bold text-gray-200 w-6 text-center" aria-label={`Posición ${i + 1}`}>{i + 1}</span>
                  <BancoLogo banco={item.banco} color={item.color} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{item.nombre}</p>
                    <p className="text-xs text-gray-500">{item.banco}</p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${cat.colorCampo !== 'text-yellow-600' ? cat.colorCampo : ''}`}
                    style={cat.colorCampo === 'text-yellow-600' ? { color: colorPuntaje(item.puntaje) } : undefined}
                  >
                    {(cat.campo as (t: typeof item) => string)(item)}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 bg-gray-50">
              <Link href={`/tarjetas?tipo=${cat.tipo}`} className="text-sm text-blue-600 hover:underline font-medium">
                Ver todas las {cat.tipo === 'credito' ? 'tarjetas de crédito' : cat.tipo === 'debito' ? 'cuentas de débito' : 'cuentas de ahorro'} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
