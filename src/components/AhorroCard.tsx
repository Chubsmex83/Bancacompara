'use client';
import { CuentaAhorro } from '@/types';
import BancoLogo from './BancoLogo';
import CardArt from './CardArt';
import { colorPuntaje, colorBgPuntaje } from '@/utils/puntaje';

interface Props {
  cuenta: CuentaAhorro;
  seleccionada?: boolean;
  onSeleccionar?: (id: string) => void;
  enComparador?: boolean;
}

export default function AhorroCard({ cuenta, seleccionada, onSeleccionar, enComparador }: Props) {
  const liquidezLabel = { inmediata: 'Inmediata', 'plazo-fijo': 'Plazo fijo', flexible: 'Flexible' }[cuenta.liquidez];
  const liquidezColor = { inmediata: 'text-green-600', 'plazo-fijo': 'text-amber-600', flexible: 'text-blue-600' }[cuenta.liquidez];

  return (
    <div
      className={`bg-white rounded-2xl border-2 transition-all p-5 flex flex-col gap-4 ${
        seleccionada ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-gray-100 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <CardArt banco={cuenta.banco} nombre={cuenta.nombre} color={cuenta.color} tipo="ahorro" />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <BancoLogo banco={cuenta.banco} color={cuenta.color} />
          <div>
            <p className="text-xs text-gray-500">{cuenta.banco}</p>
            <h3 className="font-semibold text-gray-900">{cuenta.nombre}</h3>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ backgroundColor: colorBgPuntaje(cuenta.puntaje) }}>
          <span className="text-sm" style={{ color: colorPuntaje(cuenta.puntaje) }}>★</span>
          <span className="text-sm font-semibold" style={{ color: colorPuntaje(cuenta.puntaje) }}>{cuenta.puntaje}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Tasa anual</p>
          <p className="font-bold text-green-600 text-sm">{cuenta.tasaAnual}%</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Comisión</p>
          <p className="font-bold text-sm">
            {cuenta.comisionMensual === 0 ? (
              <span className="text-green-600">Gratis</span>
            ) : (
              <span className="text-gray-900">${cuenta.comisionMensual}/mes</span>
            )}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Liquidez</p>
          <p className={`font-bold text-sm ${liquidezColor}`}>{liquidezLabel}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {cuenta.categorias.map((cat) => (
          <span key={cat} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
            {cat}
          </span>
        ))}
        {cuenta.protegidaBanxico && (
          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">IPAB protegida</span>
        )}
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Mín. ${cuenta.montoMinimo}</span>
      </div>

      <div className="flex gap-2 mt-auto">
        {onSeleccionar && (
          <button
            onClick={() => onSeleccionar(cuenta.id)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              seleccionada
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : enComparador
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
            disabled={enComparador && !seleccionada}
          >
            {seleccionada ? 'Quitar' : 'Comparar'}
          </button>
        )}
        <a
          href={cuenta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 rounded-xl text-sm font-medium text-center bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Ver más
        </a>
      </div>
    </div>
  );
}
