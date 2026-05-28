import type { Metadata } from 'next';
import { Suspense } from 'react';
import TarjetasContent from '@/components/TarjetasContent';

export const metadata: Metadata = {
  title: 'Tarjetas de crédito, débito y cuentas de ahorro en México | BancaCompara',
  description: 'Compara y filtra tarjetas de crédito, débito y cuentas de ahorro de todos los bancos en México. Ordenadas por puntaje, CAT, anualidad y más.',
  openGraph: {
    title: 'Tarjetas y cuentas bancarias en México',
    description: 'Encuentra la mejor tarjeta o cuenta según tu perfil.',
    url: 'https://bancacompara.mx/tarjetas',
  },
};

export default function TarjetasPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded-xl" />
        <div className="h-16 bg-gray-200 rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-56 bg-gray-200 rounded-2xl" />)}
        </div>
      </div>
    }>
      <TarjetasContent />
    </Suspense>
  );
}
