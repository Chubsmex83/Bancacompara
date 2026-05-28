'use client';
import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import tarjetasCredito from '@/data/tarjetas-credito.json';
import tarjetasDebito from '@/data/tarjetas-debito.json';
import cuentasAhorro from '@/data/cuentas-ahorro.json';
import { TarjetaCredito, TarjetaDebito, CuentaAhorro } from '@/types';
import BancoLogo from '@/components/BancoLogo';
import { colorPuntaje } from '@/utils/puntaje';

function Check({ val }: { val: boolean }) {
  return val
    ? <span className="text-green-500 font-bold" aria-label="Sí">✓</span>
    : <span className="text-gray-300" aria-label="No">✗</span>;
}

function analizarCredito(productos: TarjetaCredito[]) {
  const scores = productos.map((p) => {
    let score = p.puntaje * 2;
    if (p.anualidad === 0) score += 3;
    else if (p.anualidad < 1000) score += 1;
    score -= p.cat / 20;
    if (p.cashback) score += p.cashback * 1.5;
    if (p.millas) score += 1;
    if (p.accesoSalaVip) score += 1.5;
    if (p.pagosEnMSI) score += 0.5;
    return score;
  });
  const ganador = productos[scores.indexOf(Math.max(...scores))];
  const razones: string[] = [];
  if (ganador.anualidad === 0) razones.push('no cobra anualidad');
  else razones.push(`anualidad de $${ganador.anualidad.toLocaleString()}`);
  if (ganador.cat === Math.min(...productos.map(p => p.cat))) razones.push(`CAT más bajo (${ganador.cat}%)`);
  if (ganador.cashback) razones.push(`cashback de ${ganador.cashback}%`);
  if (ganador.millas) razones.push('acumula millas');
  if (ganador.accesoSalaVip) razones.push('acceso a salas VIP');
  if (ganador.pagosEnMSI) razones.push('compras en MSI');
  return { ganador, razones };
}

function analizarDebito(productos: TarjetaDebito[]) {
  const scores = productos.map((p) => {
    let score = p.puntaje * 2;
    if (p.comisionMensual === 0) score += 3;
    if (p.rendimientoAnual) score += p.rendimientoAnual * 0.5;
    if (p.cashback) score += p.cashback * 1.5;
    if (p.transferenciasGratis) score += 1;
    if (p.retiroGratisRed) score += 0.5;
    return score;
  });
  const ganador = productos[scores.indexOf(Math.max(...scores))];
  const razones: string[] = [];
  if (ganador.comisionMensual === 0) razones.push('sin comisión mensual');
  if (ganador.rendimientoAnual) razones.push(`rendimiento de ${ganador.rendimientoAnual}% anual`);
  if (ganador.cashback) razones.push(`cashback de ${ganador.cashback}%`);
  if (ganador.transferenciasGratis) razones.push('transferencias SPEI gratis');
  return { ganador, razones };
}

function analizarAhorro(productos: CuentaAhorro[]) {
  const scores = productos.map((p) => {
    let score = p.puntaje * 2;
    score += p.tasaAnual * 0.8;
    if (p.comisionMensual === 0) score += 2;
    if (p.liquidez === 'inmediata') score += 2;
    if (p.protegidaBanxico) score += 1;
    if (p.montoMinimo === 0) score += 1;
    return score;
  });
  const ganador = productos[scores.indexOf(Math.max(...scores))];
  const razones: string[] = [];
  razones.push(`tasa de ${ganador.tasaAnual}% anual`);
  if (ganador.comisionMensual === 0) razones.push('sin comisión mensual');
  if (ganador.liquidez === 'inmediata') razones.push('liquidez inmediata');
  if (ganador.protegidaBanxico) razones.push('protegida por el IPAB');
  if (ganador.montoMinimo === 0) razones.push('sin monto mínimo');
  return { ganador, razones };
}

