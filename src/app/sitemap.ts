import type { MetadataRoute } from 'next';
import tarjetasCredito from '@/data/tarjetas-credito.json';
import tarjetasDebito from '@/data/tarjetas-debito.json';
import cuentasAhorro from '@/data/cuentas-ahorro.json';

const BASE = 'https://bancacompara.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const estaticas = ['', '/tarjetas', '/comparar', '/ranking', '/calculadora'].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const productos = [
    ...tarjetasCredito,
    ...tarjetasDebito,
    ...cuentasAhorro,
  ].map((p) => ({
    url: `${BASE}/tarjetas/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...estaticas, ...productos];
}
