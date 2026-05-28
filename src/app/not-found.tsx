import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
      <p className="text-8xl font-bold text-gray-100">404</p>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Página no encontrada</h1>
        <p className="text-gray-500">La dirección que buscas no existe o fue movida.</p>
      </div>
      <div className="flex gap-3">
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
          Ir al inicio
        </Link>
        <Link href="/tarjetas" className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
          Ver tarjetas
        </Link>
      </div>
    </div>
  );
}
