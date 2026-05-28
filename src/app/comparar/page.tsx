import type { Metadata } from 'next';
import ComparadorContent from '@/components/ComparadorContent';

export const metadata: Metadata = {
  title: 'Comparar tarjetas y cuentas bancarias | BancaCompara',
  description: 'Compara lado a lado hasta 5 tarjetas de crédito, débito o cuentas de ahorro. Análisis automático con la mejor recomendación para ti.',
  openGraph: {
    title: 'Comparador de tarjetas bancarias',
    description: 'Compara hasta 5 productos bancarios y encuentra el mejor.',
    url: 'https://bancacompara.mx/comparar',
  },
};

export default function ComparadorPage() {
  return <ComparadorContent />;
}
