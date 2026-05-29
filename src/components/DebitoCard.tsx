'use client';
import { TarjetaDebito } from '@/types';
import BancoLogo from './BancoLogo';
import CardArt from './CardArt';
import { colorPuntaje, colorBgPuntaje } from '@/utils/puntaje';

interface Props {
  tarjeta: TarjetaDebito;
  seleccionada?: boolean;
  onSeleccionar?: (id: string) => void;
  enComparador?: boolean;
}

export default function DebitoCard({ tarjeta, seleccionada, onSeleccionar, enComparador }: Props) {
  return (
    <div
      className={`bg-white rounded-2xl border-2 transition-all p-5 flex flex-col gap-4 ${
        seleccionada ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-gray-100 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <CardArt banco={tarjeta.banco} nombre={tarjeta.nombre} color={tarjeta.color} tipo="debito" />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <BancoLogo banco={tarjeta.banco} color={tarjeta.color} />
          <div>
            <p className="text-xs text-gray-500">{tarjeta.banco}</p>
            <h3 className="font-semibold text-gray-900">{tarjeta.nombre}</h3>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ backgroundColor: colorBgPuntaje(tarjeta.puntaje) }}>
          <span className="text-sm" style={{ color: colorPuntaje(tarjeta.puntaje) }}>★</span>
          <span className="text-sm font-semibold" style={{ color: colorPuntaje(tarjeta.puntaje) }}>{tarjeta.puntaje}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Comisión</p>
          <p className="font-bold text-sm">
            {tarjeta.comisionMensual === 0 ? (
              <span className="text-green-600">Gratis</span>
            ) : (
              <span className="text-gray-900">${tarjeta.comisionMensual}/mes</span>
            )}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Rendimiento</p>
          <p className="font-bold text-sm">
            {tarjeta.rendimientoAnual ? (
              <span className="text-green-600">{tarjeta.rendimientoAnual}%</span>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Cashback</p>
          <p className="font-bold text-sm">
            {tarjeta.cashback ? (
              <span className="text-green-600">{tarjeta.cashback}%</span>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {tarjeta.categorias.map((cat) => (
          <span key={cat} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
            {cat}
          </span>
        ))}
        {tarjeta.transferenciasGratis && (
          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">SPEI gratis</span>
        )}
        {tarjeta.retiroGratisRed && (
          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">Retiro gratis</span>
        )}
      </div>

      <div className="flex gap-2 mt-auto">
        {onSeleccionar && (
          <button
            onClick={() => onSeleccionar(tarjeta.id)}
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
          href={tarjeta.url}
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
