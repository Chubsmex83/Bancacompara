export type ProductType = 'credito' | 'debito' | 'ahorro';

export interface TarjetaCredito {
  id: string;
  tipo: 'credito';
  banco: string;
  nombre: string;
  logo: string;
  color: string;
  anualidad: number;
  anualidadCondicional: string | null;
  cat: number;
  tasaInteres: number;
  limiteMinimo: number;
  limiteMaximo: number;
  penalizacionPagoMinimo: number;
  beneficios: string[];
  cashback: number | null;
  millas: boolean;
  seguros: string[];
  accesoSalaVip: boolean;
  concierge: boolean;
  pagosEnMSI: boolean;
  requisitos: string[];
  puntaje: number;
  categorias: string[];
  url: string;
}

export interface TarjetaDebito {
  id: string;
  tipo: 'debito';
  banco: string;
  nombre: string;
  logo: string;
  color: string;
  comisionMensual: number;
  comisionCondicional: string | null;
  rendimientoAnual: number | null;
  cashback: number | null;
  retiroGratisRed: boolean;
  retiroGratisOtrosATM: boolean;
  transferenciasGratis: boolean;
  limiteRetiroDiario: number;
  seguros: string[];
  beneficios: string[];
  requisitos: string[];
  puntaje: number;
  categorias: string[];
  url: string;
}

export interface CuentaAhorro {
  id: string;
  tipo: 'ahorro';
  banco: string;
  nombre: string;
  logo: string;
  color: string;
  tasaAnual: number;
  tasaCondicionada: string | null;
  montoMinimo: number;
  comisionMensual: number;
  comisionCondicional: string | null;
  plazo: string;
  protegidaBanxico: boolean;
  montoProtegido: number;
  liquidez: 'inmediata' | 'plazo-fijo' | 'flexible';
  beneficios: string[];
  requisitos: string[];
  puntaje: number;
  categorias: string[];
  url: string;
}

export type Producto = TarjetaCredito | TarjetaDebito | CuentaAhorro;
