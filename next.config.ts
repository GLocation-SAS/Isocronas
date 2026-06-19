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

const cspHeader = `
  default-src 'self';
`;

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        // Firebase Storage / Google Cloud Storage — fotos de perfil de usuarios
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
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

