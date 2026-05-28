import type { Metadata } from 'next';
import { Suspense } from 'react';
import CalculadoraContent from '@/components/CalculadoraContent';

export const metadata: Metadata = {
  title: 'Calculadora de costos de tarjetas de crédito | BancaCompara',
  description: 'Calcula cuánto pagarás realmente con cada tarjeta de crédito según tu gasto mensual. Compara anualidades e intereses en México.',
  openGraph: {
    title: 'Calculadora de tarjetas de crédito',
    description: 'Descubre cuánto cuesta cada tarjeta según tu uso mensual.',
    url: 'https://bancacompara.mx/calculadora',
  },
};

export default function CalculadoraPage() {
  return (
    <Suspense>
      <CalculadoraContent />
    </Suspense>
  );
}
