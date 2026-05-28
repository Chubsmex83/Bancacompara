# BancaCompara

Comparador de tarjetas de crédito, débito y cuentas de ahorro de los principales bancos en México. Encuentra la opción que más te conviene según tu perfil: CAT, anualidad, rendimiento, beneficios y más.

## Funcionalidades

- **Listado con filtros** — busca por banco, ordena por CAT, anualidad, tasa o puntaje, filtra sin anualidad o con rendimiento
- **Comparador lado a lado** — selecciona hasta 5 productos y compara todos sus atributos en una tabla
- **Análisis automático** — el sistema recomienda la mejor opción y explica cuándo conviene elegir cada alternativa
- **Rankings por categoría** — mejores sin anualidad, menor CAT, viajeros, mayor rendimiento, mejor tasa, para principiantes
- **Calculadora de costos** — estima cuánto pagas realmente con cada tarjeta según tu gasto mensual
- **Página de detalle** — información completa de cada producto con beneficios, requisitos y seguros incluidos

## Productos incluidos

### Tarjetas de crédito
BBVA (Azul, Oro, Platinum), Nu México, Citibanamex (Simplicity, Oro, Platinum), Santander (Zero, LikeU, Platinum), HSBC (Advance, Premier), American Express (Gold, Platinum), Banorte (Clásica, Oro, Platinum), Scotiabank (Oro, Platinum), RappiCard, Klar, Invex/Volaris, Banorte/VivaAerobus, Citibanamex/Costco, Inbursa (Clásica, Oro), BanBajío, BanCoppel, Banco Azteca, Spin by OXXO, Hey Banco

### Tarjetas de débito
Nu México, Hey Banco, BBVA, Citibanamex, Banorte, Scotiabank, Santander, HSBC, Mercado Pago, RappiCard, Spin by OXXO, BanCoppel, Banco Azteca

### Cuentas de ahorro
Hey Banco, Nu México, Mercado Pago, CETES Directo, BBVA, Citibanamex, Banorte, Scotiabank, HSBC, Santander, Inbursa, BanCoppel, Banco Azteca

## Stack

| Tecnología | Versión |
|-----------|---------|
| Next.js (App Router) | 16.2.6 |
| React | 19.2.4 |
| TypeScript | 5 |
| Tailwind CSS | 4 |

Sin backend ni base de datos. Toda la data proviene de archivos JSON en `src/data/`.

## Correr en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx              # Layout raíz con Navbar y footer
│   ├── page.tsx                # Home — top productos y publicidad
│   ├── sitemap.ts              # Sitemap dinámico con todas las rutas
│   ├── not-found.tsx           # Página 404 personalizada
│   ├── error.tsx               # Error boundary global
│   ├── tarjetas/
│   │   ├── page.tsx            # Listado con filtros
│   │   ├── loading.tsx         # Skeleton de carga
│   │   └── [id]/page.tsx       # Detalle de producto
│   ├── comparar/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── ranking/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   └── calculadora/
│       ├── page.tsx
│       └── loading.tsx
├── components/
│   ├── Navbar.tsx              # Navegación con hamburger menu móvil
│   ├── TarjetasContent.tsx     # Lógica client del listado
│   ├── ComparadorContent.tsx   # Lógica client del comparador
│   ├── CalculadoraContent.tsx  # Lógica client de la calculadora
│   ├── TarjetaCreditoCard.tsx
│   ├── DebitoCard.tsx
│   ├── AhorroCard.tsx
│   ├── BancoLogo.tsx           # Avatar de banco con iniciales y color
│   └── AdBanner.tsx            # Sección de publicidad MSI
├── data/
│   ├── tarjetas-credito.json
│   ├── tarjetas-debito.json
│   └── cuentas-ahorro.json
├── types/
│   └── index.ts                # Interfaces TypeScript de todos los productos
└── utils/
    └── puntaje.ts              # Gradiente de color rojo→verde por puntaje
```

## Agregar productos

Añade un objeto al JSON correspondiente en `src/data/`. El campo `id` debe ser un slug único ya que se usa como URL en `/tarjetas/[id]`. Consulta `src/types/index.ts` para ver todos los campos requeridos por tipo.

## SEO

- Metadata individual por página (`title`, `description`, `openGraph`)
- Sitemap dinámico en `/sitemap.xml` con todas las rutas de detalle
- `robots.txt` en `/public/robots.txt`
- URLs limpias por producto: `/tarjetas/nu-card`, `/tarjetas/bbva-azul`, etc.

## Publicidad

La sección de publicidad está en `src/components/AdBanner.tsx`. Actualmente muestra promociones estáticas de Amazon, Liverpool y Apple con meses sin intereses. Para integrar Google AdSense, reemplaza el contenido del componente `AdSection`.

---

> La información es orientativa. Verifica condiciones, tasas y requisitos directamente con cada banco antes de solicitar cualquier producto.
