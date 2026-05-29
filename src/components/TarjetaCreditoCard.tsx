'use client';
import { TarjetaCredito } from '@/types';
import BancoLogo from './BancoLogo';
import CardArt from './CardArt';
import { colorPuntaje, colorBgPuntaje } from '@/utils/puntaje';

interface Props {
  tarjeta: TarjetaCredito;
  seleccionada?: boolean;
  onSeleccionar?: (id: string) => void;
  enComparador?: boolean;
}

export default function TarjetaCreditoCard({ tarjeta, seleccionada, onSeleccionar, enComparador }: Props) {
  return (
    <div
      className={`bg-white rounded-2xl border-2 transition-all p-5 flex flex-col gap-4 ${
        seleccionada ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-gray-100 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <CardArt banco={tarjeta.banco} nombre={tarjeta.nombre} color={tarjeta.color} tipo="credito" />

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
          <p className="text-xs text-gray-500 mb-1">Anualidad</p>
          <p className="font-bold text-gray-900 text-sm">
            {tarjeta.anualidad === 0 ? <span className="text-green-600">Gratis</span> : `$${tarjeta.anualidad.toLocaleString()}`}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">CAT</p>
          <p className="font-bold text-gray-900 text-sm">{tarjeta.cat}%</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Tasa</p>
          <p className="font-bold text-gray-900 text-sm">{tarjeta.tasaInteres}%</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {tarjeta.categorias.map((cat) => (
          <span key={cat} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
            {cat}
          </span>
        ))}
        {tarjeta.millas && (
          <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">✈ Millas</span>
        )}
        {tarjeta.cashback && (
          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{tarjeta.cashback}% Cashback</span>
        )}
        {tarjeta.accesoSalaVip && (
          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">Sala VIP</span>
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
