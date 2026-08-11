import type { NextConfig } from "next";

// ─── Microservicios y ambientes para la CSP ──────────────────────────────────
// Al agregar un nuevo microservicio, solo hay que añadirlo aquí.
const microservices = [
  'usuarios', 'areas', 'cargos', 'roles', 'parentescos', 'contacto',
  'upload', 'upload-documents', 'innovaciones', 'rutas',
  'document-repository', 'folders',
];
const environments = ['dev', 'qa', 'prod'];
const projectNumber = '330426731666';
const region = 'us-east1';

// Generar URLs de Cloud Run para todos los servicios × ambientes
const cloudRunUrls = environments
  .flatMap(env => microservices.map(svc => `https://${env}-${svc}-${projectNumber}.${region}.run.app`))
  .join(' ');

// Puertos locales de desarrollo (8080–8092)
const localPorts = Array.from({ length: 13 }, (_, i) => `http://localhost:${8080 + i}`).join(' ');

// En desarrollo, Next.js necesita 'unsafe-inline' y 'unsafe-eval' para hot-reload e hidratación.
// En producción, se debe refinar con nonces o hashes.
const isDev = process.env.NODE_ENV === 'development';

const cspHeader = [
  // ── Fallback ────────────────────────────────────────────────────────────
  `default-src 'self'`,

  // ── Scripts ─────────────────────────────────────────────────────────────
  // Next.js dev-server requiere 'unsafe-eval' y 'unsafe-inline' para HMR/Fast-Refresh
  `script-src 'self'${isDev ? " 'unsafe-inline' 'unsafe-eval'" : " 'unsafe-inline'"}`,

  // ── Estilos ─────────────────────────────────────────────────────────────
  // TailwindCSS v4 y Radix UI inyectan estilos inline
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,

  // ── Fuentes ─────────────────────────────────────────────────────────────
  `font-src 'self' https://fonts.gstatic.com`,

  // ── Imágenes ────────────────────────────────────────────────────────────
  `img-src 'self' data: blob: https://i.pravatar.cc https://img.youtube.com https://i.ytimg.com https://storage.googleapis.com`,

  // ── Conexiones (APIs, WebSockets para HMR) ─────────────────────────────
  `connect-src 'self' ${cloudRunUrls} ${localPorts}${isDev ? ' ws://localhost:* wss://localhost:*' : ''}`,

  // ── Frames ──────────────────────────────────────────────────────────────
  `frame-src 'self' https://www.youtube.com`,

  // ── Workers ─────────────────────────────────────────────────────────────
  `worker-src 'self' blob:`,
].join('; ');

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Isocronas",
  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default nextConfig;

