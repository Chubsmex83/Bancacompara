'use client';
import { useState, useMemo } from 'react';
import tarjetasCredito from '@/data/tarjetas-credito.json';
import { TarjetaCredito } from '@/types';
import BancoLogo from '@/components/BancoLogo';

export default function CalculadoraContent() {
  const [gasto, setGasto] = useState(5000);
  const [meses, setMeses] = useState(12);
  const [pagaTotal, setPagaTotal] = useState(true);

  const gastoValido = Math.max(0, Math.min(500000, gasto));
  const mesesValido = Math.max(1, Math.min(60, meses));

  const resultados = useMemo(() => {
    return (tarjetasCredito as TarjetaCredito[])
      .map((t) => {
        const costoAnual = t.anualidad;
        let intereses = 0;
        if (!pagaTotal) {
          const tasaMensual = t.tasaInteres / 100 / 12;
          intereses = gastoValido * tasaMensual * mesesValido;
        }
        const total = costoAnual + intereses;
        return { ...t, intereses, total };
      })
      .sort((a, b) => a.total - b.total);
  }, [gastoValido, mesesValido, pagaTotal]);

  const mejor = resultados[0];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calculadora de costos</h1>
        <p className="text-gray-500 mt-1">Descubre cuánto pagas realmente con cada tarjeta de crédito</p>
      </div>

      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="gasto" className="text-sm font-medium text-gray-700">Gasto mensual estimado</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
              <input
                id="gasto"
                type="number"
                value={gasto}
                onChange={(e) => setGasto(Math.max(0, Math.min(500000, Number(e.target.value))))}
                min={0}
                max={500000}
                className="w-full border border-gray-200 rounded-xl pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="meses" className="text-sm font-medium text-gray-700">Periodo (meses)</label>
            <input
              id="meses"
              type="number"
              value={meses}
              onChange={(e) => setMeses(Math.max(1, Math.min(60, Number(e.target.value))))}
              min={1}
              max={60}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">¿Pagas el saldo total cada mes?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setPagaTotal(true)}
                aria-pressed={pagaTotal}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pagaTotal ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sí
              </button>
              <button
                onClick={() => setPagaTotal(false)}
                aria-pressed={!pagaTotal}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  !pagaTotal ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {!pagaTotal && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
            Si no pagas el saldo completo cada mes, los intereses se acumulan rápidamente. Se muestra el costo estimado en {mesesValido} meses.
          </div>
        )}
      </div>

      {/* Mejor opción */}
      {mejor && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4">
          <BancoLogo banco={mejor.banco} color={mejor.color} size="md" />
          <div>
            <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Mejor opción para ti</p>
            <p className="font-bold text-gray-900">{mejor.nombre}</p>
            <p className="text-sm text-gray-600">{mejor.banco}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-2xl font-bold text-green-700">${mejor.total.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</p>
            <p className="text-xs text-gray-500">costo total en {mesesValido} mes{mesesValido !== 1 ? 'es' : ''}</p>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 grid grid-cols-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <span>Tarjeta</span>
          <span className="text-right">Anualidad</span>
          <span className="text-right">Intereses est.</span>
          <span className="text-right">Total {mesesValido}m</span>
        </div>
        <div className="divide-y divide-gray-50">
          {resultados.map((t, i) => (
            <div key={t.id} className={`px-5 py-4 grid grid-cols-4 items-center ${i === 0 ? 'bg-green-50' : ''}`}>
              <div className="flex items-center gap-3">
                {i === 0 && <span className="text-green-500 text-lg" aria-label="Mejor opción">★</span>}
                <BancoLogo banco={t.banco} color={t.color} size="sm" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.nombre}</p>
                  <p className="text-xs text-gray-500">{t.banco}</p>
                </div>
              </div>
              <p className="text-sm text-right text-gray-700">
                {t.anualidad === 0 ? <span className="text-green-600">Gratis</span> : `$${t.anualidad.toLocaleString()}`}
              </p>
              <p className="text-sm text-right text-gray-700">
                {pagaTotal ? <span className="text-gray-400">$0</span> : `$${Math.round(t.intereses).toLocaleString()}`}
              </p>
              <p className={`text-sm font-bold text-right ${i === 0 ? 'text-green-700' : 'text-gray-900'}`}>
                ${Math.round(t.total).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Cálculo orientativo. Los intereses reales dependen del saldo promedio diario y condiciones específicas de cada banco.
      </p>
    </div>
  );
}
