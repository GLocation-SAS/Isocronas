# Visor Isocronas

Página web construida con [Next.js](https://nextjs.org).

## Inicio Rápido

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador para ver el resultado.

El archivo principal de la página es `src/app/page.tsx`. Los cambios se reflejan automáticamente al guardar.

## Estructura del Proyecto

```
├── src/app/              # Páginas y layouts de la aplicación
├── public/               # Archivos estáticos
├── app.yaml              # Configuración de App Engine
├── cloudbuild-dev.yaml   # Pipeline CI/CD para desarrollo (pgweb26-dev)
├── cloudbuild-qa.yaml    # Pipeline CI/CD para QA (pgweb26-qa)
├── cloudbuild-prod.yaml  # Pipeline CI/CD para producción (pgweb26-prod)
└── next.config.ts        # Configuración de Next.js
```

## Estrategia de Ramas

| Rama   | Entorno     | Proyecto GCP               | Archivo YAML  |
|--------|-------------|----------------------------|---------------|
| `dev`  | Desarrollo  | `pgweb26`                  | `dev.yaml`    |
| `qa`   | QA          | `pgweb26`                  | `qa.yaml`     |
| `main` | Producción  | `pgweb26`                  | `prod.yaml`   |

## Despliegue

El despliegue se realiza automáticamente mediante **Cloud Build** hacia **App Engine** al hacer push a la rama correspondiente.

### Requisitos previos en cada proyecto GCP

1. Tener habilitada la API de App Engine
2. Tener habilitada la API de Cloud Build
3. Configurar un trigger en Cloud Build apuntando al archivo `cloudbuild.yaml` correspondiente y a la rama correcta

### Despliegue manual (opcional)

```bash
# Construir la aplicación
npm run build

# El resultado standalone queda en .next/standalone/
```

## Scripts Disponibles

| Comando         | Descripción                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Servidor de desarrollo               |
| `npm run build` | Compilar para producción             |
| `npm run start` | Iniciar servidor de producción       |
| `npm run lint`  | Ejecutar el linter                   |
# Isocronas
onas
