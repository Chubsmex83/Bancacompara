import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import tarjetasCredito from '@/data/tarjetas-credito.json';
import tarjetasDebito from '@/data/tarjetas-debito.json';
import cuentasAhorro from '@/data/cuentas-ahorro.json';
import { TarjetaCredito, TarjetaDebito, CuentaAhorro } from '@/types';
import BancoLogo from '@/components/BancoLogo';
import { colorPuntaje, colorBgPuntaje } from '@/utils/puntaje';

const todos = [
  ...(tarjetasCredito as TarjetaCredito[]),
  ...(tarjetasDebito as TarjetaDebito[]),
  ...(cuentasAhorro as CuentaAhorro[]),
];

export async function generateStaticParams() {
  return todos.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const producto = todos.find((p) => p.id === id);
  if (!producto) return {};
  return {
    title: `${producto.nombre} — ${producto.banco} | BancaCompara`,
    description: `Conoce todos los detalles de ${producto.nombre} de ${producto.banco}: beneficios, costos, requisitos y más.`,
    openGraph: {
      title: `${producto.nombre} — ${producto.banco}`,
      description: `Compara ${producto.nombre} con otras tarjetas en BancaCompara.`,
    },
  };
}

function Fila({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900 text-right">{value}</span>
    </div>
  );
}

function Check({ val }: { val: boolean }) {
  return val
    ? <span className="text-green-600 font-semibold">Sí</span>
    : <span className="text-gray-400">No</span>;
}

export default async function DetalleProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const producto = todos.find((p) => p.id === id);
  if (!producto) notFound();

  const tipo = producto.tipo;
  const tipoLabel = tipo === 'credito' ? 'Tarjeta de crédito' : tipo === 'debito' ? 'Tarjeta de débito' : 'Cuenta de ahorro';

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-2">
        <Link href="/tarjetas" className="hover:text-blue-600">Tarjetas</Link>
        <span>/</span>
        <span className="text-gray-900">{producto.nombre}</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-start gap-5">
        <BancoLogo banco={producto.banco} color={producto.color} size="lg" />
        <div className="flex-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{tipoLabel}</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">{producto.nombre}</h1>
          <p className="text-gray-500">{producto.banco}</p>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
          style={{ backgroundColor: colorBgPuntaje(producto.puntaje) }}
        >
          <span className="text-lg font-bold" style={{ color: colorPuntaje(producto.puntaje) }}>★</span>
          <span className="text-lg font-bold" style={{ color: colorPuntaje(producto.puntaje) }}>{producto.puntaje}</span>
        </div>
      </div>

      {/* Datos según tipo */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Costos y condiciones</h2>

        {tipo === 'credito' && (() => {
          const t = producto as TarjetaCredito;
          return (
            <>
              <Fila label="Anualidad" value={t.anualidad === 0 ? <span className="text-green-600">Sin anualidad</span> : `$${t.anualidad.toLocaleString()}/año`} />
              {t.anualidadCondicional && <Fila label="Condición anualidad" value={t.anualidadCondicional} />}
              <Fila label="CAT" value={`${t.cat}%`} />
              <Fila label="Tasa de interés" value={`${t.tasaInteres}% anual`} />
              <Fila label="Límite de crédito" value={`$${t.limiteMinimo.toLocaleString()} – ${t.limiteMaximo === 999999 ? 'Sin límite' : `$${t.limiteMaximo.toLocaleString()}`}`} />
              <Fila label="Penalización pago mínimo" value={`$${t.penalizacionPagoMinimo}`} />
              <Fila label="Meses sin intereses" value={<Check val={t.pagosEnMSI} />} />
              <Fila label="Cashback" value={t.cashback ? `${t.cashback}%` : <span className="text-gray-400">No</span>} />
              <Fila label="Millas / Puntos" value={<Check val={t.millas} />} />
              <Fila label="Acceso sala VIP" value={<Check val={t.accesoSalaVip} />} />
              <Fila label="Concierge" value={<Check val={t.concierge} />} />
            </>
          );
        })()}

        {tipo === 'debito' && (() => {
          const t = producto as TarjetaDebito;
          return (
            <>
              <Fila label="Comisión mensual" value={t.comisionMensual === 0 ? <span className="text-green-600">Sin comisión</span> : `$${t.comisionMensual}/mes`} />
              {t.comisionCondicional && <Fila label="Condición comisión" value={t.comisionCondicional} />}
              <Fila label="Rendimiento anual" value={t.rendimientoAnual ? <span className="text-green-600">{t.rendimientoAnual}%</span> : <span className="text-gray-400">No genera</span>} />
              <Fila label="Cashback" value={t.cashback ? `${t.cashback}%` : <span className="text-gray-400">No</span>} />
              <Fila label="SPEI gratis" value={<Check val={t.transferenciasGratis} />} />
              <Fila label="Retiro gratis (red propia)" value={<Check val={t.retiroGratisRed} />} />
              <Fila label="Retiro gratis (otros ATM)" value={<Check val={t.retiroGratisOtrosATM} />} />
              <Fila label="Límite retiro diario" value={`$${t.limiteRetiroDiario.toLocaleString()}`} />
            </>
          );
        })()}

        {tipo === 'ahorro' && (() => {
          const t = producto as CuentaAhorro;
          return (
            <>
              <Fila label="Tasa anual" value={<span className="text-green-600 font-bold">{t.tasaAnual}%</span>} />
              {t.tasaCondicionada && <Fila label="Condición tasa" value={t.tasaCondicionada} />}
              <Fila label="Monto mínimo" value={t.montoMinimo === 0 ? <span className="text-green-600">Sin mínimo</span> : `$${t.montoMinimo.toLocaleString()}`} />
              <Fila label="Comisión mensual" value={t.comisionMensual === 0 ? <span className="text-green-600">Sin comisión</span> : `$${t.comisionMensual}/mes`} />
              <Fila label="Plazo" value={t.plazo} />
              <Fila label="Liquidez" value={t.liquidez === 'inmediata' ? 'Inmediata' : t.liquidez === 'plazo-fijo' ? 'Plazo fijo' : 'Flexible'} />
              <Fila label="Protegida por IPAB" value={<Check val={t.protegidaBanxico} />} />
              {t.montoProtegido > 0 && <Fila label="Monto protegido" value={`$${t.montoProtegido.toLocaleString()}`} />}
            </>
          );
        })()}
      </div>

      {/* Beneficios */}
      {producto.beneficios.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Beneficios</h2>
          <ul className="space-y-2">
            {producto.beneficios.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-500">✓</span> {b}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Requisitos */}
      {producto.requisitos.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Requisitos</h2>
          <ul className="space-y-2">
            {producto.requisitos.map((r) => (
              <li key={r} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-blue-400">•</span> {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Seguros */}
      {'seguros' in producto && producto.seguros.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Seguros incluidos</h2>
          <ul className="space-y-2">
            {producto.seguros.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-blue-500">🛡</span> {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={producto.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Solicitar en {producto.banco} →
        </a>
        <Link
          href={`/tarjetas?tipo=${tipo}`}
          className="flex-1 border border-gray-200 text-gray-700 text-center py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Comparar con otras
        </Link>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Información orientativa. Verifica condiciones actualizadas directamente con {producto.banco}.
      </p>
    </div>
  );
}
