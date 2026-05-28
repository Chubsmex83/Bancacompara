import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: {
    default: 'BancaCompara — Compara tarjetas y cuentas bancarias en México',
    template: '%s | BancaCompara',
  },
  description: 'Compara tarjetas de crédito, débito y cuentas de ahorro de todos los bancos en México. Encuentra la mejor opción para ti.',
  metadataBase: new URL('https://bancacompara.vercel.app'),
  openGraph: {
    siteName: 'BancaCompara',
    locale: 'es_MX',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 bg-white mt-16">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
            BancaCompara — Información orientativa. Verifica condiciones directamente con cada banco.
          </div>
        </footer>
      </body>
    </html>
  );
}