function AnalisisRecomendacion({ tipo, productos }: { tipo: string; productos: (TarjetaCredito | TarjetaDebito | CuentaAhorro)[] }) {
  const { ganador, razones } = useMemo(() => {
    if (tipo === 'credito') return analizarCredito(productos as TarjetaCredito[]);
    if (tipo === 'debito') return analizarDebito(productos as TarjetaDebito[]);
    return analizarAhorro(productos as CuentaAhorro[]);
  }, [tipo, productos]);

  const otros = productos.filter((p) => p.id !== ganador.id);
  const textoTipo = tipo === 'credito' ? 'tarjetas de crédito' : tipo === 'debito' ? 'cuentas de débito' : 'cuentas de ahorro';

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔍</span>
        <h2 className="text-lg font-bold">Análisis BancaCompara</h2>
      </div>
      <div className="bg-white/15 rounded-xl p-4 flex items-center gap-4">
        <BancoLogo banco={ganador.banco} color="rgba(255,255,255,0.2)" size="lg" className="border-2 border-white/30" />
        <div>
          <p className="text-white/70 text-xs uppercase tracking-wide">Recomendación</p>
          <p className="text-xl font-bold">{ganador.nombre}</p>
          <p className="text-white/80 text-sm">{ganador.banco}</p>
        </div>
        <div className="ml-auto px-3 py-1 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: colorPuntaje(ganador.puntaje) }}>
          ★ {ganador.puntaje}
        </div>
      </div>
      <p className="text-white/80 text-sm leading-relaxed">
        De las {productos.length} {textoTipo} comparadas, <strong className="text-white">{ganador.nombre}</strong> es
        la mejor opción porque {razones.slice(0, 3).join(', ')}.
        {razones.length > 3 && ` Además, ${razones.slice(3).join(' y ')}.`}
      </p>
      {otros.length > 0 && (
        <div className="border-t border-white/20 pt-4 space-y-2">
          <p className="text-white/60 text-xs uppercase tracking-wide font-semibold">¿Cuándo elegir otra?</p>
          <div className="space-y-2 text-sm text-white/80">
            {tipo === 'credito' && (otros as TarjetaCredito[]).map((p) => {
              const r: string[] = [];
              if (p.anualidad === 0 && (ganador as TarjetaCredito).anualidad > 0) r.push('no cobra anualidad');
              if (p.cat < (ganador as TarjetaCredito).cat) r.push(`tiene menor CAT (${p.cat}%)`);
              if (p.cashback && !(ganador as TarjetaCredito).cashback) r.push(`ofrece cashback de ${p.cashback}%`);
              if (p.accesoSalaVip && !(ganador as TarjetaCredito).accesoSalaVip) r.push('incluye acceso a salas VIP');
              if (p.millas && !(ganador as TarjetaCredito).millas) r.push('acumula millas o puntos');
              if (p.tasaInteres < (ganador as TarjetaCredito).tasaInteres) r.push(`cobra menos intereses (${p.tasaInteres}%)`);
              const texto = r.length > 0 ? r.slice(0, 2).join(' y ') : `tiene puntaje ${p.puntaje}`;
              return <p key={p.id}>• Elige <strong className="text-white">{p.nombre}</strong> si {texto}.</p>;
            })}
            {tipo === 'debito' && (otros as TarjetaDebito[]).map((p) => {
              const r: string[] = [];
              if ((p.rendimientoAnual ?? 0) > ((ganador as TarjetaDebito).rendimientoAnual ?? 0)) r.push(`da mayor rendimiento (${p.rendimientoAnual}%)`);
              if (p.cashback && !(ganador as TarjetaDebito).cashback) r.push(`ofrece cashback de ${p.cashback}%`);
              if (p.comisionMensual === 0 && (ganador as TarjetaDebito).comisionMensual > 0) r.push('no cobra comisión mensual');
              const texto = r.length > 0 ? r.slice(0, 2).join(' y ') : `tiene puntaje ${p.puntaje}`;
              return <p key={p.id}>• Elige <strong className="text-white">{p.nombre}</strong> si {texto}.</p>;
            })}
            {tipo === 'ahorro' && (otros as CuentaAhorro[]).map((p) => {
              const r: string[] = [];
              if (p.tasaAnual > (ganador as CuentaAhorro).tasaAnual) r.push(`ofrece mayor tasa (${p.tasaAnual}%)`);
              if (p.liquidez === 'inmediata' && (ganador as CuentaAhorro).liquidez !== 'inmediata') r.push('tiene liquidez inmediata');
              if (p.montoMinimo === 0 && (ganador as CuentaAhorro).montoMinimo > 0) r.push('no requiere monto mínimo');
              const texto = r.length > 0 ? r.slice(0, 2).join(' y ') : `tiene puntaje ${p.puntaje}`;
              return <p key={p.id}>• Elige <strong className="text-white">{p.nombre}</strong> si {texto}.</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Fila({ label, children, highlight }: { label: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <tr className={highlight ? 'bg-blue-50' : 'bg-white'}>
      <td className="py-3 px-3 text-sm font-medium text-gray-600 w-36">{label}</td>
      {children}
    </tr>
  );
}

function ComparadorCredito({ productos, gridCols }: { productos: TarjetaCredito[]; gridCols: string }) {
  const mejor = (vals: number[], menor = false) => {
    const optimo = menor ? Math.min(...vals) : Math.max(...vals);
    return vals.map((v) => v === optimo);
  };
  const anualidades = mejor(productos.map((p) => p.anualidad), true);
  const cats = mejor(productos.map((p) => p.cat), true);
  const tasas = mejor(productos.map((p) => p.tasaInteres), true);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
      <table className="w-full min-w-max">
        <tbody className="divide-y divide-gray-50">
          <tr className="bg-gray-50"><td className="py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-36">Costos</td>{productos.map((p) => <td key={p.id} className="py-2 px-3" />)}</tr>
          <Fila label="Anualidad">{productos.map((p, i) => <td key={p.id} className={`py-3 px-3 text-sm font-semibold text-center ${anualidades[i] ? 'text-green-600' : 'text-gray-900'}`}>{p.anualidad === 0 ? 'Gratis' : `$${p.anualidad.toLocaleString()}`}</td>)}</Fila>
          <Fila label="CAT">{productos.map((p, i) => <td key={p.id} className={`py-3 px-3 text-sm font-semibold text-center ${cats[i] ? 'text-green-600' : 'text-gray-900'}`}>{p.cat}%</td>)}</Fila>
          <Fila label="Tasa interés">{productos.map((p, i) => <td key={p.id} className={`py-3 px-3 text-sm font-semibold text-center ${tasas[i] ? 'text-green-600' : 'text-gray-900'}`}>{p.tasaInteres}%</td>)}</Fila>
          <Fila label="Penalización">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm text-center text-gray-900">${p.penalizacionPagoMinimo}</td>)}</Fila>
          <tr className="bg-gray-50"><td className="py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Límite</td>{productos.map((p) => <td key={p.id} className="py-2 px-3" />)}</tr>
          <Fila label="Mínimo">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm text-center text-gray-900">${p.limiteMinimo.toLocaleString()}</td>)}</Fila>
          <Fila label="Máximo">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm text-center text-gray-900">{p.limiteMaximo === 999999 ? 'Sin límite' : `$${p.limiteMaximo.toLocaleString()}`}</td>)}</Fila>
          <tr className="bg-gray-50"><td className="py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Beneficios</td>{productos.map((p) => <td key={p.id} className="py-2 px-3" />)}</tr>
          <Fila label="Cashback">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm text-center">{p.cashback ? <span className="text-green-600 font-semibold">{p.cashback}%</span> : <span className="text-gray-300">—</span>}</td>)}</Fila>
          <Fila label="Millas/Puntos">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-center"><Check val={p.millas} /></td>)}</Fila>
          <Fila label="MSI">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-center"><Check val={p.pagosEnMSI} /></td>)}</Fila>
          <Fila label="Sala VIP">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-center"><Check val={p.accesoSalaVip} /></td>)}</Fila>
          <Fila label="Concierge">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-center"><Check val={p.concierge} /></td>)}</Fila>
          <tr className="bg-gray-50"><td className="py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acción</td>{productos.map((p) => <td key={p.id} className="py-2 px-3" />)}</tr>
          <Fila label="">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-center"><a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Solicitar ${p.nombre}`} className="inline-block bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700">Solicitar</a></td>)}</Fila>
        </tbody>
      </table>
    </div>
  );
}

function ComparadorDebito({ productos }: { productos: TarjetaDebito[]; gridCols: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
      <table className="w-full min-w-max">
        <tbody className="divide-y divide-gray-50">
          <Fila label="Comisión mensual">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm font-semibold text-center">{p.comisionMensual === 0 ? <span className="text-green-600">Gratis</span> : `$${p.comisionMensual}/mes`}</td>)}</Fila>
          <Fila label="Rendimiento">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm text-center">{p.rendimientoAnual ? <span className="text-green-600 font-semibold">{p.rendimientoAnual}%</span> : <span className="text-gray-300">—</span>}</td>)}</Fila>
          <Fila label="Cashback">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm text-center">{p.cashback ? <span className="text-green-600 font-semibold">{p.cashback}%</span> : <span className="text-gray-300">—</span>}</td>)}</Fila>
          <Fila label="SPEI gratis">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-center"><Check val={p.transferenciasGratis} /></td>)}</Fila>
          <Fila label="Retiro gratis red">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-center"><Check val={p.retiroGratisRed} /></td>)}</Fila>
          <Fila label="Retiro otros ATM">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-center"><Check val={p.retiroGratisOtrosATM} /></td>)}</Fila>
          <Fila label="Límite retiro">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm text-center">${p.limiteRetiroDiario.toLocaleString()}/día</td>)}</Fila>
          <Fila label="">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-center"><a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir cuenta ${p.nombre}`} className="inline-block bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700">Abrir cuenta</a></td>)}</Fila>
        </tbody>
      </table>
    </div>
  );
}

function ComparadorAhorro({ productos }: { productos: CuentaAhorro[]; gridCols: string }) {
  const mejorTasa = Math.max(...productos.map((p) => p.tasaAnual));
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
      <table className="w-full min-w-max">
        <tbody className="divide-y divide-gray-50">
          <Fila label="Tasa anual">{productos.map((p) => <td key={p.id} className={`py-3 px-3 text-sm font-bold text-center ${p.tasaAnual === mejorTasa ? 'text-green-600' : 'text-gray-900'}`}>{p.tasaAnual}%</td>)}</Fila>
          <Fila label="Monto mínimo">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm text-center">{p.montoMinimo === 0 ? <span className="text-green-600 font-semibold">$0</span> : `$${p.montoMinimo.toLocaleString()}`}</td>)}</Fila>
          <Fila label="Comisión mensual">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm text-center">{p.comisionMensual === 0 ? <span className="text-green-600 font-semibold">Gratis</span> : `$${p.comisionMensual}/mes`}</td>)}</Fila>
          <Fila label="Plazo">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm text-center">{p.plazo}</td>)}</Fila>
          <Fila label="Liquidez">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm text-center capitalize">{p.liquidez.replace('-', ' ')}</td>)}</Fila>
          <Fila label="Protegida IPAB">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-center"><Check val={p.protegidaBanxico} /></td>)}</Fila>
          <Fila label="Monto protegido">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-sm text-center">{p.montoProtegido > 0 ? `$${p.montoProtegido.toLocaleString()}` : 'No aplica'}</td>)}</Fila>
          <Fila label="">{productos.map((p) => <td key={p.id} className="py-3 px-3 text-center"><a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Invertir en ${p.nombre}`} className="inline-block bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700">Invertir</a></td>)}</Fila>
        </tbody>
      </table>
    </div>
  );
}

function ComparadorInner() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get('tipo') ?? 'credito';
  const idsParam = searchParams.get('ids') ?? '';
  const ids = idsParam.split(',').filter(Boolean);

  const productos = useMemo(() => {
    const data = tipo === 'credito' ? tarjetasCredito : tipo === 'debito' ? tarjetasDebito : cuentasAhorro;
    return ids.map((id) => data.find((d) => d.id === id)).filter(Boolean) as (TarjetaCredito | TarjetaDebito | CuentaAhorro)[];
  }, [tipo, ids]);

  if (productos.length < 2) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-xl text-gray-500">Selecciona al menos 2 productos para comparar</p>
        <Link href="/tarjetas" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700">
          Elegir productos
        </Link>
      </div>
    );
  }

  const cols = productos.length;
  const gridCols = cols === 2 ? 'grid-cols-2' : cols === 3 ? 'grid-cols-3' : cols === 4 ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Comparador</h1>
        <Link href={`/tarjetas?tipo=${tipo}`} className="text-sm text-blue-600 hover:underline">Cambiar selección</Link>
      </div>
      <div className={`grid ${gridCols} gap-3`}>
        {productos.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <BancoLogo banco={p.banco} color={p.color} size={cols >= 4 ? 'sm' : 'md'} className="mx-auto mb-2" />
            <p className="text-xs text-gray-500">{p.banco}</p>
            <p className="font-bold text-gray-900 text-sm leading-tight">{p.nombre}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-xs" style={{ color: colorPuntaje(p.puntaje) }}>★</span>
              <span className="text-xs font-semibold" style={{ color: colorPuntaje(p.puntaje) }}>{p.puntaje}</span>
            </div>
          </div>
        ))}
      </div>
      <AnalisisRecomendacion tipo={tipo} productos={productos} />
      {tipo === 'credito' && <ComparadorCredito productos={productos as TarjetaCredito[]} gridCols={gridCols} />}
      {tipo === 'debito' && <ComparadorDebito productos={productos as TarjetaDebito[]} gridCols={gridCols} />}
      {tipo === 'ahorro' && <ComparadorAhorro productos={productos as CuentaAhorro[]} gridCols={gridCols} />}
    </div>
  );
}

export default function ComparadorContent() {
  return (
    <Suspense fallback={
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded-xl" />
        <div className="grid grid-cols-3 gap-3">
          {[1,2,3].map((i) => <div key={i} className="h-32 bg-gray-200 rounded-2xl" />)}
        </div>
        <div className="h-48 bg-gray-200 rounded-2xl" />
        <div className="h-96 bg-gray-200 rounded-2xl" />
      </div>
    }>
      <ComparadorInner />
    </Suspense>
  );
}
