import Link from 'next/link';
import tarjetasCredito from '@/data/tarjetas-credito.json';
import tarjetasDebito from '@/data/tarjetas-debito.json';
import cuentasAhorro from '@/data/cuentas-ahorro.json';
import { colorPuntaje } from '@/utils/puntaje';
import AdSection from '@/components/AdBanner';

const stats = [
  { label: 'Tarjetas de crédito', value: tarjetasCredito.length, href: '/tarjetas?tipo=credito', color: 'bg-blue-500' },
  { label: 'Tarjetas de débito', value: tarjetasDebito.length, href: '/tarjetas?tipo=debito', color: 'bg-purple-500' },
  { label: 'Cuentas de ahorro', value: cuentasAhorro.length, href: '/tarjetas?tipo=ahorro', color: 'bg-green-500' },
];

const topCredito = [...tarjetasCredito].sort((a, b) => b.puntaje - a.puntaje).slice(0, 3);
const topDebito = [...tarjetasDebito].sort((a, b) => b.puntaje - a.puntaje).slice(0, 3);
const topAhorro = [...cuentasAhorro].sort((a, b) => b.tasaAnual - a.tasaAnual).slice(0, 3);

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Compara tarjetas y cuentas<br />
          <span className="text-blue-600">bancarias en México</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Encuentra la tarjeta o cuenta que más te conviene. Compara CAT, anualidades, rendimientos, beneficios y más de los principales bancos.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/tarjetas" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Ver todas las tarjetas
          </Link>
          <Link href="/comparar" className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors">
            Comparar lado a lado
          </Link>
        </div>
      </section>

      {/* Stats card */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 overflow-hidden shadow-xl">
        {/* Círculos decorativos */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-white/5 rounded-full" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Header tarjeta */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest font-medium">BancaCompara</p>
              <p className="text-white font-bold text-lg mt-0.5">Catálogo completo</p>
            </div>
            <div className="w-12 h-8 bg-white/20 rounded-md flex items-center justify-center">
              <div className="w-7 h-5 bg-yellow-400/80 rounded-sm" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <Link key={s.href} href={s.href} className="group text-center">
                <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform inline-block">{s.value}</p>
                <p className="text-white/60 text-xs mt-1 leading-tight">{s.label}</p>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/20 pt-4">
            <p className="text-white/40 text-xs">México · {new Date().getFullYear()}</p>
            <Link href="/tarjetas" className="text-white/80 text-xs font-medium hover:text-white transition-colors">
              Ver todos →
            </Link>
          </div>
        </div>
      </section>

      {/* Top Crédito */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Mejores tarjetas de crédito</h2>
          <Link href="/tarjetas?tipo=credito" className="text-sm text-blue-600 hover:underline">Ver todas</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topCredito.map((t, i) => (
            <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-bold text-gray-900">#{i + 1}</span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: t.color }}
                >
                  {t.banco.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t.banco}</p>
                  <p className="font-semibold text-sm text-gray-900">{t.nombre}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Anualidad</span>
                <span className="font-medium">{t.anualidad === 0 ? <span className="text-green-600">Gratis</span> : `$${t.anualidad.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">CAT</span>
                <span className="font-medium">{t.cat}%</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Puntaje</span>
                <span className="font-semibold" style={{ color: colorPuntaje(t.puntaje) }}>★ {t.puntaje}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Débito */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Mejores cuentas de débito</h2>
          <Link href="/tarjetas?tipo=debito" className="text-sm text-blue-600 hover:underline">Ver todas</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topDebito.map((t, i) => (
            <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-bold text-gray-900">#{i + 1}</span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: t.color }}
                >
                  {t.banco.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t.banco}</p>
                  <p className="font-semibold text-sm text-gray-900">{t.nombre}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Comisión</span>
                <span className="font-medium">{t.comisionMensual === 0 ? <span className="text-green-600">Gratis</span> : `$${t.comisionMensual}/mes`}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Rendimiento</span>
                <span className="font-medium text-green-600">{t.rendimientoAnual ? `${t.rendimientoAnual}%` : '—'}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Puntaje</span>
                <span className="font-semibold" style={{ color: colorPuntaje(t.puntaje) }}>★ {t.puntaje}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Ahorro */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Mejores cuentas de ahorro</h2>
          <Link href="/tarjetas?tipo=ahorro" className="text-sm text-blue-600 hover:underline">Ver todas</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topAhorro.map((t, i) => (
            <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-bold text-gray-900">#{i + 1}</span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: t.color }}
                >
                  {t.banco.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t.banco}</p>
                  <p className="font-semibold text-sm text-gray-900">{t.nombre}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tasa anual</span>
                <span className="font-bold text-green-600">{t.tasaAnual}%</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Comisión</span>
                <span className="font-medium">{t.comisionMensual === 0 ? <span className="text-green-600">Gratis</span> : `$${t.comisionMensual}/mes`}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Puntaje</span>
                <span className="font-semibold" style={{ color: colorPuntaje(t.puntaje) }}>★ {t.puntaje}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ads */}
      <AdSection />

      {/* CTA */}
      <section className="bg-blue-600 rounded-3xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">¿No sabes cuál elegir?</h2>
        <p className="text-blue-100 mb-6">Usa nuestra calculadora para saber cuánto pagas con cada tarjeta según tu uso mensual.</p>
        <Link href="/calculadora" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
          Ir a la calculadora
        </Link>
      </section>
    </div>
  );
}
