'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
      <p className="text-6xl">⚠️</p>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Algo salió mal</h1>
        <p className="text-gray-500">Ocurrió un error inesperado. Intenta de nuevo.</p>
      </div>
      <button
        onClick={reset}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
}
