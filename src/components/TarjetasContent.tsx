'use client';
import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import tarjetasCredito from '@/data/tarjetas-credito.json';
import tarjetasDebito from '@/data/tarjetas-debito.json';
import cuentasAhorro from '@/data/cuentas-ahorro.json';
import TarjetaCreditoCard from '@/components/TarjetaCreditoCard';
import DebitoCard from '@/components/DebitoCard';
import AhorroCard from '@/components/AhorroCard';
import { TarjetaCredito, TarjetaDebito, CuentaAhorro } from '@/types';

const TIPOS = ['credito', 'debito', 'ahorro'] as const;
type Tipo = typeof TIPOS[number];

export default function TarjetasContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tipoParam = (searchParams.get('tipo') as Tipo) ?? 'credito';
  const [tipo, setTipo] = useState<Tipo>(tipoParam);
  const [busqueda, setBusqueda] = useState('');
  const [banco, setBanco] = useState('');
  const [soloSinAnualidad, setSoloSinAnualidad] = useState(false);
  const [soloConRendimiento, setSoloConRendimiento] = useState(false);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [orden, setOrden] = useState('puntaje');

  const cambiarTipo = (t: Tipo) => {
    setTipo(t);
    setBusqueda('');
    setBanco('');
    setSoloSinAnualidad(false);
    setSoloConRendimiento(false);
    router.replace(`/tarjetas?tipo=${t}`);
  };

  const bancos = useMemo(() => {
    const data = tipo === 'credito' ? tarjetasCredito : tipo === 'debito' ? tarjetasDebito : cuentasAhorro;
    return [...new Set(data.map((d) => d.banco))].sort();
  }, [tipo]);

  const datos = useMemo(() => {
    let data: (TarjetaCredito | TarjetaDebito | CuentaAhorro)[] =
      tipo === 'credito' ? (tarjetasCredito as TarjetaCredito[]) :
      tipo === 'debito' ? (tarjetasDebito as TarjetaDebito[]) :
      (cuentasAhorro as CuentaAhorro[]);

    if (busqueda) {
      const q = busqueda.toLowerCase();
      data = data.filter((d) => d.nombre.toLowerCase().includes(q) || d.banco.toLowerCase().includes(q));
    }
    if (banco) data = data.filter((d) => d.banco === banco);
    if (soloSinAnualidad && tipo === 'credito')
      data = (data as TarjetaCredito[]).filter((d) => d.anualidad === 0);
    if (soloConRendimiento && tipo === 'debito')
      data = (data as TarjetaDebito[]).filter((d) => d.rendimientoAnual !== null);

    return [...data].sort((a, b) => {
      if (orden === 'puntaje') return b.puntaje - a.puntaje;
      if (orden === 'nombre') return a.nombre.localeCompare(b.nombre);
      if (orden === 'anualidad' && tipo === 'credito') return (a as TarjetaCredito).anualidad - (b as TarjetaCredito).anualidad;
      if (orden === 'cat' && tipo === 'credito') return (a as TarjetaCredito).cat - (b as TarjetaCredito).cat;
      if (orden === 'rendimiento' && tipo !== 'credito') return ((b as TarjetaDebito).rendimientoAnual ?? 0) - ((a as TarjetaDebito).rendimientoAnual ?? 0);
      if (orden === 'tasa' && tipo === 'ahorro') return (b as CuentaAhorro).tasaAnual - (a as CuentaAhorro).tasaAnual;
      return 0;
    });
  }, [tipo, busqueda, banco, soloSinAnualidad, soloConRendimiento, orden]);

  const toggleSeleccion = (id: string) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : prev.length < 5 ? [...prev, id] : prev
    );
  };

  const irAComparar = () => {
    router.push(`/comparar?tipo=${tipo}&ids=${seleccionados.join(',')}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Tarjetas y cuentas en México</h1>
        {seleccionados.length >= 2 && (
          <button
            onClick={irAComparar}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            aria-label={`Comparar ${seleccionados.length} productos seleccionados`}
          >
            Comparar {seleccionados.length} seleccionada{seleccionados.length > 1 ? 's' : ''}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {TIPOS.map((t) => (
          <button
            key={t}
            onClick={() => cambiarTipo(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              tipo === t ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t === 'credito' ? 'Crédito' : t === 'debito' ? 'Débito' : 'Ahorro'}
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Buscar banco o tarjeta..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar banco o tarjeta"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-52 focus:outline-none focus:border-blue-400"
        />
        <select
          value={banco}
          onChange={(e) => setBanco(e.target.value)}
          aria-label="Filtrar por banco"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
        >
          <option value="">Todos los bancos</option>
          {bancos.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          aria-label="Ordenar por"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
        >
          <option value="puntaje">Mayor puntaje</option>
          <option value="nombre">A - Z</option>
          {tipo === 'credito' && <option value="anualidad">Menor anualidad</option>}
          {tipo === 'credito' && <option value="cat">Menor CAT</option>}
          {tipo === 'debito' && <option value="rendimiento">Mayor rendimiento</option>}
          {tipo === 'ahorro' && <option value="tasa">Mayor tasa</option>}
        </select>
        {tipo === 'credito' && (
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" checked={soloSinAnualidad} onChange={(e) => setSoloSinAnualidad(e.target.checked)} className="rounded" />
            Sin anualidad
          </label>
        )}
        {tipo === 'debito' && (
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" checked={soloConRendimiento} onChange={(e) => setSoloConRendimiento(e.target.checked)} className="rounded" />
            Con rendimiento
          </label>
        )}
        <span className="text-sm text-gray-400 ml-auto">{datos.length} resultado{datos.length !== 1 ? 's' : ''}</span>
      </div>

      {seleccionados.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
          {seleccionados.length}/5 seleccionada{seleccionados.length > 1 ? 's' : ''} para comparar.
          {seleccionados.length < 2 && ' Selecciona al menos 2 (máximo 5).'}
          {seleccionados.length >= 2 && (
            <button onClick={irAComparar} className="ml-2 font-semibold underline">Comparar ahora</button>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tipo === 'credito' && (datos as TarjetaCredito[]).map((t) => (
          <TarjetaCreditoCard key={t.id} tarjeta={t} seleccionada={seleccionados.includes(t.id)} onSeleccionar={toggleSeleccion} enComparador={seleccionados.length >= 5 && !seleccionados.includes(t.id)} />
        ))}
        {tipo === 'debito' && (datos as TarjetaDebito[]).map((t) => (
          <DebitoCard key={t.id} tarjeta={t} seleccionada={seleccionados.includes(t.id)} onSeleccionar={toggleSeleccion} enComparador={seleccionados.length >= 5 && !seleccionados.includes(t.id)} />
        ))}
        {tipo === 'ahorro' && (datos as CuentaAhorro[]).map((t) => (
          <AhorroCard key={t.id} cuenta={t} seleccionada={seleccionados.includes(t.id)} onSeleccionar={toggleSeleccion} enComparador={seleccionados.length >= 5 && !seleccionados.includes(t.id)} />
        ))}
      </div>

      {datos.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No se encontraron resultados</p>
          <p className="text-sm mt-1">Intenta con otros filtros</p>
        </div>
      )}
    </div>
  );
}
